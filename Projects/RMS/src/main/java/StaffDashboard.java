
import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.table.DefaultTableModel;
import java.awt.*;

public class StaffDashboard extends JFrame {

    private final String username;

    private final Color navy = new Color(24, 35, 52);
    private final Color accent = new Color(232, 112, 55);
    private final Color background = new Color(245, 247, 250);
    private final Color muted = new Color(115, 125, 140);
    private final Color borderColor = new Color(229, 233, 239);

    private DefaultTableModel taskModel;
    private JTable taskTable;

    public StaffDashboard(String username) {
        this.username = username;

        setTitle("Savora | Staff Workspace");
        setSize(1200, 760);
        setMinimumSize(new Dimension(950, 620));
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        JPanel root = new JPanel(new BorderLayout());
        root.setBackground(background);

        root.add(createSidebar(), BorderLayout.WEST);
        root.add(createMainContent(), BorderLayout.CENTER);

        setContentPane(root);
    }

    private JPanel createSidebar() {
        JPanel sidebar = new JPanel();
        sidebar.setLayout(new BoxLayout(sidebar, BoxLayout.Y_AXIS));
        sidebar.setBackground(navy);
        sidebar.setPreferredSize(new Dimension(225, 0));
        sidebar.setBorder(new EmptyBorder(28, 15, 20, 15));

        JLabel brand = new JLabel("  SAVORA");
        brand.setFont(new Font("SansSerif", Font.BOLD, 25));
        brand.setForeground(Color.WHITE);

        JLabel subtitle = new JLabel("  STAFF WORKSPACE");
        subtitle.setFont(new Font("SansSerif", Font.PLAIN, 10));
        subtitle.setForeground(new Color(180, 193, 210));

        sidebar.add(brand);
        sidebar.add(Box.createVerticalStrut(6));
        sidebar.add(subtitle);
        sidebar.add(Box.createVerticalStrut(35));

        addNavButton(sidebar, "My Dashboard", "dashboard");
        addNavButton(sidebar, "Order Processing", "orders");
        addNavButton(sidebar, "Kitchen Status", "kitchen");
        addNavButton(sidebar, "Menu Availability", "menu");
        addNavButton(sidebar, "Billing & Payments", "billing");

        sidebar.add(Box.createVerticalGlue());

        JLabel userLabel = new JLabel(
                "<html><div style='width:170px;color:white;'>"
                        + escapeHtml(username)
                        + "<br><span style='color:#B4C1D2;font-size:10px;'>"
                        + "Staff Account"
                        + "</span></div></html>"
        );
        userLabel.setFont(new Font("SansSerif", Font.BOLD, 13));
        userLabel.setBorder(new EmptyBorder(12, 8, 15, 5));
        sidebar.add(userLabel);

        addNavButton(sidebar, "Logout", "logout");

        return sidebar;
    }

    private String escapeHtml(String value) {
        if (value == null) {
            return "";
        }

        return value.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;");
    }

    private void addNavButton(
            JPanel sidebar, String text, String action) {

        JButton button = new JButton(text);

        button.setFont(new Font("SansSerif", Font.PLAIN, 13));
        button.setForeground(new Color(225, 232, 241));
        button.setBackground(navy);
        button.setHorizontalAlignment(SwingConstants.LEFT);
        button.setMaximumSize(new Dimension(Integer.MAX_VALUE, 45));
        button.setPreferredSize(new Dimension(195, 45));
        button.setBorder(new EmptyBorder(0, 12, 0, 5));
        button.setFocusPainted(false);
        button.setBorderPainted(false);
        button.setCursor(new Cursor(Cursor.HAND_CURSOR));

        button.addActionListener(e -> navigate(action));

        button.addMouseListener(new java.awt.event.MouseAdapter() {
            @Override
            public void mouseEntered(java.awt.event.MouseEvent e) {
                button.setBackground(new Color(43, 57, 78));
            }

            @Override
            public void mouseExited(java.awt.event.MouseEvent e) {
                button.setBackground(navy);
            }
        });

        sidebar.add(button);
        sidebar.add(Box.createVerticalStrut(5));
    }

    private JPanel createMainContent() {
        JPanel content = new JPanel(new BorderLayout(0, 22));
        content.setBackground(background);
        content.setBorder(new EmptyBorder(25, 28, 25, 28));

        content.add(createHeader(), BorderLayout.NORTH);
        content.add(createWorkArea(), BorderLayout.CENTER);

        return content;
    }

    private JPanel createHeader() {
        JPanel header = new JPanel(new BorderLayout());
        header.setOpaque(false);

        JPanel titles = new JPanel();
        titles.setOpaque(false);
        titles.setLayout(new BoxLayout(titles, BoxLayout.Y_AXIS));

        JLabel heading = new JLabel("Staff Dashboard");
        heading.setFont(new Font("SansSerif", Font.BOLD, 26));
        heading.setForeground(navy);

        JLabel subtitle = new JLabel(
                "Manage daily restaurant operations efficiently."
        );
        subtitle.setFont(new Font("SansSerif", Font.PLAIN, 13));
        subtitle.setForeground(muted);

        titles.add(heading);
        titles.add(Box.createVerticalStrut(7));
        titles.add(subtitle);

        JButton newOrderButton = new JButton("+  Open Orders");
        newOrderButton.setFont(new Font("SansSerif", Font.BOLD, 13));
        newOrderButton.setForeground(Color.WHITE);
        newOrderButton.setBackground(accent);
        newOrderButton.setFocusPainted(false);
        newOrderButton.setBorderPainted(false);
        newOrderButton.setCursor(new Cursor(Cursor.HAND_CURSOR));
        newOrderButton.setPreferredSize(new Dimension(145, 42));
        newOrderButton.addActionListener(e -> navigate("orders"));

        header.add(titles, BorderLayout.CENTER);
        header.add(newOrderButton, BorderLayout.EAST);

        return header;
    }

    private JPanel createWorkArea() {
        JPanel area = new JPanel(new BorderLayout(0, 22));
        area.setOpaque(false);

        JPanel cards = new JPanel(new GridLayout(1, 4, 12, 12));
        cards.setOpaque(false);

        cards.add(createStatCard(
                "Pending Orders", "--", "Awaiting processing"
        ));
        cards.add(createStatCard(
                "Preparing", "--", "In the kitchen"
        ));
        cards.add(createStatCard(
                "Ready Orders", "--", "Awaiting completion"
        ));
        cards.add(createStatCard(
                "Pending Bills", "--", "Awaiting payment"
        ));

        JPanel middle = new JPanel(new BorderLayout(0, 12));
        middle.setOpaque(false);

        JLabel taskHeading = new JLabel("Daily Work");
        taskHeading.setFont(new Font("SansSerif", Font.BOLD, 20));
        taskHeading.setForeground(navy);

        JPanel tasks = new JPanel(new GridLayout(2, 2, 12, 12));
        tasks.setOpaque(false);

        tasks.add(createTaskCard(
                "Order Processing",
                "Open orders and manage order records.",
                "orders"
        ));

        tasks.add(createTaskCard(
                "Kitchen Status",
                "Review orders and update their progress.",
                "kitchen"
        ));

        tasks.add(createTaskCard(
                "Menu Availability",
                "Manage whether menu items are available.",
                "menu"
        ));

        tasks.add(createTaskCard(
                "Billing & Payments",
                "Open billing to prepare and manage bills.",
                "billing"
        ));

        middle.add(taskHeading, BorderLayout.NORTH);
        middle.add(tasks, BorderLayout.CENTER);

        JPanel recentPanel = createRecentTasksPanel();

        area.add(cards, BorderLayout.NORTH);
        area.add(middle, BorderLayout.CENTER);
        area.add(recentPanel, BorderLayout.SOUTH);

        return area;
    }

    private JPanel createStatCard(
            String headingText, String valueText, String descriptionText) {

        JPanel card = new JPanel();
        card.setLayout(new BoxLayout(card, BoxLayout.Y_AXIS));
        card.setBackground(Color.WHITE);
        card.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(borderColor),
                new EmptyBorder(14, 14, 14, 12)
        ));

        JLabel heading = new JLabel(headingText);
        heading.setFont(new Font("SansSerif", Font.PLAIN, 12));
        heading.setForeground(muted);

        JLabel value = new JLabel(valueText);
        value.setFont(new Font("SansSerif", Font.BOLD, 27));
        value.setForeground(navy);

        JLabel description = new JLabel(descriptionText);
        description.setFont(new Font("SansSerif", Font.PLAIN, 10));
        description.setForeground(muted);

        card.add(heading);
        card.add(Box.createVerticalStrut(10));
        card.add(value);
        card.add(Box.createVerticalStrut(7));
        card.add(description);

        return card;
    }

    private JPanel createTaskCard(
            String title, String description, String action) {

        JPanel card = new JPanel(new BorderLayout(0, 10));
        card.setBackground(Color.WHITE);
        card.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(borderColor),
                new EmptyBorder(15, 15, 15, 15)
        ));

        JLabel titleLabel = new JLabel(title);
        titleLabel.setFont(new Font("SansSerif", Font.BOLD, 15));
        titleLabel.setForeground(navy);

        JLabel descriptionLabel = new JLabel(
                "<html><div style='width:230px;'>"
                        + escapeHtml(description)
                        + "</div></html>"
        );
        descriptionLabel.setFont(new Font("SansSerif", Font.PLAIN, 12));
        descriptionLabel.setForeground(muted);

        JButton openButton = new JButton("Open");
        openButton.setFont(new Font("SansSerif", Font.BOLD, 12));
        openButton.setForeground(Color.WHITE);
        openButton.setBackground(accent);
        openButton.setFocusPainted(false);
        openButton.setBorderPainted(false);
        openButton.setCursor(new Cursor(Cursor.HAND_CURSOR));
        openButton.addActionListener(e -> navigate(action));

        JPanel buttonPanel = new JPanel(new FlowLayout(FlowLayout.LEFT, 0, 0));
        buttonPanel.setOpaque(false);
        buttonPanel.add(openButton);

        card.add(titleLabel, BorderLayout.NORTH);
        card.add(descriptionLabel, BorderLayout.CENTER);
        card.add(buttonPanel, BorderLayout.SOUTH);

        return card;
    }

    private JPanel createRecentTasksPanel() {
        JPanel panel = new JPanel(new BorderLayout(0, 10));
        panel.setBackground(Color.WHITE);
        panel.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(borderColor),
                new EmptyBorder(12, 14, 12, 14)
        ));

        JLabel heading = new JLabel("My Work Updates");
        heading.setFont(new Font("SansSerif", Font.BOLD, 16));
        heading.setForeground(navy);

        String[] columns = {
                "Task", "Details", "Status"
        };

        taskModel = new DefaultTableModel(columns, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };

        taskTable = new JTable(taskModel);
        taskTable.setRowHeight(30);
        taskTable.setFont(new Font("SansSerif", Font.PLAIN, 12));
        taskTable.setForeground(navy);
        taskTable.setShowVerticalLines(false);
        taskTable.setGridColor(borderColor);
        taskTable.setFillsViewportHeight(true);

        taskTable.getTableHeader().setFont(
                new Font("SansSerif", Font.BOLD, 12)
        );
        taskTable.getTableHeader().setBackground(
                new Color(249, 250, 252)
        );
        taskTable.getTableHeader().setPreferredSize(
                new Dimension(0, 32)
        );

        JScrollPane scrollPane = new JScrollPane(taskTable);
        scrollPane.setPreferredSize(new Dimension(500, 105));
        scrollPane.setBorder(BorderFactory.createEmptyBorder());

        JButton addUpdateButton = new JButton("Add Work Update");
        addUpdateButton.setFont(new Font("SansSerif", Font.BOLD, 12));
        addUpdateButton.setForeground(navy);
        addUpdateButton.setBackground(new Color(235, 239, 245));
        addUpdateButton.setFocusPainted(false);
        addUpdateButton.setBorderPainted(false);
        addUpdateButton.addActionListener(e -> addWorkUpdate());

        JPanel bottom = new JPanel(new FlowLayout(FlowLayout.RIGHT, 0, 0));
        bottom.setOpaque(false);
        bottom.add(addUpdateButton);

        panel.add(heading, BorderLayout.NORTH);
        panel.add(scrollPane, BorderLayout.CENTER);
        panel.add(bottom, BorderLayout.SOUTH);

        return panel;
    }

    private void addWorkUpdate() {
        JTextField taskField = new JTextField();
        JTextField detailsField = new JTextField();

        String[] statuses = {
                "Pending", "In Progress", "Completed"
        };

        JComboBox<String> statusBox = new JComboBox<>(statuses);

        JPanel form = new JPanel(new GridLayout(0, 1, 5, 5));
        form.add(new JLabel("Task"));
        form.add(taskField);
        form.add(new JLabel("Details"));
        form.add(detailsField);
        form.add(new JLabel("Status"));
        form.add(statusBox);

        int result = JOptionPane.showConfirmDialog(
                this,
                form,
                "Add Work Update",
                JOptionPane.OK_CANCEL_OPTION,
                JOptionPane.PLAIN_MESSAGE
        );

        if (result != JOptionPane.OK_OPTION) {
            return;
        }

        String task = taskField.getText().trim();
        String details = detailsField.getText().trim();
        String status = (String) statusBox.getSelectedItem();

        if (task.isEmpty()) {
            JOptionPane.showMessageDialog(
                    this,
                    "Please enter a task name.",
                    "Validation",
                    JOptionPane.WARNING_MESSAGE
            );
            return;
        }

        taskModel.addRow(new Object[]{
                task,
                details,
                status
        });
    }

    private void navigate(String action) {
        switch (action) {
            case "dashboard":
                break;

            case "orders":
                new OrderManagement().setVisible(true);
                break;

            case "kitchen":
                openKitchenStatus();
                break;

            case "menu":
                new MenuManagement().setVisible(true);
                break;

            case "billing":
                new Billing().setVisible(true);
                break;

            case "logout":
                int answer = JOptionPane.showConfirmDialog(
                        this,
                        "Are you sure you want to logout?",
                        "Confirm Logout",
                        JOptionPane.YES_NO_OPTION
                );

                if (answer == JOptionPane.YES_OPTION) {
                    new LoginPage().setVisible(true);
                    dispose();
                }
                break;

            default:
                JOptionPane.showMessageDialog(
                        this,
                        "Unknown operation.",
                        "Navigation",
                        JOptionPane.WARNING_MESSAGE
                );
        }
    }

    private void openKitchenStatus() {
        String[] statuses = {
                "Pending",
                "Preparing",
                "Ready",
                "Completed"
        };

        JComboBox<String> statusBox = new JComboBox<>(statuses);

        JPanel panel = new JPanel(new GridLayout(0, 1, 5, 5));
        panel.add(new JLabel(
                "Select a kitchen status for reference:"
        ));
        panel.add(statusBox);

        JOptionPane.showMessageDialog(
                this,
                panel,
                "Kitchen Status",
                JOptionPane.INFORMATION_MESSAGE
        );

        // This is a status selection demonstration only.
        // Updating a real order requires connecting this action
        // to the selected order in OrderManagement or the database.
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            StaffDashboard dashboard =
                    new StaffDashboard("staff");

            dashboard.setVisible(true);
        });
    }
}
