import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product, ProductsResponse } from "@/types/product";
import productsApi from "@/api/products.api";

export function useProducts() {
  const { data, isLoading, error } = useQuery<ProductsResponse>({
    queryKey: ["products"],
    queryFn: async () => await productsApi.getProducts(),
  });

  return {
    products: data?.products,
    total: data?.total,
    isLoading,
    error,
  };
}

export function useProduct(id: string) {
  const { data, isLoading, error } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => await productsApi.getProductById(id),
  });

  return {
    product: data,
    isLoading,
    error,
  };
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productsApi.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) =>
      productsApi.updateProduct(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
  });
}
