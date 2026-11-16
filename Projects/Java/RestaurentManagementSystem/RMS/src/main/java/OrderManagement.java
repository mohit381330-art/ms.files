
import main.java.DBConnection;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.sql.*;

public class OrderManagement extends JFrame {

    private final DefaultTableModel model;
    private final JTable table;

    private final JTextField customerField = new JTextField(15);
    private final JTextField itemField = new JTextField(15);
    private final JTextField quantityField = new JTextField(8);
    private final JTextField amountField = new JTextField(8);

    private final JComboBox<String> statusBox =
            new JComboBox<>(new String[]{
                    "Pending", "Preparing", "Completed", "Cancelled"
            });

    private final Color navy = new Color(24, 35, 52);
    private final Color accent = new Color(232, 112, 55);
    private final Color background = new Color(245, 247, 250);

    public OrderManagement() {
        setTitle("Savora | Order Management");
        setSize(1050, 680);
        setMinimumSize(new Dimension(850, 550));
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);

        model = new DefaultTableModel(
                new String[]{"Order ID", "Customer", "Item", "Quantity", "Amount", "Status"}, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };

        table = new JTable(model);
        table.setRowHeight(38);
        table.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);

        buildUI();
        loadOrders();
    }

    private void buildUI() {
        JPanel main = new JPanel(new BorderLayout(15, 15));
        main.setBackground(background);
        main.setBorder(new EmptyBorder(20, 20, 20, 20));
        setContentPane(main);

        JLabel heading = new JLabel("Order Management");
        heading.setFont(new Font("SansSerif", Font.BOLD, 26));
        heading.setForeground(navy);

        JLabel subtitle = new JLabel("Create and manage restaurant orders.");

        JPanel header = new JPanel(new BorderLayout());
        header.setOpaque(false);
        header.add(heading, BorderLayout.NORTH);
        header.add(subtitle, BorderLayout.SOUTH);
        main.add(header, BorderLayout.NORTH);

        JPanel form = new JPanel(new GridBagLayout());
        form.setBackground(Color.WHITE);
        form.setBorder(new EmptyBorder(15, 15, 15, 15));

        GridBagConstraints c = new GridBagConstraints();
        c.insets = new Insets(6, 6, 6, 6);
        c.fill = GridBagConstraints.HORIZONTAL;

        addField(form, c, 0, "Customer", customerField);
        addField(form, c, 1, "Item", itemField);
        addField(form, c, 2, "Quantity", quantityField);
        addField(form, c, 3, "Amount", amountField);
        addField(form, c, 4, "Status", statusBox);

        JPanel buttons = new JPanel(new FlowLayout(FlowLayout.LEFT));
        buttons.setOpaque(false);

        JButton addButton = new JButton("Add Order");
        JButton updateButton = new JButton("Update");
        JButton deleteButton = new JButton("Delete");
        JButton clearButton = new JButton("Clear Fields");

        addButton.setBackground(accent);
        addButton.setForeground(Color.WHITE);

        buttons.add(addButton);
        buttons.add(updateButton);
        buttons.add(deleteButton);
        buttons.add(clearButton);

        JPanel formPanel = new JPanel(new BorderLayout());
        formPanel.setOpaque(false);
        formPanel.add(form, BorderLayout.CENTER);
        formPanel.add(buttons, BorderLayout.SOUTH);

        main.add(formPanel, BorderLayout.CENTER);
        main.add(new JScrollPane(table), BorderLayout.SOUTH);

        table.getSelectionModel().addListSelectionListener(e -> {
            if (!e.getValueIsAdjusting() && table.getSelectedRow() != -1) {
                int row = table.convertRowIndexToModel(table.getSelectedRow());

                customerField.setText(model.getValueAt(row, 1).toString());
                itemField.setText(model.getValueAt(row, 2).toString());
                quantityField.setText(model.getValueAt(row, 3).toString());
                amountField.setText(model.getValueAt(row, 4).toString());
                statusBox.setSelectedItem(model.getValueAt(row, 5).toString());
            }
        });

        addButton.addActionListener(e -> addOrder());
        updateButton.addActionListener(e -> updateOrder());
        deleteButton.addActionListener(e -> deleteOrder());
        clearButton.addActionListener(e -> clearFields());
    }

    private void addField(JPanel panel, GridBagConstraints c,
                          int row, String label, JComponent field) {
        c.gridx = 0;
        c.gridy = row;
        panel.add(new JLabel(label), c);

        c.gridx = 1;
        panel.add(field, c);
    }

    private void loadOrders() {
        model.setRowCount(0);

        String sql = "SELECT * FROM orders ORDER BY order_id DESC";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                model.addRow(new Object[]{
                        rs.getInt("order_id"),
                        rs.getString("customer"),
                        rs.getString("item"),
                        rs.getInt("quantity"),
                        rs.getBigDecimal("amount"),
                        rs.getString("status")
                });
            }

        } catch (SQLException ex) {
            showError("Unable to load orders: " + ex.getMessage());
        }
    }

    private void addOrder() {
        String customer = customerField.getText().trim();
        String item = itemField.getText().trim();

        if (customer.isEmpty() || item.isEmpty()
                || quantityField.getText().trim().isEmpty()
                || amountField.getText().trim().isEmpty()) {
            showError("Please fill all required fields.");
            return;
        }

        int quantity;
        double amount;

        try {
            quantity = Integer.parseInt(quantityField.getText().trim());
            amount = Double.parseDouble(amountField.getText().trim());

            if (quantity <= 0 || !Double.isFinite(amount) || amount < 0) {
                showError("Quantity must be positive and amount must be valid.");
                return;
            }

        } catch (NumberFormatException ex) {
            showError("Quantity must be an integer and amount must be numeric.");
            return;
        }

        String sql = "INSERT INTO orders(customer,item,quantity,amount,status) VALUES(?,?,?,?,?)";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, customer);
            ps.setString(2, item);
            ps.setInt(3, quantity);
            ps.setDouble(4, amount);
            ps.setString(5, statusBox.getSelectedItem().toString());

            ps.executeUpdate();

            JOptionPane.showMessageDialog(this, "Order added successfully.");
            loadOrders();
            clearFields();

        } catch (SQLException ex) {
            showError("Add failed: " + ex.getMessage());
        }
    }

    private void updateOrder() {
        int selected = table.getSelectedRow();

        if (selected == -1) {
            showError("Please select an order.");
            return;
        }

        int row = table.convertRowIndexToModel(selected);
        int orderId = Integer.parseInt(model.getValueAt(row, 0).toString());

        String customer = customerField.getText().trim();
        String item = itemField.getText().trim();

        if (customer.isEmpty() || item.isEmpty()
                || quantityField.getText().trim().isEmpty()
                || amountField.getText().trim().isEmpty()) {
            showError("Please fill all required fields.");
            return;
        }

        int quantity;
        double amount;

        try {
            quantity = Integer.parseInt(quantityField.getText().trim());
            amount = Double.parseDouble(amountField.getText().trim());

            if (quantity <= 0 || !Double.isFinite(amount) || amount < 0) {
                showError("Quantity must be positive and amount must be valid.");
                return;
            }

        } catch (NumberFormatException ex) {
            showError("Quantity must be an integer and amount must be numeric.");
            return;
        }

        String sql = "UPDATE orders SET customer=?,item=?,quantity=?,amount=?,status=? WHERE order_id=?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, customer);
            ps.setString(2, item);
            ps.setInt(3, quantity);
            ps.setDouble(4, amount);
            ps.setString(5, statusBox.getSelectedItem().toString());
            ps.setInt(6, orderId);

            ps.executeUpdate();

            JOptionPane.showMessageDialog(this, "Order updated successfully.");
            loadOrders();
            clearFields();

        } catch (SQLException ex) {
            showError("Update failed: " + ex.getMessage());
        }
    }

    private void deleteOrder() {
        int selected = table.getSelectedRow();

        if (selected == -1) {
            showError("Please select an order.");
            return;
        }

        int row = table.convertRowIndexToModel(selected);
        int orderId = Integer.parseInt(model.getValueAt(row, 0).toString());

        int confirm = JOptionPane.showConfirmDialog(
                this, "Delete selected order?", "Confirm",
                JOptionPane.YES_NO_OPTION);

        if (confirm != JOptionPane.YES_OPTION) return;

        String sql = "DELETE FROM orders WHERE order_id=?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, orderId);
            ps.executeUpdate();

            JOptionPane.showMessageDialog(this, "Order deleted successfully.");
            loadOrders();
            clearFields();

        } catch (SQLException ex) {
            showError("Delete failed: " + ex.getMessage());
        }
    }

    private void clearFields() {
        customerField.setText("");
        itemField.setText("");
        quantityField.setText("");
        amountField.setText("");
        statusBox.setSelectedIndex(0);
        table.clearSelection();
    }

    private void showError(String message) {
        JOptionPane.showMessageDialog(this, message,
                "Error", JOptionPane.ERROR_MESSAGE);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() ->
                new OrderManagement().setVisible(true));
    }
}
