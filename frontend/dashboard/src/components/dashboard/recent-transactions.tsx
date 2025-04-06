import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface Transaction {
  id: string;
  customer: string;
  amount: number;
  status: string;
  date: string;
}

interface RecentTransactionsProps {
  transactions?: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>
          Your latest transactions and their status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions?.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium">{transaction.customer}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {formatCurrency(transaction.amount)}
                </p>
                <p className="text-sm text-muted-foreground capitalize">
                  {transaction.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
