import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface StatsCardsProps {
  stats?: {
    totalBalance: number;
    totalSales: number;
    totalRevenue: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          <div className="rounded-full bg-muted p-2">
            <DollarSign className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <>
            <div className="text-2xl font-bold">
              {formatCurrency(stats?.totalBalance ?? 0)}
            </div>
            <p className="text-xs text-emerald-500 font-medium">
              +20.1% from last month
            </p>
          </>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          <div className="rounded-full bg-muted p-2">
            <ShoppingCart className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <>
            <div className="text-2xl font-bold">{stats?.totalSales}</div>
            <p className="text-xs text-emerald-500 font-medium">
              +12.5% from last month
            </p>
          </>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <div className="rounded-full bg-muted p-2">
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <>
            <div className="text-2xl font-bold">
              {formatCurrency(stats?.totalRevenue ?? 0)}
            </div>
            <p className="text-xs text-emerald-500 font-medium">
              +8.2% from last month
            </p>
          </>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Products</CardTitle>
          <div className="rounded-full bg-muted p-2">
            <Package className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-emerald-500 font-medium">
              +2 new products this month
            </p>
          </>
        </CardContent>
      </Card>
    </div>
  );
}
