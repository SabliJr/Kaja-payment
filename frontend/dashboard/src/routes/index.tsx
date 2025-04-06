import { createFileRoute } from "@tanstack/react-router";
import { useDashboard } from "@/hooks/useDashboard";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { PaymentMethodsChart } from "@/components/dashboard/payment-methods-chart";
import { TopProducts } from "@/components/dashboard/top-products";
import { QuickActions } from "@/components/dashboard/quick-actions";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  const { stats, isLoading, error } = useDashboard();

  if (error) {
    return <div>Error loading dashboard data</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Here's an overview of your business performance
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 rounded-md bg-secondary px-3 py-2">
            <span className="text-sm text-muted-foreground">Last 30 days</span>
          </div>
        </div>
      </div>

      <StatsCards stats={stats} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <SalesChart stats={stats} />
        <RecentTransactions transactions={stats?.recentTransactions} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <TopProducts />
        <PaymentMethodsChart />
        <QuickActions />
      </div>
    </div>
  );
}
