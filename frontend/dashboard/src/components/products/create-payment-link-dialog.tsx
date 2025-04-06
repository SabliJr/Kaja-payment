import { ReactNode, useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CreatePaymentLinkDialogProps {
  children: ReactNode;
}

export function CreatePaymentLinkDialog({
  children,
}: CreatePaymentLinkDialogProps) {
  const [newProductName, setNewProductName] = useState("");
  const [newProductAmount, setNewProductAmount] = useState("");
  const [paymentLink, setPaymentLink] = useState("");

  const generatePaymentLink = () => {
    const baseUrl = "https://pay.yoursite.com";
    const link = `${baseUrl}/pay?amount=${newProductAmount}&name=${encodeURIComponent(
      newProductName
    )}`;
    setPaymentLink(link);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Payment Link</DialogTitle>
          <DialogDescription>
            Generate a quick payment link for direct sales
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name">Product Name</label>
            <Input
              id="name"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
              placeholder="Ex: 30min Video Consultation"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="amount">Amount (USD)</label>
            <Input
              id="amount"
              type="number"
              value={newProductAmount}
              onChange={(e) => setNewProductAmount(e.target.value)}
              placeholder="Ex: 49.99"
            />
          </div>
          {paymentLink && (
            <Alert>
              <AlertDescription className="flex items-center justify-between">
                <span className="font-mono text-sm">{paymentLink}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(paymentLink)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </div>
        <DialogFooter>
          <Button
            onClick={generatePaymentLink}
            disabled={!newProductName || !newProductAmount}
          >
            Generate Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
