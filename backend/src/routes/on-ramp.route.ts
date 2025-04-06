import { Router } from "express";
import OnRampController from "../controllers/on-ramp.controller.js";

const router = Router();

router.post("/", OnRampController.createOnRampTransaction);

export default router;
