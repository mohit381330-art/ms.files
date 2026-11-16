
import main.java.DBConnection;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.sql.*;

public class CustomerManagement extends JFrame {

    private final String role;
    private final boolean admin;

    private final DefaultTableModel model;
    private final JTable table;

    private final JTextField nameField = new JTextField(15);
    private final JTextField phoneField = new JTextField(15);
    private final JTextField emailField = new JTextField(15);
    private final JTextField addressField = new JTextField(15);

    private final Color navy = new Color(24, 35, 52);
    private final Color accent = new Color(232, 112, 55);
    private final Color background = new Color(245, 247, 250);

    public CustomerManagement() {
        this("Administrator");
    }

    public CustomerManagement(String role) {
        this.role = role == null ? "Staff" : role;
        this.admin = "Administrator".equalsIgnoreCase(this.role);

        setTitle("Savora | Customer Management");
        setSize(1050, 680);
        setMinimumSize(new Dimension(850, 550));
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);

        model = new DefaultTableModel(
                new String[]{"ID", "Customer Name", "Phone", "Email", "Address"}, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };

        table = new JTable(model);
        table.setRowHeight(38);
        table.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);

        buildUI();
        loadCustomers();
        applyPermissions();
    }

    private void buildUI() {
        JPanel main = new JPanel(new BorderLayout(15, 15));
        main.setBackground(background);
        main.setBorder(new EmptyBorder(20, 20, 20, 20));
        setContentPane(main);

        JLabel heading = new JLabel("Customer Management");
        heading.setFont(new Font("SansSerif", Font.BOLD, 26));
        heading.setForeground(navy);

        JLabel subtitle = new JLabel("Manage restaurant customers.");

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

        addField(form, c, 0, "Customer Name", nameField);
        addField(form, c, 1, "Phone", phoneField);
        addField(form, c, 2, "Email", emailField);
        addField(form, c, 3, "Address", addressField);

        JPanel buttons = new JPanel(new FlowLayout(FlowLayout.LEFT));
        buttons.setOpaque(false);

        JButton addButton = new JButton("Add Customer");
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

                nameField.setText(model.getValueAt(row, 1).toString());
                phoneField.setText(model.getValueAt(row, 2).toString());

                Object email = model.getValueAt(row, 3);
                Object address = model.getValueAt(row, 4);

                emailField.setText(email == null ? "" : email.toString());
                addressField.setText(address == null ? "" : address.toString());
            }
        });

        addButton.addActionListener(e -> addCustomer());
        updateButton.addActionListener(e -> updateCustomer());
        deleteButton.addActionListener(e -> deleteCustomer());
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

    private void applyPermissions() {
        // Staff can add customers, but cannot update/delete.
        // Admin can perform all operations.
    }

    private void loadCustomers() {
        model.setRowCount(0);

        String sql = "SELECT * FROM customers ORDER BY id";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                model.addRow(new Object[]{
                        rs.getInt("id"),
                        rs.getString("customer_name"),
                        rs.getString("phone"),
                        rs.getString("email"),
                        rs.getString("address")
                });
            }

        } catch (SQLException ex) {
            showError("Unable to load customers: " + ex.getMessage());
        }
    }

    private void addCustomer() {
        String name = nameField.getText().trim();
        String phone = phoneField.getText().trim();
        String email = emailField.getText().trim();
        String address = addressField.getText().trim();

        if (name.isEmpty() || phone.isEmpty()) {
            showError("Customer name and phone are required.");
            return;
        }

        String sql = "INSERT INTO customers(customer_name,phone,email,address) VALUES(?,?,?,?)";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, name);
            ps.setString(2, phone);
            ps.setString(3, email.isEmpty() ? null : email);
            ps.setString(4, address.isEmpty() ? null : address);

            ps.executeUpdate();

            JOptionPane.showMessageDialog(this, "Customer added successfully.");
            loadCustomers();
            clearFields();

        } catch (SQLException ex) {
            if ("23000".equals(ex.getSQLState())) {
                showError("This phone number already exists.");
            } else {
                showError("Add failed: " + ex.getMessage());
            }
        }
    }

    private void updateCustomer() {
        if (!admin) {
            showError("Admin permission required.");
            return;
        }

        int selected = table.getSelectedRow();
        if (selected == -1) {
            showError("Please select a customer.");
            return;
        }

        int row = table.convertRowIndexToModel(selected);
        int id = Integer.parseInt(model.getValueAt(row, 0).toString());

        String name = nameField.getText().trim();
        String phone = phoneField.getText().trim();
        String email = emailField.getText().trim();
        String address = addressField.getText().trim();

        if (name.isEmpty() || phone.isEmpty()) {
            showError("Customer name and phone are required.");
            return;
        }

        String sql = "UPDATE customers SET customer_name=?,phone=?,email=?,address=? WHERE id=?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, name);
            ps.setString(2, phone);
            ps.setString(3, email.isEmpty() ? null : email);
            ps.setString(4, address.isEmpty() ? null : address);
            ps.setInt(5, id);

            ps.executeUpdate();

            JOptionPane.showMessageDialog(this, "Customer updated successfully.");
            loadCustomers();
            clearFields();

        } catch (SQLException ex) {
            if ("23000".equals(ex.getSQLState())) {
                showError("This phone number already exists.");
            } else {
                showError("Update failed: " + ex.getMessage());
            }
        }
    }

    private void deleteCustomer() {
        if (!admin) {
            showError("Admin permission required.");
            return;
        }

        int selected = table.getSelectedRow();
        if (selected == -1) {
            showError("Please select a customer.");
            return;
        }

        int row = table.convertRowIndexToModel(selected);
        int id = Integer.parseInt(model.getValueAt(row, 0).toString());

        int confirm = JOptionPane.showConfirmDialog(
                this, "Delete selected customer?", "Confirm",
                JOptionPane.YES_NO_OPTION);

        if (confirm != JOptionPane.YES_OPTION) return;

        String sql = "DELETE FROM customers WHERE id=?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, id);
            ps.executeUpdate();

            JOptionPane.showMessageDialog(this, "Customer deleted successfully.");
            loadCustomers();
            clearFields();

        } catch (SQLException ex) {
            showError("Delete failed: " + ex.getMessage());
        }
    }

    private void clearFields() {
        nameField.setText("");
        phoneField.setText("");
        emailField.setText("");
        addressField.setText("");
        table.clearSelection();
    }

    private void showError(String message) {
        JOptionPane.showMessageDialog(this, message,
                "Error", JOptionPane.ERROR_MESSAGE);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() ->
                new CustomerManagement("Administrator").setVisible(true));
    }
}
