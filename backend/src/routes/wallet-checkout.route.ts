import { Router } from "express";
import { walletCheckout } from "../controllers/wallet-checkout.controller.js";
const router = Router();

router.post("/", walletCheckout);
export default router;
