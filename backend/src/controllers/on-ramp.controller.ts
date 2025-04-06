import { RequestHandler } from "express";
import { query } from "../configs/db.js";
import xrplService from "../services/xrpl.service.js";

class OnRampController {
  public createOnRampTransaction: RequestHandler = async (req, res, next) => {
    try {
      const { name, description, price } = req.body;

      // Get customer (there's only one)
      const customerResult = await query(
        "SELECT id, wallet_seed, wallet_classic_address FROM users WHERE role = 'customer' LIMIT 1",
        []
      );

      if (!customerResult.rows[0]) {
        res.status(404).send({ error: "Customer not found" });
        return;
      }

      // Get merchant (there's only one)
      const merchantResult = await query(
        "SELECT id, wallet_classic_address FROM users WHERE role = 'merchant' LIMIT 1",
        []
      );

      if (!merchantResult.rows[0]) {
        res.status(404).send({ error: "Merchant not found" });
        return;
      }

      const customer = customerResult.rows[0];
      const merchant = merchantResult.rows[0];

      // Create product with pending status
      const productResult = await query(
        "INSERT INTO products (merchant_id, name, description, price, status) VALUES ($1, $2, $3, $4, $5) RETURNING id",
        [merchant.id, name, description, price, "pending"]
      );

      const productId = productResult.rows[0].id;

      // // Execute the RLUSD payment
      // const result = await xrplService.sendRLUSDPayment(
      //   customer.wallet_seed,
      //   merchant.wallet_classic_address,
      //   price.toString()
      // );
      const result = await xrplService.sendXRPayment(
        customer.wallet_seed,
        merchant.wallet_classic_address,
        price.toString()
      );

      // Create order record and update product status
      await query(
        "INSERT INTO orders (buyer_wallet, network, product_id, amount_paid, token, issuer, tx_hash, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [
          customer.wallet_classic_address,
          "XRPL",
          productId,
          price,
          "XRP",
          merchant.wallet_classic_address,
          result.result.hash,
          "completed",
        ]
      );

      // Update product status to completed
      await query("UPDATE products SET status = $1 WHERE id = $2", [
        "completed",
        productId,
      ]);

      res.send({
        success: true,
        product: {
          id: productId,
          name,
          price,
        },
      });
    } catch (error) {
      console.error("On-ramp transaction error:", error);
      res.status(500).send({ error: "Failed to process on-ramp transaction" });
    }
  };
}

export default new OnRampController();
