import { RequestHandler } from "express";
import { query } from "../configs/db.js";
import xrplService from "../services/xrpl.service.js";

class FundsController {
  public getBalance: RequestHandler = async (req, res) => {
    try {
      // Get the authenticated user's wallet address
      const userResult = await query(
        "SELECT wallet_classic_address FROM users WHERE role = 'merchant' LIMIT 1",
        []
      );

      if (!userResult.rows[0]) {
        res.status(404).send({ error: "User not found" });
        return;
      }

      const address = userResult.rows[0].wallet_classic_address;
      const balances = await xrplService.getBalance(address);

      res.send(balances);
    } catch (error) {
      console.error("Error fetching balance:", error);
      res.status(500).send({ error: "Failed to fetch balance" });
    }
  };
}

export default new FundsController();
