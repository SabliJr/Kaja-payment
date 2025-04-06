import type { Product, ProductsResponse } from "@/types/product";
import { API_BASE_URL } from "./config";

class ProductsApi {
  async getProducts(): Promise<ProductsResponse> {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  }

  async getProductById(id: string): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    return response.json();
  }

  async createProduct(
    data: Omit<Product, "id" | "createdAt" | "updatedAt">
  ): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to create product");
    }
    return response.json();
  }

  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to update product");
    }
    return response.json();
  }
}

export default new ProductsApi();
