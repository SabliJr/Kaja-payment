import { Router } from "express";
import FundsController from "../controllers/funds.controller.js";

const router = Router();

router.get("/balance", FundsController.getBalance);

export default router;
