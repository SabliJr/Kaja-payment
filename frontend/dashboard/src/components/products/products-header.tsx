import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreatePaymentLinkDialog } from "./create-payment-link-dialog";

export function ProductsHeader() {
  return (
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <p className="text-muted-foreground">
          Manage your products and generate payment links
        </p>
      </div>
      <CreatePaymentLinkDialog>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Payment Link
        </Button>
      </CreatePaymentLinkDialog>
    </div>
  );
}
