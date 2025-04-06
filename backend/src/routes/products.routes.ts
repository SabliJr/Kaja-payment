import { Router } from "express";
import ProductsController from "../controllers/products.controller.js";

const router = Router();


router.get("/", ProductsController.getProducts);
router.get("/:id", ProductsController.getProductById);
router.post("/", ProductsController.createProduct);
router.put("/:id", ProductsController.updateProduct);

export default router;
