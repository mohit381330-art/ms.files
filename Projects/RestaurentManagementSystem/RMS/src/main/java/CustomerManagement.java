
import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class CustomerManagement extends JFrame {

    private final String role;

    private final Color navy = new Color(24, 35, 52);
    private final Color accent = new Color(232, 112, 55);
    private final Color background = new Color(245, 247, 250);
    private final Color muted = new Color(115, 125, 140);

    private final DefaultTableModel model = new DefaultTableModel(
            new String[]{"ID", "Customer Name", "Phone", "Email", "Address"}, 0
    ) {
        @Override
        public boolean isCellEditable(int row, int column) {
            return false;
        }
    };

    private final JTable table = new JTable(model);

    private final JTextField nameField = new JTextField(15);
    private final JTextField phoneField = new JTextField(12);
    private final JTextField emailField = new JTextField(15);
    private final JTextField addressField = new JTextField(18);

    private JButton addButton;
    private JButton updateButton;
    private JButton deleteButton;

    public CustomerManagement() {
        this("Administrator");
    }

    public CustomerManagement(String role) {
        this.role = role == null ? "Staff" : role;

        boolean isAdmin = isAdmin();

        setTitle("Savora | Customer Management");
        setSize(1100, 700);
        setMinimumSize(new Dimension(900, 570));
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);

        JPanel root = new JPanel(new BorderLayout(0, 18));
        root.setBackground(background);
        root.setBorder(new EmptyBorder(25, 28, 25, 28));

        // Header
        JPanel header = new JPanel(new BorderLayout());
        header.setOpaque(false);

        JPanel titles = new JPanel();
        titles.setOpaque(false);
        titles.setLayout(new BoxLayout(titles, BoxLayout.Y_AXIS));

        JLabel title = new JLabel("Customer Management");
        title.setFont(new Font("SansSerif", Font.BOLD, 27));
        title.setForeground(navy);

        JLabel subtitle = new JLabel(
                isAdmin
                        ? "Manage customer information and records."
                        : "View and register customers."
        );
        subtitle.setFont(new Font("SansSerif", Font.PLAIN, 13));
        subtitle.setForeground(muted);

        titles.add(title);
        titles.add(Box.createVerticalStrut(7));
        titles.add(subtitle);

        JLabel roleLabel = new JLabel("Logged in as: " + this.role);
        roleLabel.setFont(new Font("SansSerif", Font.BOLD, 12));
        roleLabel.setForeground(accent);

        header.add(titles, BorderLayout.CENTER);
        header.add(roleLabel, BorderLayout.EAST);

        root.add(header, BorderLayout.NORTH);

        // Customer Form
        JPanel form = new JPanel(new GridBagLayout());
        form.setBackground(Color.WHITE);
        form.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(new Color(229, 233, 239)),
                new EmptyBorder(15, 15, 15, 15)
        ));

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 6, 5, 6);
        gbc.anchor = GridBagConstraints.WEST;
        gbc.fill = GridBagConstraints.HORIZONTAL;

        addField(form, gbc, "Customer Name", nameField, 0);
        addField(form, gbc, "Phone", phoneField, 1);
        addField(form, gbc, "Email", emailField, 2);
        addField(form, gbc, "Address", addressField, 3);

        JPanel actions = new JPanel(new FlowLayout(FlowLayout.LEFT, 8, 5));
        actions.setOpaque(false);

        addButton = createButton("Add Customer", accent);
        updateButton = createButton("Update", navy);
        deleteButton = createButton("Delete", new Color(190, 55, 55));
        JButton clearButton = createButton(
                "Clear Fields", new Color(95, 105, 120)
        );

        actions.add(addButton);
        actions.add(updateButton);
        actions.add(deleteButton);
        actions.add(clearButton);

        gbc.gridx = 0;
        gbc.gridy = 2;
        gbc.gridwidth = 4;
        form.add(actions, gbc);

        // Table
        table.setRowHeight(38);
        table.setFont(new Font("SansSerif", Font.PLAIN, 13));
        table.setForeground(navy);
        table.setSelectionBackground(new Color(255, 235, 220));
        table.setSelectionForeground(navy);
        table.setGridColor(new Color(235, 238, 243));
        table.setShowVerticalLines(false);
        table.setFillsViewportHeight(true);
        table.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);

        table.getTableHeader().setFont(
                new Font("SansSerif", Font.BOLD, 12)
        );
        table.getTableHeader().setBackground(new Color(249, 250, 252));
        table.getTableHeader().setForeground(navy);
        table.getTableHeader().setPreferredSize(new Dimension(0, 40));
        table.getTableHeader().setReorderingAllowed(false);

        JScrollPane scrollPane = new JScrollPane(table);
        scrollPane.setBorder(BorderFactory.createLineBorder(
                new Color(229, 233, 239)
        ));
        scrollPane.getViewport().setBackground(Color.WHITE);

        JPanel tablePanel = new JPanel(new BorderLayout(0, 12));
        tablePanel.setBackground(Color.WHITE);
        tablePanel.setBorder(new EmptyBorder(12, 12, 12, 12));

        JLabel tableTitle = new JLabel("Customer Records");
        tableTitle.setFont(new Font("SansSerif", Font.BOLD, 16));
        tableTitle.setForeground(navy);

        tablePanel.add(tableTitle, BorderLayout.NORTH);
        tablePanel.add(scrollPane, BorderLayout.CENTER);

        // Main Content - No Search Panel
        JPanel content = new JPanel(new BorderLayout(0, 12));
        content.setOpaque(false);

        content.add(form, BorderLayout.NORTH);
        content.add(tablePanel, BorderLayout.CENTER);

        root.add(content, BorderLayout.CENTER);
        setContentPane(root);

        // Staff can Add and View.
        // Admin can Add, View, Update and Delete.
        updateButton.setEnabled(isAdmin);
        deleteButton.setEnabled(isAdmin);

        updateButton.setToolTipText(
                isAdmin ? "Update selected customer" : "Admin permission required"
        );

        deleteButton.setToolTipText(
                isAdmin ? "Delete selected customer" : "Admin permission required"
        );

        // Button Actions
        addButton.addActionListener(e -> addCustomer());
        updateButton.addActionListener(e -> updateCustomer());
        deleteButton.addActionListener(e -> deleteCustomer());
        clearButton.addActionListener(e -> clearFields());

        // Load customer records from MySQL
        loadCustomers();

        // Select Table Row
        table.getSelectionModel().addListSelectionListener(e -> {
            if (!e.getValueIsAdjusting() && table.getSelectedRow() != -1) {

                int row = table.getSelectedRow();

                nameField.setText(model.getValueAt(row, 1).toString());
                phoneField.setText(model.getValueAt(row, 2).toString());
                emailField.setText(model.getValueAt(row, 3).toString());
                addressField.setText(model.getValueAt(row, 4).toString());
            }
        });
    }

    private void addField(
            JPanel panel,
            GridBagConstraints gbc,
            String label,
            JComponent field,
            int column) {

        gbc.gridwidth = 1;
        gbc.gridx = column;
        gbc.gridy = 0;

        JLabel heading = new JLabel(label);
        heading.setFont(new Font("SansSerif", Font.BOLD, 12));
        heading.setForeground(navy);
        panel.add(heading, gbc);

        gbc.gridy = 1;
        panel.add(field, gbc);
    }

    private JButton createButton(String text, Color color) {
        JButton button = new JButton(text);
        button.setFont(new Font("SansSerif", Font.BOLD, 12));
        button.setForeground(Color.WHITE);
        button.setBackground(color);
        button.setFocusPainted(false);
        button.setBorderPainted(false);
        button.setCursor(new Cursor(Cursor.HAND_CURSOR));
        button.setPreferredSize(new Dimension(125, 34));
        return button;
    }

    private boolean isAdmin() {
        return "Administrator".equalsIgnoreCase(role);
    }

    private boolean checkAdminPermission() {
        if (!isAdmin()) {
            JOptionPane.showMessageDialog(
                    this,
                    "Only administrators can update or delete customers.",
                    "Access Denied",
                    JOptionPane.WARNING_MESSAGE
            );
            return false;
        }
        return true;
    }

    // READ - Load Customers from Database
    private void loadCustomers() {

        model.setRowCount(0);

        String sql = "SELECT * FROM customers ORDER BY id";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement pst = con.prepareStatement(sql);
             ResultSet rs = pst.executeQuery()) {

            while (rs.next()) {
                model.addRow(new Object[]{
                        rs.getInt("id"),
                        rs.getString("customer_name"),
                        rs.getString("phone"),
                        rs.getString("email"),
                        rs.getString("address")
                });
            }

        } catch (SQLException e) {
            JOptionPane.showMessageDialog(
                    this,
                    "Unable to load customers: " + e.getMessage(),
                    "Database Error",
                    JOptionPane.ERROR_MESSAGE
            );
        }
    }

    // CREATE - Add Customer
    private void addCustomer() {

        String name = nameField.getText().trim();
        String phone = phoneField.getText().trim();
        String email = emailField.getText().trim();
        String address = addressField.getText().trim();

        if (name.isEmpty() || phone.isEmpty()) {
            JOptionPane.showMessageDialog(
                    this,
                    "Customer name and phone are required.",
                    "Missing Information",
                    JOptionPane.WARNING_MESSAGE
            );
            return;
        }

        String sql = "INSERT INTO customers "
                + "(customer_name, phone, email, address) "
                + "VALUES (?, ?, ?, ?)";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement pst = con.prepareStatement(sql)) {

            pst.setString(1, name);
            pst.setString(2, phone);
            pst.setString(3, email);
            pst.setString(4, address);

            pst.executeUpdate();

            loadCustomers();
            clearFields();

            JOptionPane.showMessageDialog(
                    this, "Customer added successfully."
            );

        } catch (SQLException e) {
            if ("23000".equals(e.getSQLState())) {
                JOptionPane.showMessageDialog(
                        this,
                        "This phone number already exists.",
                        "Duplicate Customer",
                        JOptionPane.WARNING_MESSAGE
                );
            } else {
                JOptionPane.showMessageDialog(
                        this,
                        "Unable to add customer: " + e.getMessage(),
                        "Database Error",
                        JOptionPane.ERROR_MESSAGE
                );
            }
        }
    }

    // UPDATE - Update Selected Customer
    private void updateCustomer() {

        if (!checkAdminPermission()) {
            return;
        }

        int row = table.getSelectedRow();

        if (row == -1) {
            JOptionPane.showMessageDialog(
                    this, "Please select a customer to update."
            );
            return;
        }

        String name = nameField.getText().trim();
        String phone = phoneField.getText().trim();
        String email = emailField.getText().trim();
        String address = addressField.getText().trim();

        if (name.isEmpty() || phone.isEmpty()) {
            JOptionPane.showMessageDialog(
                    this, "Customer name and phone are required."
            );
            return;
        }

        int id = Integer.parseInt(model.getValueAt(row, 0).toString());

        String sql = "UPDATE customers SET customer_name=?, "
                + "phone=?, email=?, address=? WHERE id=?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement pst = con.prepareStatement(sql)) {

            pst.setString(1, name);
            pst.setString(2, phone);
            pst.setString(3, email);
            pst.setString(4, address);
            pst.setInt(5, id);

            pst.executeUpdate();

            loadCustomers();
            clearFields();

            JOptionPane.showMessageDialog(
                    this, "Customer updated successfully."
            );

        } catch (SQLException e) {
            if ("23000".equals(e.getSQLState())) {
                JOptionPane.showMessageDialog(
                        this,
                        "This phone number already exists.",
                        "Duplicate Customer",
                        JOptionPane.WARNING_MESSAGE
                );
            } else {
                JOptionPane.showMessageDialog(
                        this,
                        "Unable to update customer: " + e.getMessage(),
                        "Database Error",
                        JOptionPane.ERROR_MESSAGE
                );
            }
        }
    }

    // DELETE - Delete Selected Customer
    private void deleteCustomer() {

        if (!checkAdminPermission()) {
            return;
        }

        int row = table.getSelectedRow();

        if (row == -1) {
            JOptionPane.showMessageDialog(
                    this, "Please select a customer to delete."
            );
            return;
        }

        int answer = JOptionPane.showConfirmDialog(
                this,
                "Are you sure you want to delete this customer?",
                "Confirm Delete",
                JOptionPane.YES_NO_OPTION
        );

        if (answer == JOptionPane.YES_OPTION) {

            int id = Integer.parseInt(model.getValueAt(row, 0).toString());

            String sql = "DELETE FROM customers WHERE id=?";

            try (Connection con = DBConnection.getConnection();
                 PreparedStatement pst = con.prepareStatement(sql)) {

                pst.setInt(1, id);
                pst.executeUpdate();

                loadCustomers();
                clearFields();

                JOptionPane.showMessageDialog(
                        this, "Customer deleted successfully."
                );

            } catch (SQLException e) {
                JOptionPane.showMessageDialog(
                        this,
                        "Unable to delete customer: " + e.getMessage(),
                        "Database Error",
                        JOptionPane.ERROR_MESSAGE
                );
            }
        }
    }

    // Clear Form Fields
    private void clearFields() {
        nameField.setText("");
        phoneField.setText("");
        emailField.setText("");
        addressField.setText("");
        table.clearSelection();
        nameField.requestFocusInWindow();
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() ->
                new CustomerManagement("Administrator").setVisible(true)
        );
    }
}
