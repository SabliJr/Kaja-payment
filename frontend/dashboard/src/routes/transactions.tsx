import { createFileRoute } from "@tanstack/react-router";
import { useTransactions } from "@/hooks/useTransactions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
import { ExternalLink, Download, Filter } from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export const Route = createFileRoute("/transactions")({
  component: TransactionsPage,
});

const statusColors = {
  pending: "text-yellow-500 bg-yellow-500/10",
  confirmed: "text-emerald-500 bg-emerald-500/10",
  failed: "text-red-500 bg-red-500/10",
} as const;

type Status = keyof typeof statusColors;

function TransactionsPage() {
  const [date, setDate] = useState<Date>();
  const [status, setStatus] = useState<Status | "all">("all");
  const [search, setSearch] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const { transactions, isLoading } = useTransactions({
    page: 1,
    limit: 100,
  });

  const filteredTransactions = transactions?.filter((transaction) => {
    if (status !== "all" && transaction.status !== status) return false;
    if (
      search &&
      !transaction.customer.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    if (date) {
      const transactionDate = new Date(transaction.date);
      if (transactionDate.toDateString() !== date.toDateString()) return false;
    }
    if (minAmount && transaction.amount < parseFloat(minAmount)) return false;
    if (maxAmount && transaction.amount > parseFloat(maxAmount)) return false;
    return true;
  });

  const totalAmount =
    filteredTransactions?.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    ) ?? 0;

  const downloadCSV = () => {
    if (!filteredTransactions) return;

    const headers = ["ID", "Customer", "Amount", "Status", "Date"];
    const csvContent = [
      headers.join(","),
      ...filteredTransactions.map((t) =>
        [
          t.id,
          t.customer,
          t.amount,
          t.status,
          new Date(t.date).toLocaleDateString(),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions-${format(new Date(), "yyyy-MM-dd")}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
          <p className="text-muted-foreground">
            Manage and track your received payments
          </p>
        </div>
        <Button onClick={downloadCSV} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exporter CSV
        </Button>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Filtres</CardTitle>
                <CardDescription>
                  Filter transactions by date, status, or amount
                </CardDescription>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setDate(undefined);
                  setStatus("all");
                  setSearch("");
                  setMinAmount("");
                  setMaxAmount("");
                }}
              >
                Reset filters
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="w-[240px]">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Filtrer par date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="w-[200px]">
                <Select
                  value={status}
                  onValueChange={(value) => setStatus(value as Status | "all")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Input
                  placeholder="Search by customer name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="w-[150px]">
                <Input
                  type="number"
                  placeholder="Min amount"
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                />
              </div>
              <div className="w-[150px]">
                <Input
                  type="number"
                  placeholder="Max amount"
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Transaction history</CardTitle>
                <CardDescription>
                  Total: {formatCurrency(totalAmount)}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <div className="text-muted-foreground">Loading...</div>
              </div>
            ) : (
              <div className="relative">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions?.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-mono">
                          {transaction.id.slice(0, 8)}...
                        </TableCell>
                        <TableCell>{transaction.customer}</TableCell>
                        <TableCell>
                          {formatCurrency(transaction.amount)}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              statusColors[transaction.status as Status]
                            }`}
                          >
                            {transaction.status === "pending" && "Pending"}
                            {transaction.status === "confirmed" && "Confirmed"}
                            {transaction.status === "failed" && "Failed"}
                          </span>
                        </TableCell>
                        <TableCell>
                          {format(new Date(transaction.date), "Pp")}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              window.open(
                                `https://testnet.xrpl.org/transactions/${transaction.id}`,
                                "_blank"
                              )
                            }
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View on XRPL
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {(filteredTransactions?.length ?? 0) === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="h-24 text-center text-muted-foreground"
                        >
                          No transactions found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
