
import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class MenuManagement extends JFrame {

    private final String role;

    private final Color navy = new Color(24, 35, 52);
    private final Color accent = new Color(232, 112, 55);
    private final Color background = new Color(245, 247, 250);

    private final DefaultTableModel model = new DefaultTableModel(
            new String[]{"ID", "Item Name", "Category", "Price", "Availability"}, 0
    ) {
        @Override
        public boolean isCellEditable(int row, int column) {
            return false;
        }
    };

    private final JTable table = new JTable(model);

    private final JTextField nameField = new JTextField(15);
    private final JTextField categoryField = new JTextField(12);
    private final JTextField priceField = new JTextField(8);

    private final JComboBox<String> availabilityBox =
            new JComboBox<>(new String[]{"Available", "Unavailable"});

    private JButton addButton;
    private JButton updateButton;
    private JButton deleteButton;

    public MenuManagement() {
        this("Administrator");
    }

    public MenuManagement(String role) {

        this.role = role == null ? "Staff" : role;

        setTitle("Savora | Menu Management");
        setSize(1050, 680);
        setMinimumSize(new Dimension(850, 550));
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);

        styleInput(nameField);
        styleInput(categoryField);
        styleInput(priceField);

        boolean isAdmin =
                "Administrator".equalsIgnoreCase(this.role);

        JPanel root = new JPanel(new BorderLayout(0, 18));
        root.setBackground(background);
        root.setBorder(new EmptyBorder(25, 28, 25, 28));

        // HEADER
        JPanel header = new JPanel(new BorderLayout());
        header.setOpaque(false);

        JPanel titles = new JPanel();
        titles.setLayout(new BoxLayout(titles, BoxLayout.Y_AXIS));
        titles.setOpaque(false);

        JLabel title = new JLabel("Menu Management");
        title.setFont(new Font("SansSerif", Font.BOLD, 27));
        title.setForeground(navy);

        JLabel subtitle = new JLabel(
                isAdmin
                        ? "Add, update and manage restaurant menu items."
                        : "View restaurant menu items."
        );

        subtitle.setFont(new Font("SansSerif", Font.PLAIN, 13));
        subtitle.setForeground(new Color(115, 125, 140));

        titles.add(title);
        titles.add(Box.createVerticalStrut(7));
        titles.add(subtitle);

        JLabel roleLabel = new JLabel("Logged in as: " + this.role);
        roleLabel.setFont(new Font("SansSerif", Font.BOLD, 12));
        roleLabel.setForeground(accent);

        header.add(titles, BorderLayout.CENTER);
        header.add(roleLabel, BorderLayout.EAST);

        root.add(header, BorderLayout.NORTH);

        // MAIN CONTENT
        JPanel content = new JPanel(new BorderLayout(0, 15));
        content.setOpaque(false);

        // ITEM FORM
        JPanel form = new JPanel(new GridBagLayout());
        form.setBackground(Color.WHITE);

        form.setBorder(
                BorderFactory.createCompoundBorder(
                        BorderFactory.createLineBorder(
                                new Color(229, 233, 239)
                        ),
                        new EmptyBorder(18, 18, 18, 18)
                )
        );

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 6, 5, 6);
        gbc.anchor = GridBagConstraints.WEST;
        gbc.fill = GridBagConstraints.HORIZONTAL;

        addFormField(form, gbc, "Item Name", nameField, 0, 0);
        addFormField(form, gbc, "Category", categoryField, 1, 0);
        addFormField(form, gbc, "Price", priceField, 2, 0);
        addFormField(form, gbc, "Availability", availabilityBox, 3, 0);

        // ACTION BUTTONS
        JPanel actionButtons =
                new JPanel(new FlowLayout(FlowLayout.LEFT, 8, 5));

        actionButtons.setOpaque(false);

        addButton = createButton("Add Item", accent);
        updateButton = createButton("Update", navy);
        deleteButton = createButton("Delete", new Color(190, 55, 55));

        JButton clearButton =
                createButton("Clear Fields", new Color(95, 105, 120));

        actionButtons.add(addButton);
        actionButtons.add(updateButton);
        actionButtons.add(deleteButton);
        actionButtons.add(clearButton);

        gbc.gridx = 0;
        gbc.gridy = 2;
        gbc.gridwidth = 4;

        form.add(actionButtons, gbc);

        // TABLE DESIGN
        table.setRowHeight(38);
        table.setFont(new Font("SansSerif", Font.PLAIN, 13));
        table.setForeground(navy);
        table.setBackground(Color.WHITE);

        table.setSelectionBackground(new Color(255, 235, 220));
        table.setSelectionForeground(navy);

        table.setGridColor(new Color(235, 238, 243));
        table.setShowVerticalLines(false);
        table.setFillsViewportHeight(true);

        table.setSelectionMode(
                ListSelectionModel.SINGLE_SELECTION
        );

        table.getTableHeader().setFont(
                new Font("SansSerif", Font.BOLD, 12)
        );

        table.getTableHeader().setBackground(
                new Color(249, 250, 252)
        );

        table.getTableHeader().setForeground(navy);
        table.getTableHeader().setPreferredSize(new Dimension(0, 40));
        table.getTableHeader().setReorderingAllowed(false);

        JScrollPane scrollPane = new JScrollPane(table);

        scrollPane.setBorder(
                BorderFactory.createLineBorder(
                        new Color(229, 233, 239)
                )
        );

        scrollPane.getViewport().setBackground(Color.WHITE);

        JPanel tablePanel = new JPanel(new BorderLayout());

        tablePanel.setBackground(Color.WHITE);

        tablePanel.setBorder(
                BorderFactory.createCompoundBorder(
                        BorderFactory.createLineBorder(
                                new Color(229, 233, 239)
                        ),
                        new EmptyBorder(12, 12, 12, 12)
                )
        );

        JLabel tableTitle = new JLabel("Restaurant Menu Items");

        tableTitle.setFont(
                new Font("SansSerif", Font.BOLD, 16)
        );

        tableTitle.setForeground(navy);
        tableTitle.setBorder(new EmptyBorder(0, 0, 12, 0));

        tablePanel.add(tableTitle, BorderLayout.NORTH);
        tablePanel.add(scrollPane, BorderLayout.CENTER);

        content.add(form, BorderLayout.NORTH);
        content.add(tablePanel, BorderLayout.CENTER);

        root.add(content, BorderLayout.CENTER);

        setContentPane(root);

        // STAFF PERMISSIONS
        addButton.setEnabled(isAdmin);
        updateButton.setEnabled(isAdmin);
        deleteButton.setEnabled(isAdmin);

        addButton.setToolTipText(
                isAdmin ? "Add a menu item" : "Admin permission required"
        );

        updateButton.setToolTipText(
                isAdmin ? "Update selected item" : "Admin permission required"
        );

        deleteButton.setToolTipText(
                isAdmin ? "Delete selected item" : "Admin permission required"
        );

        // BUTTON ACTIONS
        addButton.addActionListener(e -> addItem());
        updateButton.addActionListener(e -> updateItem());
        deleteButton.addActionListener(e -> deleteItem());
        clearButton.addActionListener(e -> clearFields());

        // TABLE ROW SELECTION
        table.getSelectionModel().addListSelectionListener(e -> {

            if (!e.getValueIsAdjusting()
                    && table.getSelectedRow() != -1) {

                int selectedRow = table.getSelectedRow();

                nameField.setText(
                        model.getValueAt(selectedRow, 1).toString()
                );

                categoryField.setText(
                        model.getValueAt(selectedRow, 2).toString()
                );

                priceField.setText(
                        model.getValueAt(selectedRow, 3).toString()
                );

                availabilityBox.setSelectedItem(
                        model.getValueAt(selectedRow, 4).toString()
                );
            }
        });

        // LOAD DATABASE RECORDS
        loadMenu();
    }

    // LOAD MENU FROM DATABASE
    private void loadMenu() {

        model.setRowCount(0);

        String sql = "SELECT * FROM menu ORDER BY id";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement pst = con.prepareStatement(sql);
             ResultSet rs = pst.executeQuery()) {

            while (rs.next()) {

                model.addRow(new Object[]{
                        rs.getInt("id"),
                        rs.getString("item_name"),
                        rs.getString("category"),
                        rs.getDouble("price"),
                        rs.getString("availability")
                });
            }

        } catch (SQLException ex) {

            JOptionPane.showMessageDialog(
                    this,
                    "Error loading menu: " + ex.getMessage()
            );
        }
    }

    // INPUT FIELD DESIGN
    private void styleInput(JTextField field) {

        field.setFont(new Font("SansSerif", Font.PLAIN, 16));
        field.setForeground(navy);
        field.setBackground(Color.WHITE);
        field.setCaretColor(Color.BLACK);

        field.setSelectionColor(new Color(190, 215, 245));
        field.setSelectedTextColor(Color.BLACK);

        field.setOpaque(true);

        field.setBorder(
                BorderFactory.createCompoundBorder(
                        BorderFactory.createLineBorder(
                                new Color(190, 200, 215), 1
                        ),
                        new EmptyBorder(8, 10, 8, 10)
                )
        );
    }

    // FORM FIELD METHOD
    private void addFormField(
            JPanel panel,
            GridBagConstraints gbc,
            String label,
            JComponent field,
            int x,
            int y) {

        gbc.gridwidth = 1;
        gbc.gridx = x;
        gbc.gridy = y;

        JLabel heading = new JLabel(label);

        heading.setFont(
                new Font("SansSerif", Font.BOLD, 12)
        );

        heading.setForeground(navy);

        panel.add(heading, gbc);

        gbc.gridy = y + 1;

        panel.add(field, gbc);
    }

    // BUTTON DESIGN
    private JButton createButton(String text, Color color) {

        JButton button = new JButton(text);

        button.setFont(
                new Font("SansSerif", Font.BOLD, 12)
        );

        button.setForeground(Color.WHITE);
        button.setBackground(color);
        button.setFocusPainted(false);
        button.setBorderPainted(false);

        button.setCursor(
                new Cursor(Cursor.HAND_CURSOR)
        );

        button.setPreferredSize(
                new Dimension(110, 34)
        );

        return button;
    }

    // CHECK ADMIN
    private boolean isAdmin() {
        return "Administrator".equalsIgnoreCase(role);
    }

    // CHECK ADMIN PERMISSION
    private boolean checkAdminPermission() {

        if (!isAdmin()) {

            JOptionPane.showMessageDialog(
                    this,
                    "You do not have permission to modify menu items.",
                    "Access Denied",
                    JOptionPane.WARNING_MESSAGE
            );

            return false;
        }

        return true;
    }

    // ADD ITEM
    private void addItem() {

        if (!checkAdminPermission()) {
            return;
        }

        String name = nameField.getText().trim();
        String category = categoryField.getText().trim();
        String priceText = priceField.getText().trim();

        String availability =
                availabilityBox.getSelectedItem().toString();

        if (name.isEmpty() || category.isEmpty() || priceText.isEmpty()) {

            JOptionPane.showMessageDialog(
                    this,
                    "Please fill in item name, category and price.",
                    "Missing Information",
                    JOptionPane.WARNING_MESSAGE
            );

            return;
        }

        double price;

        try {

            price = Double.parseDouble(priceText);

            if (!Double.isFinite(price) || price < 0) {
                throw new NumberFormatException();
            }

        } catch (NumberFormatException ex) {

            JOptionPane.showMessageDialog(
                    this,
                    "Please enter a valid non-negative price.",
                    "Invalid Price",
                    JOptionPane.ERROR_MESSAGE
            );

            return;
        }

        String sql = "INSERT INTO menu " +
                "(item_name, category, price, availability) " +
                "VALUES (?, ?, ?, ?)";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement pst = con.prepareStatement(sql)) {

            pst.setString(1, name);
            pst.setString(2, category);
            pst.setDouble(3, price);
            pst.setString(4, availability);

            pst.executeUpdate();

            loadMenu();
            clearFields();

            JOptionPane.showMessageDialog(
                    this,
                    "Menu item added successfully."
            );

        } catch (SQLException ex) {

            JOptionPane.showMessageDialog(
                    this,
                    "Error adding menu item: " + ex.getMessage()
            );
        }
    }

    // UPDATE ITEM
    private void updateItem() {

        if (!checkAdminPermission()) {
            return;
        }

        int selectedRow = table.getSelectedRow();

        if (selectedRow == -1) {

            JOptionPane.showMessageDialog(
                    this,
                    "Please select a menu item to update."
            );

            return;
        }

        String name = nameField.getText().trim();
        String category = categoryField.getText().trim();
        String priceText = priceField.getText().trim();

        if (name.isEmpty() || category.isEmpty() || priceText.isEmpty()) {

            JOptionPane.showMessageDialog(
                    this,
                    "Please fill in all item fields."
            );

            return;
        }

        double price;

        try {

            price = Double.parseDouble(priceText);

            if (!Double.isFinite(price) || price < 0) {
                throw new NumberFormatException();
            }

        } catch (NumberFormatException ex) {

            JOptionPane.showMessageDialog(
                    this,
                    "Please enter a valid non-negative price."
            );

            return;
        }

        int id = Integer.parseInt(
                model.getValueAt(selectedRow, 0).toString()
        );

        String sql = "UPDATE menu SET item_name=?, category=?, " +
                "price=?, availability=? WHERE id=?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement pst = con.prepareStatement(sql)) {

            pst.setString(1, name);
            pst.setString(2, category);
            pst.setDouble(3, price);
            pst.setString(4, availabilityBox.getSelectedItem().toString());
            pst.setInt(5, id);

            pst.executeUpdate();

            loadMenu();
            clearFields();

            JOptionPane.showMessageDialog(
                    this,
                    "Menu item updated successfully."
            );

        } catch (SQLException ex) {

            JOptionPane.showMessageDialog(
                    this,
                    "Error updating menu item: " + ex.getMessage()
            );
        }
    }

    // DELETE ITEM
    private void deleteItem() {

        if (!checkAdminPermission()) {
            return;
        }

        int selectedRow = table.getSelectedRow();

        if (selectedRow == -1) {

            JOptionPane.showMessageDialog(
                    this,
                    "Please select a menu item to delete."
            );

            return;
        }

        int answer = JOptionPane.showConfirmDialog(
                this,
                "Are you sure you want to delete this menu item?",
                "Confirm Delete",
                JOptionPane.YES_NO_OPTION
        );

        if (answer != JOptionPane.YES_OPTION) {
            return;
        }

        int id = Integer.parseInt(
                model.getValueAt(selectedRow, 0).toString()
        );

        String sql = "DELETE FROM menu WHERE id=?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement pst = con.prepareStatement(sql)) {

            pst.setInt(1, id);
            pst.executeUpdate();

            loadMenu();
            clearFields();

            JOptionPane.showMessageDialog(
                    this,
                    "Menu item deleted successfully."
            );

        } catch (SQLException ex) {

            JOptionPane.showMessageDialog(
                    this,
                    "Error deleting menu item: " + ex.getMessage()
            );
        }
    }

    // CLEAR FIELDS
    private void clearFields() {

        nameField.setText("");
        categoryField.setText("");
        priceField.setText("");

        availabilityBox.setSelectedIndex(0);

        table.clearSelection();

        nameField.requestFocusInWindow();
    }

    // MAIN METHOD
    public static void main(String[] args) {

        SwingUtilities.invokeLater(() ->
                new MenuManagement("Administrator").setVisible(true)
        );
    }
}
