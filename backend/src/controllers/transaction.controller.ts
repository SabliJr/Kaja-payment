import { Request, Response } from "express";
import { query } from "../configs/db.js";

class TransactionController {
  public async getTransactions(req: Request, res: Response) {
    try {
      const transactions = await query("SELECT * FROM transactions", []);
      res.send(transactions);
    } catch (error) {
      res.status(500).send({ error: "Failed to get transactions" });
    }
  }
}

export default new TransactionController();
