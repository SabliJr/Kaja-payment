import { Request, RequestHandler, Response } from "express";
import { query } from "../configs/db.js";
import type { Product } from "../types/product.js";

class ProductsController {
  private readonly MOCK_PRODUCTS = [
    {
      id: "1",
      name: "Basic Plan",
      description: "Perfect for small businesses",
      price: 29.99,
      currency: "USD",
      status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Premium Plan",
      description: "For growing businesses",
      price: 99.99,
      currency: "USD",
      status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Enterprise Plan",
      description: "Custom solutions for large organizations",
      price: 299.99,
      currency: "USD",
      status: "inactive",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  public getProducts: RequestHandler = async (req, res) => {
    try {
      const result = await query("SELECT * FROM products", []);
      const products =
        result.rows.length > 0 ? result.rows : this.MOCK_PRODUCTS;
      res.send({
        products,
        total: products.length,
      });
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  };

  public getProductById: RequestHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await query("SELECT * FROM products WHERE id = $1", [id]);

      if (result.rowCount === 0) {
        const mockProduct = this.MOCK_PRODUCTS.find((p) => p.id === id);
        if (mockProduct) {
          res.send(mockProduct);
          return;
        }
        res.status(404).send({ error: "Product not found" });
      }

      res.send(result.rows[0]);
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  };

  public createProduct: RequestHandler = async (req, res) => {
    try {
      const { name, description, price, currency, status } = req.body;
      const result = await query(
        "INSERT INTO products (name, description, price, currency, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, description, price, currency, status]
      );

      res.status(201).send(result.rows[0]);
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  };

  public updateProduct: RequestHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price, currency, status } = req.body;

      const result = await query(
        "UPDATE products SET name = $1, description = $2, price = $3, currency = $4, status = $5, updated_at = NOW() WHERE id = $6 RETURNING *",
        [name, description, price, currency, status, id]
      );

      if (result.rowCount === 0) {
        const mockProduct = this.MOCK_PRODUCTS.find((p) => p.id === id);
        if (mockProduct) {
          const updatedProduct = {
            ...mockProduct,
            ...req.body,
            updated_at: new Date().toISOString(),
          };
          res.send(updatedProduct);
          return;
        }
        res.status(404).send({ error: "Product not found" });
        return;
      }

      res.send(result.rows[0]);
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  };
}

export default new ProductsController();
