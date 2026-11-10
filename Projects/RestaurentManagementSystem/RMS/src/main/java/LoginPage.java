
import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;
import java.net.URL;
public class LoginPage extends JFrame {
    private final Color navy = new Color(24, 35, 52);
    private final Color muted = new Color(115, 125, 140);
    private final Color pageBackground = new Color(245, 247, 250);
    private JTextField usernameField;
    private JPasswordField passwordField;
    private JComboBox<String> roleComboBox;
    private JLabel statusLabel;

    public LoginPage() {
        setTitle("Restaurant Management System");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(1100, 700);
        setMinimumSize(new Dimension(850, 600));
        setLocationRelativeTo(null);

        JPanel root = new JPanel(new BorderLayout());
        root.setBackground(pageBackground);
        root.add(createNavbar(), BorderLayout.NORTH);
        root.add(createContent(), BorderLayout.CENTER);

        setContentPane(root);
    }

    private JPanel createNavbar() {

        String logoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSamRa-TJIvLlhYDWj4pkKC-iCVvpU28pw6AUXxaybKzJJVjiNUyUFnMffj&s=10";

        ImageIcon icon = null;

        try {
            icon = new ImageIcon(new URL(logoUrl));
        } catch (Exception e) {
            System.out.println("Unable to load logo.");
        }

        final Image headerImage = icon != null ? icon.getImage() : null;

        JPanel navbar = new JPanel() {
            @Override
            protected void paintComponent(Graphics g) {
                super.paintComponent(g);

                Graphics2D g2 = (Graphics2D) g.create();

                if (headerImage != null && headerImage.getWidth(this) > 0) {
                    g2.drawImage(headerImage, 0, 0, getWidth(), getHeight(), this);
                } else {
                    g2.setColor(navy);
                    g2.fillRect(0, 0, getWidth(), getHeight());
                }

                g2.dispose();
            }
        };

        navbar.setPreferredSize(new Dimension(0, 100));
        return navbar;
    }

    private JPanel createContent() {

        JPanel content = new JPanel(new GridBagLayout());
        content.setBackground(pageBackground);
        content.setBorder(new EmptyBorder(10, 20, 10, 20));

        JPanel loginCard = new JPanel();
        loginCard.setLayout(new BoxLayout(loginCard, BoxLayout.Y_AXIS));
        loginCard.setBackground(Color.WHITE);
        loginCard.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(new Color(225, 229, 235)),
                new EmptyBorder(22, 35, 22, 35)
        ));
        loginCard.setPreferredSize(new Dimension(420, 470));

        JLabel heading = new JLabel("Welcome Back");
        heading.setFont(new Font("Arial", Font.BOLD, 32));
        heading.setForeground(navy);
        heading.setAlignmentX(Component.LEFT_ALIGNMENT);

        JLabel subtitle = new JLabel("Sign in to manage your restaurant");
        subtitle.setFont(new Font("Arial", Font.PLAIN, 17));
        subtitle.setForeground(muted);
        subtitle.setAlignmentX(Component.LEFT_ALIGNMENT);

        usernameField = new JTextField();
        passwordField = new JPasswordField();

        JLabel usernameLabel = createLabel("Username");
        JLabel passwordLabel = createLabel("Password");
        JLabel roleLabel = createLabel("Role");

        styleInput(usernameField);
        styleInput(passwordField);

        roleComboBox = new JComboBox<>(new String[]{"Admin", "Staff"});
        roleComboBox.setFont(new Font("Arial", Font.PLAIN, 17));
        roleComboBox.setBackground(Color.WHITE);
        roleComboBox.setMaximumSize(new Dimension(Integer.MAX_VALUE, 42));
        roleComboBox.setAlignmentX(Component.LEFT_ALIGNMENT);

        JButton loginButton = new JButton("Login");
        JButton clearButton = new JButton("Clear");

        styleButton(loginButton, new Color(30, 105, 210));
        styleButton(clearButton, new Color(125, 130, 140));

        JPanel buttonPanel = new JPanel(new GridLayout(1, 2, 18, 0));
        buttonPanel.setBackground(Color.WHITE);
        buttonPanel.setMaximumSize(new Dimension(Integer.MAX_VALUE, 48));
        buttonPanel.setAlignmentX(Component.LEFT_ALIGNMENT);

        buttonPanel.add(loginButton);
        buttonPanel.add(clearButton);

        statusLabel = new JLabel(" ");
        statusLabel.setFont(new Font("Arial", Font.PLAIN, 12));
        statusLabel.setForeground(Color.RED);
        statusLabel.setAlignmentX(Component.LEFT_ALIGNMENT);

        loginCard.add(heading);
        loginCard.add(Box.createVerticalStrut(6));
        loginCard.add(subtitle);
        loginCard.add(Box.createVerticalStrut(20));

        loginCard.add(usernameLabel);
        loginCard.add(Box.createVerticalStrut(6));
        loginCard.add(usernameField);
        loginCard.add(Box.createVerticalStrut(10));

        loginCard.add(passwordLabel);
        loginCard.add(Box.createVerticalStrut(6));
        loginCard.add(passwordField);
        loginCard.add(Box.createVerticalStrut(10));

        loginCard.add(roleLabel);
        loginCard.add(Box.createVerticalStrut(6));
        loginCard.add(roleComboBox);
        loginCard.add(Box.createVerticalStrut(18));

        loginCard.add(buttonPanel);
        loginCard.add(Box.createVerticalStrut(5));
        loginCard.add(statusLabel);

        content.add(loginCard);

        loginButton.addActionListener(e -> login());
        passwordField.addActionListener(e -> login());

        clearButton.addActionListener(e -> {
            usernameField.setText("");
            passwordField.setText("");
            roleComboBox.setSelectedIndex(0);
            statusLabel.setText(" ");
            usernameField.requestFocus();
        });

        return content;
    }

    private JLabel createLabel(String text) {
        JLabel label = new JLabel(text);
        label.setFont(new Font("Arial", Font.BOLD, 17));
        label.setForeground(navy);
        label.setAlignmentX(Component.LEFT_ALIGNMENT);
        return label;
    }

    private void styleInput(JTextField field) {
        field.setFont(new Font("Arial", Font.PLAIN, 17));
        field.setPreferredSize(new Dimension(350, 44));
        field.setMaximumSize(new Dimension(Integer.MAX_VALUE, 44));
        field.setAlignmentX(Component.LEFT_ALIGNMENT);
        field.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(new Color(215, 220, 228), 2),
                new EmptyBorder(6, 10, 6, 10)
        ));
    }

    private void styleButton(JButton button, Color color) {
        button.setFont(new Font("Arial", Font.BOLD, 17));
        button.setForeground(Color.WHITE);
        button.setBackground(color);
        button.setFocusPainted(false);
        button.setBorderPainted(false);
        button.setCursor(new Cursor(Cursor.HAND_CURSOR));
    }

    private void login() {

        String username = usernameField.getText().trim();
        String password = new String(passwordField.getPassword());
        String role = roleComboBox.getSelectedItem().toString();

        if (username.isEmpty() || password.isEmpty()) {
            statusLabel.setText("Please enter username and password.");
            return;
        }

        if (role.equals("Admin") &&
                username.equals("admin") &&
                password.equals("admin123")) {

            new Dashboard(username, "Administrator").setVisible(true);
            dispose();

        } else if (role.equals("Staff") &&
                username.equals("staff") &&
                password.equals("staff123")) {

            new StaffDashboard(username).setVisible(true);
            dispose();

        } else {
            statusLabel.setText("Invalid username, password or role.");
            passwordField.setText("");
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            new LoginPage().setVisible(true);
        });
    }
}
