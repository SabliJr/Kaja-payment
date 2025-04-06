import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

const paymentMethodsConfig = {
  creditCard: {
    label: "Credit Card",
    color: "hsl(var(--primary))",
  },
  bankTransfer: {
    label: "Bank Transfer",
    color: "hsl(var(--secondary))",
  },
  crypto: {
    label: "Crypto",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

export function PaymentMethodsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>Distribution of payment methods</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer
          config={paymentMethodsConfig}
          className="h-[300px] w-full"
        >
          <BarChart
            data={[
              { name: "Credit Card", creditCard: 60 },
              { name: "Bank Transfer", bankTransfer: 25 },
              { name: "Crypto", crypto: 15 },
            ]}
            margin={{
              top: 20,
              right: 30,
              left: 30,
              bottom: 30,
            }}
            barSize={80}
            maxBarSize={100}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              padding={{ left: 40, right: 40 }}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              width={50}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="creditCard"
              fill="var(--color-creditCard)"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="bankTransfer"
              fill="var(--color-bankTransfer)"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="crypto"
              fill="var(--color-crypto)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
