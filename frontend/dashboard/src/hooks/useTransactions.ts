import { useQuery } from "@tanstack/react-query";
import transactionsApi from "@/api/transactions.api";

export function useTransactions(params: {
  page: number;
  limit: number;
  status?: string;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["transactions", params],
    queryFn: async () => await transactionsApi.getTransactions(params),
  });

  return {
    transactions: data?.transactions,
    total: data?.total,
    page: data?.page,
    limit: data?.limit,
    isLoading,
    error,
  };
}

export function useTransaction(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["transaction", id],
    queryFn: async () => await transactionsApi.getTransactionById(id),
  });

  return {
    transaction: data,
    isLoading,
    error,
  };
}
