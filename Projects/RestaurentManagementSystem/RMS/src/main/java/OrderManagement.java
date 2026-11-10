
import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class OrderManagement extends JFrame {

    private JTextField customerField, itemField, quantityField, amountField;
    private JComboBox<String> statusBox;
    private DefaultTableModel model;
    private JTable table;

    public OrderManagement() {
        setTitle("Order Management");
        setSize(1250, 650);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);

        JPanel form = new JPanel(new GridLayout(2, 5, 8, 8));

        customerField = new JTextField();
        itemField = new JTextField();
        quantityField = new JTextField();
        amountField = new JTextField();

        statusBox = new JComboBox<>(
                new String[]{"Pending", "Preparing", "Completed", "Cancelled"}
        );

        form.add(new JLabel("Customer"));
        form.add(new JLabel("Item"));
        form.add(new JLabel("Quantity"));
        form.add(new JLabel("Total Amount"));
        form.add(new JLabel("Status"));

        form.add(customerField);
        form.add(itemField);
        form.add(quantityField);
        form.add(amountField);
        form.add(statusBox);

        model = new DefaultTableModel(
                new String[]{"Order ID", "Customer", "Item",
                        "Quantity", "Amount", "Status"}, 0
        ) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };

        table = new JTable(model);
        table.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);

        JButton add = new JButton("Add Order");
        JButton update = new JButton("Update");
        JButton delete = new JButton("Delete");
        JButton clear = new JButton("Clear");

        JPanel buttons = new JPanel();
        buttons.add(add);
        buttons.add(update);
        buttons.add(delete);
        buttons.add(clear);

        add.addActionListener(e -> addOrder());
        update.addActionListener(e -> updateOrder());
        delete.addActionListener(e -> deleteOrder());
        clear.addActionListener(e -> clearFields());

        table.getSelectionModel().addListSelectionListener(e -> {
            if (!e.getValueIsAdjusting() && table.getSelectedRow() >= 0) {
                int row = table.getSelectedRow();

                customerField.setText(model.getValueAt(row, 1).toString());
                itemField.setText(model.getValueAt(row, 2).toString());
                quantityField.setText(model.getValueAt(row, 3).toString());
                amountField.setText(model.getValueAt(row, 4).toString());
                statusBox.setSelectedItem(model.getValueAt(row, 5).toString());
            }
        });

        setLayout(new BorderLayout(10, 10));
        add(form, BorderLayout.NORTH);
        add(new JScrollPane(table), BorderLayout.CENTER);
        add(buttons, BorderLayout.SOUTH);

        loadOrders();

        setVisible(true);
    }

    // LOAD ORDERS FROM DATABASE
    private void loadOrders() {

        model.setRowCount(0);

        String sql = "SELECT * FROM orders ORDER BY order_id DESC";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement pst = con.prepareStatement(sql);
             ResultSet rs = pst.executeQuery()) {

            while (rs.next()) {
                model.addRow(new Object[]{
                        rs.getInt("order_id"),
                        rs.getString("customer"),
                        rs.getString("item"),
                        rs.getInt("quantity"),
                        rs.getDouble("amount"),
                        rs.getString("status")
                });
            }

        } catch (SQLException ex) {
            JOptionPane.showMessageDialog(
                    this, "Unable to load orders: " + ex.getMessage()
            );
        }
    }

    // ADD ORDER
    private void addOrder() {

        try {
            String customer = customerField.getText().trim();
            String item = itemField.getText().trim();

            if (customer.isEmpty() || item.isEmpty()
                    || quantityField.getText().trim().isEmpty()
                    || amountField.getText().trim().isEmpty()) {

                JOptionPane.showMessageDialog(this, "Please fill all fields.");
                return;
            }

            int quantity = Integer.parseInt(quantityField.getText().trim());
            double amount = Double.parseDouble(amountField.getText().trim());

            if (quantity <= 0 || amount < 0) {
                JOptionPane.showMessageDialog(this, "Enter valid order details.");
                return;
            }

            String sql = "INSERT INTO orders " +
                    "(customer, item, quantity, amount, status) " +
                    "VALUES (?, ?, ?, ?, ?)";

            try (Connection con = DBConnection.getConnection();
                 PreparedStatement pst = con.prepareStatement(sql)) {

                pst.setString(1, customer);
                pst.setString(2, item);
                pst.setInt(3, quantity);
                pst.setDouble(4, amount);
                pst.setString(5, statusBox.getSelectedItem().toString());

                pst.executeUpdate();

                JOptionPane.showMessageDialog(this, "Order added successfully!");

                loadOrders();
                clearFields();
            }

        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(
                    this, "Quantity and amount must be valid numbers."
            );
        } catch (SQLException ex) {
            JOptionPane.showMessageDialog(
                    this, "Error adding order: " + ex.getMessage()
            );
        }
    }

    // UPDATE ORDER
    private void updateOrder() {

        int row = table.getSelectedRow();

        if (row < 0) {
            JOptionPane.showMessageDialog(this, "Please select an order.");
            return;
        }

        try {
            String customer = customerField.getText().trim();
            String item = itemField.getText().trim();

            if (customer.isEmpty() || item.isEmpty()
                    || quantityField.getText().trim().isEmpty()
                    || amountField.getText().trim().isEmpty()) {

                JOptionPane.showMessageDialog(this, "Please fill all fields.");
                return;
            }

            int quantity = Integer.parseInt(quantityField.getText().trim());
            double amount = Double.parseDouble(amountField.getText().trim());

            if (quantity <= 0 || amount < 0) {
                JOptionPane.showMessageDialog(this, "Enter valid order details.");
                return;
            }

            int orderId = Integer.parseInt(
                    model.getValueAt(row, 0).toString()
            );

            String sql = "UPDATE orders SET customer=?, item=?, " +
                    "quantity=?, amount=?, status=? WHERE order_id=?";

            try (Connection con = DBConnection.getConnection();
                 PreparedStatement pst = con.prepareStatement(sql)) {

                pst.setString(1, customer);
                pst.setString(2, item);
                pst.setInt(3, quantity);
                pst.setDouble(4, amount);
                pst.setString(5, statusBox.getSelectedItem().toString());
                pst.setInt(6, orderId);

                pst.executeUpdate();

                JOptionPane.showMessageDialog(this, "Order updated successfully!");

                loadOrders();
                clearFields();
            }

        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(
                    this, "Enter valid numeric values."
            );
        } catch (SQLException ex) {
            JOptionPane.showMessageDialog(
                    this, "Error updating order: " + ex.getMessage()
            );
        }
    }

    // DELETE ORDER
    private void deleteOrder() {

        int row = table.getSelectedRow();

        if (row < 0) {
            JOptionPane.showMessageDialog(this, "Please select an order.");
            return;
        }

        int confirm = JOptionPane.showConfirmDialog(
                this,
                "Are you sure you want to delete this order?",
                "Confirm Delete",
                JOptionPane.YES_NO_OPTION
        );

        if (confirm != JOptionPane.YES_OPTION) {
            return;
        }

        int orderId = Integer.parseInt(
                model.getValueAt(row, 0).toString()
        );

        String sql = "DELETE FROM orders WHERE order_id=?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement pst = con.prepareStatement(sql)) {

            pst.setInt(1, orderId);
            pst.executeUpdate();

            JOptionPane.showMessageDialog(this, "Order deleted successfully!");

            loadOrders();
            clearFields();

        } catch (SQLException ex) {
            JOptionPane.showMessageDialog(
                    this, "Error deleting order: " + ex.getMessage()
            );
        }
    }

    // CLEAR FIELDS
    private void clearFields() {

        customerField.setText("");
        itemField.setText("");
        quantityField.setText("");
        amountField.setText("");

        statusBox.setSelectedIndex(0);
        table.clearSelection();
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(OrderManagement::new);
    }
}
