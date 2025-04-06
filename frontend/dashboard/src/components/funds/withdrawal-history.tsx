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

interface Withdrawal {
  id: string;
  date: string;
  amount: number;
  currency: string;
  method: "bank_transfer" | "crypto";
  status: "processing" | "completed" | "failed";
  destination: string;
}

interface WithdrawalHistoryProps {
  withdrawals?: Withdrawal[];
  isLoading?: boolean;
}

export function WithdrawalHistory({
  withdrawals,
  isLoading,
}: WithdrawalHistoryProps) {
  if (isLoading) {
    return <div>Loading withdrawals...</div>;
  }

  if (!withdrawals?.length) {
    return <div>No withdrawals found.</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Destination</TableHead>
          <TableHead>Reference</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {withdrawals.map((withdrawal) => (
          <TableRow key={withdrawal.id}>
            <TableCell>{formatDate(withdrawal.date)}</TableCell>
            <TableCell>{formatCurrency(withdrawal.amount)}</TableCell>
            <TableCell className="capitalize">
              {withdrawal.method.replace("_", " ")}
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  withdrawal.status === "completed"
                    ? "default"
                    : withdrawal.status === "processing"
                      ? "secondary"
                      : "destructive"
                }
              >
                {withdrawal.status}
              </Badge>
            </TableCell>
            <TableCell className="font-mono max-w-[200px] truncate">
              {withdrawal.destination}
            </TableCell>
            <TableCell className="font-mono">{withdrawal.id}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
