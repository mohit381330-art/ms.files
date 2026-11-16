
import main.java.DBConnection;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.sql.*;
import java.util.regex.Pattern;

public class MenuManagement extends JFrame {

    private final String role;
    private final boolean isAdmin;

    private final DefaultTableModel model;
    private final JTable table;

    private final JTextField nameField = new JTextField(15);
    private final JTextField categoryField = new JTextField(12);
    private final JTextField priceField = new JTextField(8);
    private final JTextField searchField = new JTextField(18);

    private final JComboBox<String> availabilityBox =
            new JComboBox<>(new String[]{"Available", "Unavailable"});

    private final JButton addButton = new JButton("Add Item");
    private final JButton updateButton = new JButton("Update");
    private final JButton deleteButton = new JButton("Delete");

    private final Color navy = new Color(24, 35, 52);
    private final Color accent = new Color(232, 112, 55);
    private final Color background = new Color(245, 247, 250);

    public MenuManagement() {
        this("Administrator");
    }

    public MenuManagement(String role) {
        this.role = role == null ? "Staff" : role;
        this.isAdmin = "Administrator".equalsIgnoreCase(this.role);

        setTitle("Savora | Menu Management");
        setSize(1050, 680);
        setMinimumSize(new Dimension(850, 550));
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);

        model = new DefaultTableModel(
                new String[]{"ID", "Item Name", "Category", "Price", "Availability"}, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };

        table = new JTable(model);
        table.setRowHeight(38);
        table.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);

        buildUI();
        loadMenu();
        applyRolePermissions();
    }

    private void buildUI() {
        JPanel main = new JPanel(new BorderLayout(15, 15));
        main.setBackground(background);
        main.setBorder(new EmptyBorder(20, 20, 20, 20));
        setContentPane(main);

        JLabel heading = new JLabel("Menu Management");
        heading.setFont(new Font("SansSerif", Font.BOLD, 26));
        heading.setForeground(navy);

        JLabel subtitle = new JLabel(
                isAdmin ? "Add, update and manage restaurant menu items."
                        : "View and search restaurant menu items.");

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

        addField(form, c, 0, "Item Name", nameField);
        addField(form, c, 1, "Category", categoryField);
        addField(form, c, 2, "Price", priceField);
        addField(form, c, 3, "Availability", availabilityBox);

        JPanel buttons = new JPanel(new FlowLayout(FlowLayout.LEFT));
        buttons.setOpaque(false);
        addButton.setBackground(accent);
        addButton.setForeground(Color.WHITE);
        buttons.add(addButton);
        buttons.add(updateButton);
        buttons.add(deleteButton);

        JButton clearButton = new JButton("Clear Fields");
        buttons.add(clearButton);

        JPanel formPanel = new JPanel(new BorderLayout());
        formPanel.setOpaque(false);
        formPanel.add(form, BorderLayout.CENTER);
        formPanel.add(buttons, BorderLayout.SOUTH);

        JPanel searchPanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
        searchPanel.setOpaque(false);
        JButton searchButton = new JButton("Search");
        JButton showAllButton = new JButton("Show All");

        searchPanel.add(new JLabel("Search:"));
        searchPanel.add(searchField);
        searchPanel.add(searchButton);
        searchPanel.add(showAllButton);

        JPanel center = new JPanel(new BorderLayout(10, 10));
        center.setOpaque(false);
        center.add(formPanel, BorderLayout.NORTH);
        center.add(searchPanel, BorderLayout.CENTER);
        center.add(new JScrollPane(table), BorderLayout.SOUTH);

        main.add(center, BorderLayout.CENTER);

        // Table selection
        table.getSelectionModel().addListSelectionListener(e -> {
            if (!e.getValueIsAdjusting() && table.getSelectedRow() != -1) {
                int row = table.convertRowIndexToModel(table.getSelectedRow());

                nameField.setText(model.getValueAt(row, 1).toString());
                categoryField.setText(model.getValueAt(row, 2).toString());
                priceField.setText(model.getValueAt(row, 3).toString());
                availabilityBox.setSelectedItem(model.getValueAt(row, 4).toString());
            }
        });

        addButton.addActionListener(e -> addItem());
        updateButton.addActionListener(e -> updateItem());
        deleteButton.addActionListener(e -> deleteItem());
        clearButton.addActionListener(e -> clearFields());

        searchButton.addActionListener(e -> searchItems());
        searchField.addActionListener(e -> searchItems());

        showAllButton.addActionListener(e -> {
            searchField.setText("");
            loadMenu();
        });
    }

    private void addField(JPanel panel, GridBagConstraints c,
                          int row, String label, JComponent field) {
        c.gridx = 0;
        c.gridy = row;
        panel.add(new JLabel(label), c);

        c.gridx = 1;
        panel.add(field, c);
    }

    private void applyRolePermissions() {
        addButton.setEnabled(isAdmin);
        updateButton.setEnabled(isAdmin);
        deleteButton.setEnabled(isAdmin);

        if (!isAdmin) {
            addButton.setToolTipText("Admin permission required");
            updateButton.setToolTipText("Admin permission required");
            deleteButton.setToolTipText("Admin permission required");
        }
    }

    private void loadMenu() {
        model.setRowCount(0);

        String sql = "SELECT * FROM menu ORDER BY id";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                model.addRow(new Object[]{
                        rs.getInt("id"),
                        rs.getString("item_name"),
                        rs.getString("category"),
                        rs.getBigDecimal("price"),
                        rs.getString("availability")
                });
            }

        } catch (SQLException ex) {
            showError("Unable to load menu: " + ex.getMessage());
        }
    }

    private void addItem() {
        if (!isAdmin) return;

        String name = nameField.getText().trim();
        String category = categoryField.getText().trim();
        String availability = availabilityBox.getSelectedItem().toString();

        if (name.isEmpty() || category.isEmpty() || priceField.getText().trim().isEmpty()) {
            showError("Please fill all required fields.");
            return;
        }

        double price;
        try {
            price = Double.parseDouble(priceField.getText().trim());

            if (!Double.isFinite(price) || price < 0) {
                showError("Enter a valid price.");
                return;
            }
        } catch (NumberFormatException ex) {
            showError("Price must be a number.");
            return;
        }

        String sql = "INSERT INTO menu(item_name,category,price,availability) VALUES(?,?,?,?)";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, name);
            ps.setString(2, category);
            ps.setDouble(3, price);
            ps.setString(4, availability);
            ps.executeUpdate();

            JOptionPane.showMessageDialog(this, "Menu item added successfully.");
            loadMenu();
            clearFields();

        } catch (SQLException ex) {
            showError("Add failed: " + ex.getMessage());
        }
    }

    private void updateItem() {
        if (!isAdmin) return;

        int selected = table.getSelectedRow();
        if (selected == -1) {
            showError("Please select an item.");
            return;
        }

        int row = table.convertRowIndexToModel(selected);
        int id = Integer.parseInt(model.getValueAt(row, 0).toString());

        String name = nameField.getText().trim();
        String category = categoryField.getText().trim();

        if (name.isEmpty() || category.isEmpty() || priceField.getText().trim().isEmpty()) {
            showError("Please fill all required fields.");
            return;
        }

        double price;
        try {
            price = Double.parseDouble(priceField.getText().trim());

            if (!Double.isFinite(price) || price < 0) {
                showError("Enter a valid price.");
                return;
            }
        } catch (NumberFormatException ex) {
            showError("Price must be a number.");
            return;
        }

        String sql = "UPDATE menu SET item_name=?,category=?,price=?,availability=? WHERE id=?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, name);
            ps.setString(2, category);
            ps.setDouble(3, price);
            ps.setString(4, availabilityBox.getSelectedItem().toString());
            ps.setInt(5, id);

            ps.executeUpdate();
            JOptionPane.showMessageDialog(this, "Menu item updated successfully.");
            loadMenu();
            clearFields();

        } catch (SQLException ex) {
            showError("Update failed: " + ex.getMessage());
        }
    }

    private void deleteItem() {
        if (!isAdmin) return;

        int selected = table.getSelectedRow();
        if (selected == -1) {
            showError("Please select an item.");
            return;
        }

        int row = table.convertRowIndexToModel(selected);
        int id = Integer.parseInt(model.getValueAt(row, 0).toString());

        int confirm = JOptionPane.showConfirmDialog(
                this, "Delete selected menu item?", "Confirm",
                JOptionPane.YES_NO_OPTION);

        if (confirm != JOptionPane.YES_OPTION) return;

        String sql = "DELETE FROM menu WHERE id=?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, id);
            ps.executeUpdate();

            JOptionPane.showMessageDialog(this, "Menu item deleted successfully.");
            loadMenu();
            clearFields();

        } catch (SQLException ex) {
            showError("Delete failed: " + ex.getMessage());
        }
    }

    private void searchItems() {
        String query = searchField.getText().trim();

        if (query.isEmpty()) {
            loadMenu();
            return;
        }

        javax.swing.table.TableRowSorter<DefaultTableModel> sorter =
                new javax.swing.table.TableRowSorter<>(model);

        table.setRowSorter(sorter);
        sorter.setRowFilter(
                javax.swing.RowFilter.regexFilter("(?i)" + Pattern.quote(query)));
    }

    private void clearFields() {
        nameField.setText("");
        categoryField.setText("");
        priceField.setText("");
        availabilityBox.setSelectedIndex(0);
        table.clearSelection();
    }

    private void showError(String message) {
        JOptionPane.showMessageDialog(this, message,
                "Error", JOptionPane.ERROR_MESSAGE);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() ->
                new MenuManagement("Administrator").setVisible(true));
    }
}
