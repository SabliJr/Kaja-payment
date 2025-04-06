import type { RequestHandler } from "express";
import { query } from "../configs/db.js";

class DashboardController {
  private readonly MOCK_TRANSACTIONS = [
    {
      id: "tx_1",
      amount: 99.99,
      customer: "John Doe",
      status: "completed",
      date: "2024-04-03T10:30:00Z",
    },
    {
      id: "tx_2",
      amount: 49.99,
      customer: "Jane Smith",
      status: "completed",
      date: "2024-04-02T15:45:00Z",
    },
    {
      id: "tx_3",
      amount: 299.99,
      customer: "Bob Wilson",
      status: "pending",
      date: "2024-04-01T09:15:00Z",
    },
  ];

  private readonly MOCK_SALES_DATA = {
    totalSales: 156,
    totalRevenue: 45678.9,
    salesChart: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      data: [12000, 19000, 15000, 25000, 22000, 30000],
    },
  };

  public getDashboardStats: RequestHandler = async (req, res) => {
    try {
      const salesResult = await query(
        "SELECT COUNT(*) as total_sales, SUM(amount_paid) as total_revenue FROM orders WHERE status = $1",
        ["completed"]
      );

      const recentTransactions = await query(
        "SELECT o.id, o.amount_paid as amount, u.email as customer, o.status, o.created_at as date FROM orders o JOIN users u ON o.buyer_wallet = u.wallet_classic_address ORDER BY o.created_at DESC LIMIT 5",
        []
      );

      res.send({
        totalSales:
          parseInt(salesResult.rows[0]?.total_sales) ||
          this.MOCK_SALES_DATA.totalSales,
        totalRevenue:
          parseFloat(salesResult.rows[0]?.total_revenue) ||
          this.MOCK_SALES_DATA.totalRevenue,
        recentTransactions:
          recentTransactions.rows.length > 0
            ? recentTransactions.rows.map((tx) => ({
                id: tx.id,
                amount: parseFloat(tx.amount),
                customer: tx.customer,
                status: tx.status,
                date: tx.date,
              }))
            : this.MOCK_TRANSACTIONS,
        salesChart: this.MOCK_SALES_DATA.salesChart,
      });
    } catch (error) {
      console.error("Dashboard stats error:", error);
      res.status(500).send({ error: "Internal server error" });
    }
  };
}

export default new DashboardController();
