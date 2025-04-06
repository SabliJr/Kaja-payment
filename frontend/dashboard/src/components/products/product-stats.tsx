import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductStatsProps {
  products: Product[] | undefined;
  total: number | undefined;
}

export function ProductStats({ products, total }: ProductStatsProps) {
  const totalRevenue =
    products?.reduce((sum, product) => sum + product.price, 0) ?? 0;
  const activeProducts =
    products?.filter((p) => p.status === "active").length ?? 0;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(totalRevenue)}
          </div>
          <p className="text-xs text-muted-foreground">Across all products</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeProducts}</div>
          <p className="text-xs text-muted-foreground">
            Out of {products?.length ?? 0} products
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total ?? 0}</div>
          <p className="text-xs text-muted-foreground">In your catalog</p>
        </CardContent>
      </Card>
    </div>
  );
}
