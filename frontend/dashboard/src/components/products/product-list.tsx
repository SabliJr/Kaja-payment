import { Plus, Link as LinkIcon, CheckCircle, XCircle } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductListProps {
  products: Product[] | undefined;
  onGeneratePaymentLink: (productId: string) => void;
}

export function ProductList({
  products,
  onGeneratePaymentLink,
}: ProductListProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Product List</CardTitle>
            <CardDescription>
              All your products and their performance
            </CardDescription>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="max-w-[300px] truncate">
                  {product.description}
                </TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      product.status === "active" ? "default" : "secondary"
                    }
                    className={
                      product.status === "active"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : ""
                    }
                  >
                    {product.status === "active" ? (
                      <CheckCircle className="mr-1 h-3 w-3" />
                    ) : (
                      <XCircle className="mr-1 h-3 w-3" />
                    )}
                    {product.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onGeneratePaymentLink(product.id)}
                  >
                    <LinkIcon className="mr-2 h-4 w-4" />
                    Payment Link
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {!products?.length && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
