
import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.sql.*;

public class Billing extends JFrame {

    private final DefaultTableModel model = new DefaultTableModel(
            new String[]{"Item", "Quantity", "Unit Price", "Amount"}, 0) {
        @Override
        public boolean isCellEditable(int r, int c) {
            return false;
        }
    };

    private final JTable table = new JTable(model);
    private final JTextField customerField = new JTextField(18);
    private final JLabel subtotalLabel = new JLabel("₹0.00");
    private final JLabel taxLabel = new JLabel("₹0.00");
    private final JLabel totalLabel = new JLabel("₹0.00");
    private final JTextField taxRateField = new JTextField("5", 5);

    public Billing() {
        setTitle("Savora | Billing");
        setSize(900, 650);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);

        JPanel root = new JPanel(new BorderLayout(15, 15));
        root.setBorder(BorderFactory.createEmptyBorder(25, 25, 25, 25));
        root.setBackground(new Color(245, 247, 250));

        JLabel title = new JLabel("Billing & Invoices");
        title.setFont(new Font("SansSerif", Font.BOLD, 26));

        JPanel customerPanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
        customerPanel.setOpaque(false);
        customerPanel.add(new JLabel("Customer Name:"));
        customerPanel.add(customerField);

        JButton add = button("Add Item");
        JButton remove = button("Remove Item");
        JButton calculate = button("Calculate Total");
        JButton newBill = button("New Bill");
        JButton pay = button("Complete Payment");

        JPanel actions = new JPanel(new FlowLayout(FlowLayout.LEFT));
        actions.setOpaque(false);
        actions.add(add);
        actions.add(remove);
        actions.add(calculate);
        actions.add(newBill);

        table.setRowHeight(38);
        table.setFont(new Font("SansSerif", Font.PLAIN, 13));
        table.getTableHeader().setFont(
                new Font("SansSerif", Font.BOLD, 13));

        JPanel totals = new JPanel(new GridLayout(0, 2, 12, 12));
        totals.setBackground(Color.WHITE);
        totals.setBorder(BorderFactory.createEmptyBorder(15, 15, 15, 15));

        totals.add(new JLabel("Subtotal:"));
        totals.add(subtotalLabel);
        totals.add(new JLabel("Tax rate (%):"));
        totals.add(taxRateField);
        totals.add(new JLabel("Tax amount:"));
        totals.add(taxLabel);
        totals.add(new JLabel("Grand Total:"));

        totalLabel.setFont(new Font("SansSerif", Font.BOLD, 20));
        totalLabel.setForeground(new Color(232, 112, 55));
        totals.add(totalLabel);
        totals.add(new JLabel(""));
        totals.add(pay);

        JPanel top = new JPanel(new BorderLayout(0, 12));
        top.setOpaque(false);
        top.add(title, BorderLayout.NORTH);
        top.add(customerPanel, BorderLayout.CENTER);

        JPanel center = new JPanel(new BorderLayout(0, 10));
        center.setOpaque(false);
        center.add(actions, BorderLayout.NORTH);
        center.add(new JScrollPane(table), BorderLayout.CENTER);

        root.add(top, BorderLayout.NORTH);
        root.add(center, BorderLayout.CENTER);
        root.add(totals, BorderLayout.SOUTH);
        setContentPane(root);

        add.addActionListener(e -> addItem());
        remove.addActionListener(e -> removeItem());
        calculate.addActionListener(e -> calculateTotal());
        newBill.addActionListener(e -> newBill());
        pay.addActionListener(e -> completePayment());
    }

    private JButton button(String text) {
        JButton b = new JButton(text);
        b.setBackground(new Color(232, 112, 55));
        b.setForeground(Color.WHITE);
        b.setFocusPainted(false);
        b.setBorderPainted(false);
        return b;
    }

    private void addItem() {
        JTextField name = new JTextField();
        JTextField qty = new JTextField("1");
        JTextField price = new JTextField();

        JPanel p = new JPanel(new GridLayout(0, 2, 8, 8));
        p.add(new JLabel("Item Name:"));
        p.add(name);
        p.add(new JLabel("Quantity:"));
        p.add(qty);
        p.add(new JLabel("Unit Price:"));
        p.add(price);

        if (JOptionPane.showConfirmDialog(
                this, p, "Add Bill Item",
                JOptionPane.OK_CANCEL_OPTION) != JOptionPane.OK_OPTION) {
            return;
        }

        try {
            String item = name.getText().trim();
            int quantity = Integer.parseInt(qty.getText().trim());
            double unitPrice = Double.parseDouble(price.getText().trim());

            if (item.isEmpty() || quantity <= 0
                    || !Double.isFinite(unitPrice) || unitPrice < 0) {
                throw new IllegalArgumentException();
            }

            double amount = quantity * unitPrice;

            if (!Double.isFinite(amount)) {
                throw new IllegalArgumentException();
            }

            model.addRow(new Object[]{
                    item, quantity, unitPrice,
                    String.format("%.2f", amount)
            });

            calculateTotal();

        } catch (IllegalArgumentException ex) {
            JOptionPane.showMessageDialog(
                    this, "Enter a valid item, quantity and price.");
        }
    }

    private void removeItem() {
        int r = table.getSelectedRow();

        if (r < 0) {
            JOptionPane.showMessageDialog(
                    this, "Select an item first.");
            return;
        }

        model.removeRow(r);
        calculateTotal();
    }

    private boolean calculateTotal() {
        try {
            double subtotal = 0;

            for (int i = 0; i < model.getRowCount(); i++) {
                subtotal += Double.parseDouble(
                        String.valueOf(model.getValueAt(i, 3)));
            }

            double rate = Double.parseDouble(
                    taxRateField.getText().trim());

            if (!Double.isFinite(rate) || rate < 0 || rate > 100) {
                throw new IllegalArgumentException();
            }

            double tax = subtotal * rate / 100.0;
            double total = subtotal + tax;

            if (!Double.isFinite(total)) {
                throw new IllegalArgumentException();
            }

            subtotalLabel.setText(String.format("₹%.2f", subtotal));
            taxLabel.setText(String.format("₹%.2f", tax));
            totalLabel.setText(String.format("₹%.2f", total));

            return true;

        } catch (IllegalArgumentException ex) {
            JOptionPane.showMessageDialog(
                    this, "Enter a valid tax rate between 0 and 100.");
            return false;
        }
    }

    // Save Bill and Bill Items in MySQL
    private void completePayment() {

        String customer = customerField.getText().trim();

        if (customer.isEmpty()) {
            JOptionPane.showMessageDialog(
                    this, "Enter the customer name first.");
            return;
        }

        if (model.getRowCount() == 0) {
            JOptionPane.showMessageDialog(
                    this, "Add at least one item to the bill.");
            return;
        }

        if (!calculateTotal()) {
            return;
        }

        double subtotal;
        double rate;
        double tax;
        double total;

        try {
            subtotal = Double.parseDouble(
                    subtotalLabel.getText().replace("₹", ""));
            rate = Double.parseDouble(taxRateField.getText().trim());
            tax = Double.parseDouble(
                    taxLabel.getText().replace("₹", ""));
            total = Double.parseDouble(
                    totalLabel.getText().replace("₹", ""));
        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(
                    this, "Invalid bill calculation.");
            return;
        }

        int answer = JOptionPane.showConfirmDialog(
                this,
                "Customer: " + customer
                        + "\nTotal: " + totalLabel.getText()
                        + "\n\nConfirm payment?",
                "Confirm Payment",
                JOptionPane.YES_NO_OPTION);

        if (answer != JOptionPane.YES_OPTION) {
            return;
        }

        String billSQL = "INSERT INTO bills "
                + "(customer_name, subtotal, tax_rate, tax_amount, "
                + "grand_total, payment_status) "
                + "VALUES (?, ?, ?, ?, ?, ?)";

        String itemSQL = "INSERT INTO bill_items "
                + "(bill_id, item_name, quantity, unit_price, amount) "
                + "VALUES (?, ?, ?, ?, ?)";

        try (Connection con = DBConnection.getConnection()) {

            con.setAutoCommit(false);

            try {
                int billId;

                try (PreparedStatement pst = con.prepareStatement(
                        billSQL, Statement.RETURN_GENERATED_KEYS)) {

                    pst.setString(1, customer);
                    pst.setDouble(2, subtotal);
                    pst.setDouble(3, rate);
                    pst.setDouble(4, tax);
                    pst.setDouble(5, total);
                    pst.setString(6, "Paid");

                    pst.executeUpdate();

                    try (ResultSet rs = pst.getGeneratedKeys()) {
                        if (!rs.next()) {
                            throw new SQLException(
                                    "Bill ID was not generated.");
                        }
                        billId = rs.getInt(1);
                    }
                }

                try (PreparedStatement pst = con.prepareStatement(itemSQL)) {

                    for (int i = 0; i < model.getRowCount(); i++) {

                        pst.setInt(1, billId);
                        pst.setString(2,
                                model.getValueAt(i, 0).toString());
                        pst.setInt(3,
                                Integer.parseInt(
                                        model.getValueAt(i, 1).toString()));
                        pst.setDouble(4,
                                Double.parseDouble(
                                        model.getValueAt(i, 2).toString()));
                        pst.setDouble(5,
                                Double.parseDouble(
                                        model.getValueAt(i, 3).toString()));

                        pst.addBatch();
                    }

                    pst.executeBatch();
                }

                con.commit();

                JOptionPane.showMessageDialog(
                        this,
                        "Payment completed successfully!\n"
                                + "Bill ID: " + billId
                                + "\nTotal: ₹" + String.format("%.2f", total)
                );

                clearBill();

            } catch (SQLException | RuntimeException ex) {
                con.rollback();
                throw ex;
            } finally {
                con.setAutoCommit(true);
            }

        } catch (SQLException ex) {
            JOptionPane.showMessageDialog(
                    this,
                    "Unable to save bill: " + ex.getMessage(),
                    "Database Error",
                    JOptionPane.ERROR_MESSAGE
            );
        }
    }

    private void newBill() {
        if (JOptionPane.showConfirmDialog(
                this, "Clear the current bill?",
                "New Bill", JOptionPane.YES_NO_OPTION)
                == JOptionPane.YES_OPTION) {
            clearBill();
        }
    }

    private void clearBill() {
        customerField.setText("");
        model.setRowCount(0);
        subtotalLabel.setText("₹0.00");
        taxLabel.setText("₹0.00");
        totalLabel.setText("₹0.00");
        taxRateField.setText("5");
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(
                () -> new Billing().setVisible(true));
    }
}
