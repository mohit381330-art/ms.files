
import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.sql.*;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;

public class Reports extends JFrame {

    private final Color navy = new Color(24, 35, 52);
    private final Color accent = new Color(232, 112, 55);
    private final Color muted = new Color(115, 125, 140);

    private JComboBox<String> reportType;
    private JTextField fromDate;
    private JTextField toDate;

    private JTable reportTable;
    private DefaultTableModel tableModel;
    private JLabel statusLabel;

    public Reports() {

        setTitle("Savora | Reports");
        setSize(1000, 650);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);

        JPanel root = new JPanel(new BorderLayout(20, 20));
        root.setBackground(new Color(245, 247, 250));
        root.setBorder(
                BorderFactory.createEmptyBorder(30, 30, 30, 30)
        );

        // Heading
        JLabel title = new JLabel("Reports & Analytics");
        title.setFont(new Font("SansSerif", Font.BOLD, 27));
        title.setForeground(navy);

        JLabel subtitle = new JLabel(
                "Review restaurant performance and business activity."
        );
        subtitle.setForeground(muted);
        subtitle.setFont(new Font("SansSerif", Font.PLAIN, 13));

        JPanel heading = new JPanel();
        heading.setOpaque(false);
        heading.setLayout(
                new BoxLayout(heading, BoxLayout.Y_AXIS)
        );

        heading.add(title);
        heading.add(Box.createVerticalStrut(8));
        heading.add(subtitle);

        // Filters Panel
        JPanel filters = new JPanel(
                new FlowLayout(FlowLayout.LEFT, 12, 10)
        );

        filters.setBackground(Color.WHITE);
        filters.setBorder(
                BorderFactory.createEmptyBorder(10, 10, 10, 10)
        );

        reportType = new JComboBox<>(new String[]{
                "Sales Report",
                "Orders Report",
                "Menu Report",
                "Customer Report"
        });

        fromDate = new JTextField(10);
        fromDate.setToolTipText("Start date: YYYY-MM-DD");

        toDate = new JTextField(10);
        toDate.setToolTipText("End date: YYYY-MM-DD");

        JButton generate = new JButton("Generate Report");
        generate.setBackground(accent);
        generate.setForeground(Color.WHITE);
        generate.setFocusPainted(false);
        generate.setBorderPainted(false);

        filters.add(new JLabel("Report Type:"));
        filters.add(reportType);

        filters.add(new JLabel("From (YYYY-MM-DD):"));
        filters.add(fromDate);

        filters.add(new JLabel("To (YYYY-MM-DD):"));
        filters.add(toDate);

        filters.add(generate);

        // Table
        tableModel = new DefaultTableModel();

        reportTable = new JTable(tableModel);
        reportTable.setRowHeight(28);
        reportTable.setFont(
                new Font("SansSerif", Font.PLAIN, 13)
        );

        reportTable.getTableHeader().setFont(
                new Font("SansSerif", Font.BOLD, 13)
        );

        reportTable.setAutoResizeMode(
                JTable.AUTO_RESIZE_OFF
        );

        JScrollPane scrollPane = new JScrollPane(reportTable);
        scrollPane.setBorder(
                BorderFactory.createLineBorder(
                        new Color(229, 233, 239)
                )
        );

        // Status
        statusLabel = new JLabel(
                "Select report type and click Generate Report."
        );

        statusLabel.setForeground(muted);

        JPanel center = new JPanel(new BorderLayout(0, 10));
        center.setOpaque(false);

        center.add(scrollPane, BorderLayout.CENTER);
        center.add(statusLabel, BorderLayout.SOUTH);

        // Top Panel
        JPanel top = new JPanel(new BorderLayout(0, 20));
        top.setOpaque(false);

        top.add(heading, BorderLayout.NORTH);
        top.add(filters, BorderLayout.CENTER);

        root.add(top, BorderLayout.NORTH);
        root.add(center, BorderLayout.CENTER);

        setContentPane(root);

        // Generate Button
        generate.addActionListener(e -> generateReport());
    }

    // Generate Report Method
    private void generateReport() {

        String selectedReport =
                reportType.getSelectedItem().toString();

        String from = fromDate.getText().trim();
        String to = toDate.getText().trim();

        // Date Validation
        if (!from.isEmpty() && !validDate(from)
                || !to.isEmpty() && !validDate(to)) {

            JOptionPane.showMessageDialog(
                    this,
                    "Use valid dates in YYYY-MM-DD format."
            );

            return;
        }

        if (!from.isEmpty() && !to.isEmpty()
                && from.compareTo(to) > 0) {

            JOptionPane.showMessageDialog(
                    this,
                    "Start date must not be after end date."
            );

            return;
        }

        String sql;
        boolean dateFilter = false;
        String dateColumn = "";

        // Report Selection
        switch (selectedReport) {

            case "Sales Report":

                sql = "SELECT bill_id, customer_name, subtotal, " +
                        "tax_amount, grand_total, payment_status, bill_date " +
                        "FROM bills WHERE 1=1";

                dateFilter = true;
                dateColumn = "bill_date";
                break;

            case "Orders Report":

                sql = "SELECT order_id, customer, item, quantity, " +
                        "amount, status, created_at " +
                        "FROM orders WHERE 1=1";

                dateFilter = true;
                dateColumn = "created_at";
                break;

            case "Menu Report":

                sql = "SELECT id, item_name, category, price, availability " +
                        "FROM menu";

                break;

            case "Customer Report":

                sql = "SELECT id, customer_name, phone, email, address " +
                        "FROM customers";

                break;

            default:
                return;
        }

        // Date Conditions
        if (dateFilter) {

            if (!from.isEmpty()) {
                sql += " AND DATE(" + dateColumn + ") >= ?";
            }

            if (!to.isEmpty()) {
                sql += " AND DATE(" + dateColumn + ") <= ?";
            }
        }

        // Database Connection
        try (Connection con = DBConnection.getConnection();
             PreparedStatement pst = con.prepareStatement(sql)) {

            int index = 1;

            if (dateFilter && !from.isEmpty()) {

                pst.setDate(
                        index++,
                        Date.valueOf(LocalDate.parse(from))
                );
            }

            if (dateFilter && !to.isEmpty()) {

                pst.setDate(
                        index++,
                        Date.valueOf(LocalDate.parse(to))
                );
            }

            try (ResultSet rs = pst.executeQuery()) {

                tableModel.setRowCount(0);
                tableModel.setColumnCount(0);

                ResultSetMetaData meta = rs.getMetaData();

                int columnCount = meta.getColumnCount();

                // Table Columns
                for (int i = 1; i <= columnCount; i++) {

                    tableModel.addColumn(
                            meta.getColumnLabel(i)
                    );
                }

                // Table Records
                int count = 0;

                while (rs.next()) {

                    Object[] row = new Object[columnCount];

                    for (int i = 1; i <= columnCount; i++) {

                        row[i - 1] = rs.getObject(i);
                    }

                    tableModel.addRow(row);

                    count++;
                }

                statusLabel.setText(
                        count + " record(s) found in "
                                + selectedReport
                );

                if (count == 0) {

                    JOptionPane.showMessageDialog(
                            this,
                            "No records found in " + selectedReport
                    );
                }
            }

        } catch (SQLException ex) {

            JOptionPane.showMessageDialog(
                    this,
                    "Database Error: " + ex.getMessage(),
                    "Report Error",
                    JOptionPane.ERROR_MESSAGE
            );

            ex.printStackTrace();

        } catch (DateTimeParseException ex) {

            JOptionPane.showMessageDialog(
                    this,
                    "Invalid date. Use YYYY-MM-DD format."
            );
        }
    }

    // Date Validation
    private boolean validDate(String date) {

        try {

            LocalDate.parse(date);

            return date.matches("\\d{4}-\\d{2}-\\d{2}");

        } catch (DateTimeParseException ex) {

            return false;
        }
    }

    public static void main(String[] args) {

        SwingUtilities.invokeLater(() ->
                new Reports().setVisible(true)
        );
    }
}
