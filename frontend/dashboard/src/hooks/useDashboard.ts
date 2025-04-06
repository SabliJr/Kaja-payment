import { useQuery } from "@tanstack/react-query";
import dashboardApi from "@/api/dashboard.api";

export function useDashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => await dashboardApi.getDashboardStats(),
  });

  return {
    stats: data,
    isLoading,
    error,
  };
}
