import { Request, Response } from "express";
import { query } from "../configs/db.js";
import mockCexService from "../services/mock-cex.service.js";
import xrplService from "../services/xrpl.service.js";
import { CrossBridgeRequest } from "../types/cex.types.js";

class CrossBridgeController {
  public initiateCrossBridge = async (req: Request, res: Response) => {
    try {
      const { ethTxHash, amount, merchantId } = req.body as CrossBridgeRequest;

      // Get merchant
      const merchantResult = await query(
        "SELECT id, wallet_classic_address FROM users WHERE id = $1 AND role = 'merchant'",
        [merchantId]
      );

      if (!merchantResult.rows[0]) {
        res.status(404).send({ error: "Merchant not found" });
        return;
      }

      const merchant = merchantResult.rows[0];

      // Create initial transaction record
      const txResult = await query(
        "INSERT INTO cross_bridge_transactions (eth_tx_hash, merchant_id, usdt_amount, status) VALUES ($1, $2, $3, $4) RETURNING id",
        [ethTxHash, merchantId, amount, "pending"]
      );

      const bridgeId = txResult.rows[0].id;

      // Mock USDT deposit to CEX
      const depositTx = await mockCexService.depositUSDT(amount);

      // Update transaction status
      await query(
        "UPDATE cross_bridge_transactions SET status = $1, cex_transaction_id = $2 WHERE id = $3",
        ["processing", depositTx.id, bridgeId]
      );

      // Convert USDT to XRP
      const conversionTx = await mockCexService.convertToXRP(depositTx.id);

      // Withdraw XRP to merchant's wallet
      const withdrawal = await mockCexService.withdrawXRP(
        conversionTx.amount,
        merchant.wallet_classic_address
      );

      // Send XRP to merchant using our XRPL service
      const xrpResult = await xrplService.sendXRPayment(
        process.env.BRIDGE_WALLET_SEED!, // We'll need to add this to .env
        merchant.wallet_classic_address,
        conversionTx.amount
      );

      // Update transaction as completed
      await query(
        "UPDATE cross_bridge_transactions SET status = $1, xrp_amount = $2, xrp_transaction_hash = $3, completed_at = NOW() WHERE id = $4",
        ["completed", conversionTx.amount, xrpResult.result.hash, bridgeId]
      );

      res.send({
        success: true,
        transaction: {
          id: bridgeId,
          ethTxHash,
          xrpTxHash: xrpResult.result.hash,
          usdtAmount: amount,
          xrpAmount: conversionTx.amount,
          status: "completed",
        },
      });
    } catch (error) {
      console.error("Cross-bridge transaction error:", error);
      res
        .status(500)
        .send({ error: "Failed to process cross-bridge transaction" });
    }
  };

  public getTransactionStatus = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const result = await query(
        "SELECT * FROM cross_bridge_transactions WHERE id = $1",
        [id]
      );

      if (!result.rows[0]) {
        res.status(404).send({ error: "Transaction not found" });
        return;
      }

      res.send({
        success: true,
        transaction: result.rows[0],
      });
    } catch (error) {
      console.error("Error fetching transaction status:", error);
      res.status(500).send({ error: "Failed to fetch transaction status" });
    }
  };
}

export default new CrossBridgeController();
