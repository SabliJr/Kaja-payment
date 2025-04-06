import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface SalesChartProps {
  stats?: {
    salesChart: {
      labels: string[];
      data: number[];
    };
  };
}

const salesChartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function SalesChart({ stats }: SalesChartProps) {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>
          Your sales performance over the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer config={salesChartConfig} className="h-[400px] w-full">
          <AreaChart
            data={stats?.salesChart.data.map((value, index) => ({
              name: stats?.salesChart.labels[index],
              sales: value,
            }))}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              width={80}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="var(--color-sales)"
              fill="var(--color-sales)"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
