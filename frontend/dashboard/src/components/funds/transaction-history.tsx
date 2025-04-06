import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Transaction {
  id: string;
  date: string;
  type: "payment" | "withdrawal";
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed";
}

interface TransactionHistoryProps {
  transactions?: Transaction[];
  isLoading?: boolean;
}

export function TransactionHistory({
  transactions,
  isLoading,
}: TransactionHistoryProps) {
  if (isLoading) {
    return <div>Loading transactions...</div>;
  }

  if (!transactions?.length) {
    return <div>No transactions found.</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Transaction ID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{formatDate(transaction.date)}</TableCell>
            <TableCell className="capitalize">{transaction.type}</TableCell>
            <TableCell>{formatCurrency(transaction.amount)}</TableCell>
            <TableCell>
              <Badge
                variant={
                  transaction.status === "completed"
                    ? "default"
                    : transaction.status === "pending"
                      ? "secondary"
                      : "destructive"
                }
              >
                {transaction.status}
              </Badge>
            </TableCell>
            <TableCell className="font-mono">{transaction.id}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
