
import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.table.DefaultTableModel;
import java.awt.*;

public class Dashboard extends JFrame {

    private final String username;
    private final String role;

    private final Color navy = new Color(24, 35, 52);
    private final Color accent = new Color(232, 112, 55);
    private final Color background = new Color(245, 247, 250);
    private final Color muted = new Color(115, 125, 140);

    private boolean isAdmin() {
        return "Administrator".equalsIgnoreCase(role);
    }

    public Dashboard(String username, String role) {

        this.username = username;
        this.role = role;

        setTitle("SERVECARE | " + role + " Dashboard");
        setSize(1200, 760);
        setMinimumSize(new Dimension(950, 620));
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        JPanel root = new JPanel(new BorderLayout());
        root.setBackground(background);

        root.add(createSidebar(), BorderLayout.WEST);

        JPanel content = new JPanel(new BorderLayout(0, 25));
        content.setBackground(background);
        content.setBorder(new EmptyBorder(25, 30, 25, 30));

        content.add(createHeader(), BorderLayout.NORTH);
        content.add(createOverview(), BorderLayout.CENTER);

        root.add(content, BorderLayout.CENTER);

        setContentPane(root);
    }

    // SIDEBAR
    private JPanel createSidebar() {

        JPanel sidebar = new JPanel();

        sidebar.setLayout(
                new BoxLayout(sidebar, BoxLayout.Y_AXIS)
        );

        sidebar.setBackground(navy);
        sidebar.setPreferredSize(new Dimension(225, 0));

        sidebar.setBorder(
                new EmptyBorder(28, 15, 20, 15)
        );

        // BRAND
        JLabel brand = new JLabel("SERVECARE");

        brand.setFont(
                new Font("SansSerif", Font.BOLD, 23)
        );

        brand.setForeground(Color.WHITE);
        brand.setAlignmentX(Component.LEFT_ALIGNMENT);

        JLabel subtitle = new JLabel(
                isAdmin()
                        ? "RESTAURANT ADMIN"
                        : "RESTAURANT STAFF"
        );

        subtitle.setFont(
                new Font("SansSerif", Font.PLAIN, 10)
        );

        subtitle.setForeground(new Color(180, 193, 210));
        subtitle.setAlignmentX(Component.LEFT_ALIGNMENT);

        sidebar.add(brand);
        sidebar.add(Box.createVerticalStrut(8));
        sidebar.add(subtitle);
        sidebar.add(Box.createVerticalStrut(35));

        // COMMON NAVIGATION
        addNavButton(sidebar, "Dashboard", "dashboard");

        addNavButton(sidebar, "Menu Management", "menu");
        addNavButton(sidebar, "Customers", "customers");
        addNavButton(sidebar, "Orders", "orders");
        addNavButton(sidebar, "Billing", "billing");

        // ADMIN ONLY NAVIGATION
        if (isAdmin()) {

            addNavButton(sidebar, "Reports", "reports");
            addNavButton(sidebar, "Staff Management", "staff");
        }

        sidebar.add(Box.createVerticalGlue());

        // USER INFORMATION
        JLabel userLabel = new JLabel(
                "<html><div style='width:170px;color:white;'>"
                        + escapeHtml(username)
                        + "<br><span style='color:#B4C1D2;font-size:11px;'>"
                        + escapeHtml(role)
                        + "</span></div></html>"
        );

        userLabel.setFont(
                new Font("SansSerif", Font.BOLD, 13)
        );

        userLabel.setBorder(
                new EmptyBorder(12, 8, 15, 5)
        );

        userLabel.setAlignmentX(Component.LEFT_ALIGNMENT);

        sidebar.add(userLabel);

        addNavButton(sidebar, "Logout", "logout");

        return sidebar;
    }

    // HTML ESCAPE
    private String escapeHtml(String text) {

        if (text == null) {
            return "";
        }

        return text.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;");
    }

    // SIDEBAR BUTTON
    private void addNavButton(
            JPanel sidebar,
            String text,
            String page) {

        JButton button = new JButton(text);

        button.setFont(
                new Font("SansSerif", Font.PLAIN, 13)
        );

        button.setForeground(new Color(225, 232, 241));
        button.setBackground(navy);

        button.setHorizontalAlignment(SwingConstants.LEFT);

        button.setMaximumSize(
                new Dimension(Integer.MAX_VALUE, 45)
        );

        button.setPreferredSize(
                new Dimension(195, 45)
        );

        button.setMinimumSize(
                new Dimension(195, 45)
        );

        button.setBorder(
                new EmptyBorder(0, 12, 0, 5)
        );

        button.setFocusPainted(false);
        button.setBorderPainted(false);

        button.setCursor(
                new Cursor(Cursor.HAND_CURSOR)
        );

        button.addActionListener(e -> navigate(page));

        button.addMouseListener(
                new java.awt.event.MouseAdapter() {

                    @Override
                    public void mouseEntered(
                            java.awt.event.MouseEvent e) {

                        button.setBackground(
                                new Color(43, 57, 78)
                        );
                    }

                    @Override
                    public void mouseExited(
                            java.awt.event.MouseEvent e) {

                        button.setBackground(navy);
                    }
                }
        );

        button.setAlignmentX(Component.LEFT_ALIGNMENT);

        sidebar.add(button);
        sidebar.add(Box.createVerticalStrut(5));
    }

    // HEADER
    private JPanel createHeader() {

        JPanel header = new JPanel(new BorderLayout(20, 0));
        header.setOpaque(false);

        JPanel titles = new JPanel();

        titles.setLayout(
                new BoxLayout(titles, BoxLayout.Y_AXIS)
        );

        titles.setOpaque(false);

        JLabel title = new JLabel(
                isAdmin()
                        ? "Admin Dashboard"
                        : "Staff Dashboard"
        );

        title.setFont(
                new Font("SansSerif", Font.BOLD, 26)
        );

        title.setForeground(navy);
        title.setAlignmentX(Component.LEFT_ALIGNMENT);

        JLabel subtitle = new JLabel(
                isAdmin()
                        ? "Manage your restaurant operations from one place."
                        : "Manage menu items, customers, orders and billing."
        );

        subtitle.setFont(
                new Font("SansSerif", Font.PLAIN, 13)
        );

        subtitle.setForeground(muted);
        subtitle.setAlignmentX(Component.LEFT_ALIGNMENT);

        titles.add(title);
        titles.add(Box.createVerticalStrut(9));
        titles.add(subtitle);

        // NEW ORDER BUTTON
        JButton addOrder = new JButton("+  New Order");

        addOrder.setFont(
                new Font("SansSerif", Font.BOLD, 13)
        );

        addOrder.setForeground(Color.WHITE);
        addOrder.setBackground(accent);

        addOrder.setFocusPainted(false);
        addOrder.setBorderPainted(false);

        addOrder.setCursor(
                new Cursor(Cursor.HAND_CURSOR)
        );

        addOrder.setPreferredSize(
                new Dimension(135, 42)
        );

        addOrder.setMinimumSize(
                new Dimension(135, 42)
        );

        addOrder.addActionListener(
                e -> navigate("orders")
        );

        header.add(titles, BorderLayout.CENTER);
        header.add(addOrder, BorderLayout.EAST);

        return header;
    }

    // DASHBOARD OVERVIEW
    private JPanel createOverview() {

        JPanel overview = new JPanel(
                new BorderLayout(0, 25)
        );

        overview.setOpaque(false);

        // STATISTIC CARDS
        JPanel cards = new JPanel(
                new GridLayout(1, 4, 18, 0)
        );

        cards.setOpaque(false);

        cards.add(createStatCard("Total Customers"));
        cards.add(createStatCard("Total Orders"));
        cards.add(createStatCard("Menu Items"));
        cards.add(createStatCard("Revenue"));

        // RECENT ORDERS TITLE
        JLabel recentTitle = new JLabel("Recent Orders");

        recentTitle.setFont(
                new Font("SansSerif", Font.BOLD, 20)
        );

        recentTitle.setForeground(navy);

        // TABLE
        String[] columns = {
                "Order ID",
                "Customer",
                "Items",
                "Amount",
                "Status"
        };

        DefaultTableModel model =
                new DefaultTableModel(columns, 0) {

                    @Override
                    public boolean isCellEditable(
                            int row,
                            int column) {

                        return false;
                    }
                };

        JTable table = new JTable(model);

        table.setRowHeight(43);

        table.setFont(
                new Font("SansSerif", Font.PLAIN, 13)
        );

        table.setForeground(navy);
        table.setBackground(Color.WHITE);

        table.setSelectionBackground(
                new Color(255, 235, 220)
        );

        table.setSelectionForeground(navy);

        table.setGridColor(
                new Color(235, 238, 243)
        );

        table.setShowVerticalLines(false);
        table.setFillsViewportHeight(true);

        table.setAutoResizeMode(
                JTable.AUTO_RESIZE_ALL_COLUMNS
        );

        table.getTableHeader().setFont(
                new Font("SansSerif", Font.BOLD, 12)
        );

        table.getTableHeader().setBackground(
                new Color(249, 250, 252)
        );

        table.getTableHeader().setForeground(navy);

        table.getTableHeader().setPreferredSize(
                new Dimension(0, 42)
        );

        table.getTableHeader().setReorderingAllowed(false);

        JScrollPane scrollPane = new JScrollPane(table);

        scrollPane.setBorder(
                BorderFactory.createLineBorder(
                        new Color(229, 233, 239)
                )
        );

        scrollPane.getViewport().setBackground(Color.WHITE);

        // TABLE CARD
        JPanel tableCard = new JPanel(
                new BorderLayout()
        );

        tableCard.setBackground(Color.WHITE);

        tableCard.setBorder(
                new EmptyBorder(15, 15, 15, 15)
        );

        tableCard.add(
                scrollPane,
                BorderLayout.CENTER
        );

        // LOWER PANEL
        JPanel lower = new JPanel(
                new BorderLayout(0, 15)
        );

        lower.setOpaque(false);

        lower.add(
                recentTitle,
                BorderLayout.NORTH
        );

        lower.add(
                tableCard,
                BorderLayout.CENTER
        );

        overview.add(
                cards,
                BorderLayout.NORTH
        );

        overview.add(
                lower,
                BorderLayout.CENTER
        );

        return overview;
    }

    // STATISTIC CARD
    private JPanel createStatCard(String title) {

        JPanel card = new JPanel();

        card.setLayout(
                new BoxLayout(card, BoxLayout.Y_AXIS)
        );

        card.setBackground(Color.WHITE);

        card.setBorder(
                BorderFactory.createCompoundBorder(
                        BorderFactory.createLineBorder(
                                new Color(229, 233, 239)
                        ),
                        new EmptyBorder(20, 18, 20, 18)
                )
        );

        // HEADING
        JLabel heading = new JLabel(title);

        heading.setFont(
                new Font("SansSerif", Font.PLAIN, 12)
        );

        heading.setForeground(muted);
        heading.setAlignmentX(Component.LEFT_ALIGNMENT);

        // VALUE
        JLabel value = new JLabel("--");

        value.setFont(
                new Font("SansSerif", Font.BOLD, 27)
        );

        value.setForeground(navy);
        value.setAlignmentX(Component.LEFT_ALIGNMENT);

        // DESCRIPTION
        JLabel description = new JLabel("No data available");

        description.setFont(
                new Font("SansSerif", Font.PLAIN, 11)
        );

        description.setForeground(muted);
        description.setAlignmentX(Component.LEFT_ALIGNMENT);

        card.add(heading);
        card.add(Box.createVerticalStrut(18));

        card.add(value);
        card.add(Box.createVerticalStrut(12));

        card.add(description);

        return card;
    }

    // NAVIGATION
    private void navigate(String page) {

        switch (page) {

            case "dashboard":
                break;

            case "menu":
                openPage(new MenuManagement(role));
                break;

            case "customers":
                openPage(new CustomerManagement());
                break;

            case "orders":
                openPage(new OrderManagement());
                break;

            case "billing":
                openPage(new Billing());
                break;

            case "reports":

                if (isAdmin()) {
                    openPage(new Reports());
                } else {
                    denyAccess();
                }

                break;

            case "staff":

                if (isAdmin()) {

                } else {
                    denyAccess();
                }

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
                        "Page not found: " + page,
                        "Navigation Error",
                        JOptionPane.ERROR_MESSAGE
                );
        }
    }

    // OPEN PAGE
    private void openPage(JFrame page) {

        page.setLocationRelativeTo(this);
        page.setVisible(true);
    }

    // ACCESS DENIED
    private void denyAccess() {

        JOptionPane.showMessageDialog(
                this,
                "You do not have permission to access this module.",
                "Access Denied",
                JOptionPane.WARNING_MESSAGE
        );
    }
}
