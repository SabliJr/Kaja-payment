import { Copy, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

interface ApiDocumentationProps {
  apiKey: string;
}

export function ApiDocumentation({ apiKey }: ApiDocumentationProps) {
  const apiExample = `// Example with fetch
const createPayment = async (productData) => {
  const response = await fetch('https://api.yoursite.com/v1/payments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${apiKey}'
    },
    body: JSON.stringify({
      name: productData.name,
      amount: productData.amount,
      currency: 'USD'
    })
  });
  
  const data = await response.json();
  return data.paymentUrl;
};`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Integration</CardTitle>
        <CardDescription>
          Integrate payments into your website or application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold">Your API Key</h3>
          <Alert>
            <AlertDescription className="flex items-center justify-between">
              <span className="font-mono text-sm">{apiKey}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigator.clipboard.writeText(apiKey)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </AlertDescription>
          </Alert>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="font-semibold">Integration Example</h3>
          <div className="rounded-md bg-muted p-4">
            <pre className="text-sm">{apiExample}</pre>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="font-semibold">Full Documentation</h3>
          <p className="text-sm text-muted-foreground">
            Check our complete documentation for more examples and API
            information.
          </p>
          <Button variant="outline">
            <ExternalLink className="mr-2 h-4 w-4" />
            View Documentation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
