import { Send } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface WebhookSectionProps {
  webhookUrl: string;
  onWebhookUrlChange: (url: string) => void;
  onTestWebhook: () => void;
}

export function WebhookSection({
  webhookUrl,
  onWebhookUrlChange,
  onTestWebhook,
}: WebhookSectionProps) {
  const webhookExample = {
    event: "payment.confirmed",
    data: {
      id: "pay_123456789",
      amount: 4999,
      currency: "USD",
      status: "confirmed",
      customer: {
        email: "customer@example.com",
      },
      metadata: {
        order_id: "order_123",
      },
      created_at: "2024-04-04T10:00:00Z",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Webhook Configuration</CardTitle>
        <CardDescription>
          Receive real-time notifications for confirmed payments
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="webhook-url">Webhook URL</Label>
          <div className="flex gap-2">
            <Input
              id="webhook-url"
              placeholder="https://your-site.com/api/webhook"
              value={webhookUrl}
              onChange={(e) => onWebhookUrlChange(e.target.value)}
            />
            <Button variant="default" onClick={onTestWebhook}>
              <Send className="mr-2 h-4 w-4" />
              Test
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            The URL that will receive POST notifications for confirmed payments
          </p>
        </div>

        <Accordion type="single" collapsible>
          <AccordionItem value="format">
            <AccordionTrigger>Webhook Data Format</AccordionTrigger>
            <AccordionContent>
              <pre className="rounded-lg bg-muted p-4">
                <code className="text-sm">
                  {JSON.stringify(webhookExample, null, 2)}
                </code>
              </pre>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="text-sm text-muted-foreground space-y-2">
          <p>💡 Tips for webhook configuration:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Use HTTPS for data security</li>
            <li>Implement signature validation</li>
            <li>Add retry handling</li>
            <li>Respond with 2xx status code to confirm receipt</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
