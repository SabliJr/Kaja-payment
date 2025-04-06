import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Wallet } from "lucide-react";

interface PaymentSettingsProps {
  onSave?: (data: any) => void;
}

export function PaymentSettings({ onSave }: PaymentSettingsProps) {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5" />
            <div>
              <CardTitle>Bank Account</CardTitle>
              <CardDescription>
                Add your bank account for withdrawals
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="account_holder">Account Holder Name</Label>
            <Input id="account_holder" placeholder="John Doe" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="iban">IBAN</Label>
            <Input id="iban" placeholder="DE89 3704 0044 0532 0130 00" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="swift">SWIFT/BIC</Label>
            <Input id="swift" placeholder="DEUTDEDBXXX" />
          </div>
          <Button onClick={() => onSave?.({ type: "bank" })}>
            Save Bank Details
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Wallet className="w-5 h-5" />
            <div>
              <CardTitle>Crypto Wallet</CardTitle>
              <CardDescription>
                Add your crypto wallet for withdrawals
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="eth_address">ETH Address</Label>
            <Input
              id="eth_address"
              placeholder="0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="usdc_address">USDC Address</Label>
            <Input
              id="usdc_address"
              placeholder="0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
            />
          </div>
          <Button onClick={() => onSave?.({ type: "crypto" })}>
            Save Crypto Details
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
