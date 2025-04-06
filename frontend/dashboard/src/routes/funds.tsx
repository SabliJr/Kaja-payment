import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TransactionHistory } from "@/components/funds/transaction-history";
import { WithdrawalHistory } from "@/components/funds/withdrawal-history";
import { PaymentSettings } from "@/components/funds/payment-settings";
import { useBalances } from "@/hooks/useFunds";

export const Route = createFileRoute("/funds")({
  component: FundsPage,
});

function FundsPage() {
  const { data, isLoading, error } = useBalances();

  // Mock data for demonstration
  const transactions = [
    {
      id: "txn_1234",
      date: new Date().toISOString(),
      type: "payment" as const,
      amount: 299.99,
      currency: "USD",
      status: "completed" as const,
    },
    {
      id: "txn_1235",
      date: new Date().toISOString(),
      type: "withdrawal" as const,
      amount: -1500.0,
      currency: "USD",
      status: "pending" as const,
    },
  ];

  const withdrawals = [
    {
      id: "wth_1234",
      date: new Date().toISOString(),
      amount: 1500.0,
      currency: "USD",
      method: "bank_transfer" as const,
      status: "processing" as const,
      destination: "DE89 3704 0044 0532 0130 00",
    },
    {
      id: "wth_1235",
      date: new Date().toISOString(),
      amount: 500.0,
      currency: "USD",
      method: "crypto" as const,
      status: "completed" as const,
      destination: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const xrpBalance =
    data?.balances.find((b) => b.currency === "XRP")?.amount || 0;
  const rlusdBalance =
    data?.balances.find((b) => b.currency === "RLUSD")?.amount || 0;
  const XRP_PRICE_USD = 2.13;
  const totalValueUSD = rlusdBalance + xrpBalance * XRP_PRICE_USD;

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Funds</h2>
          <p className="text-muted-foreground">
            Manage your balance and withdrawals
          </p>
        </div>
        <Button>Withdraw Funds</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">XRP Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {xrpBalance.toFixed(2)} XRP
            </div>
            <p className="text-xs text-muted-foreground">
              ≈ ${(xrpBalance * XRP_PRICE_USD).toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">RLUSD Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${rlusdBalance.toFixed(2)} RLUSD
            </div>
            <p className="text-xs text-muted-foreground">Stablecoin</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Value (USD)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalValueUSD.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">XRP + RLUSD</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
          <TabsTrigger value="settings">Payment Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionHistory transactions={transactions} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="withdrawals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Withdrawal History</CardTitle>
            </CardHeader>
            <CardContent>
              <WithdrawalHistory withdrawals={withdrawals} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <PaymentSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
