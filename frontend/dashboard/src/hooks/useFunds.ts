import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import fundsApi from "@/api/funds.api";

interface Balance {
  currency: string;
  amount: number;
  issuer: string | null;
  type: "native" | "stablecoin";
}

interface BalanceData {
  balances: Balance[];
  totalValue: {
    xrp: number;
    rlusd: number;
  };
}

export function useBalances() {
  return useQuery<BalanceData, Error>({
    queryKey: ["balances"],
    queryFn: () => fundsApi.getBalances(),
  });
}

export function useExchangeRates() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["exchangeRates"],
    queryFn: async () => await fundsApi.getExchangeRates(),
  });

  return {
    rates: data?.rates,
    lastUpdated: data?.lastUpdated,
    isLoading,
    error,
  };
}

export function useWithdrawalHistory(params: { page: number; limit: number }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["withdrawals", params],
    queryFn: async () => await fundsApi.getWithdrawalHistory(params),
  });

  return {
    withdrawals: data?.withdrawals,
    total: data?.total,
    page: data?.page,
    limit: data?.limit,
    isLoading,
    error,
  };
}

export function useConvertFunds() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fundsApi.convertFunds,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["balances"] });
    },
  });
}

export function useWithdrawFunds() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fundsApi.withdrawFunds,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["balances"] });
      queryClient.invalidateQueries({ queryKey: ["withdrawals"] });
    },
  });
}
