export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
}
