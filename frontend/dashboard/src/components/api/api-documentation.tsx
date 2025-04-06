import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ApiDocumentation() {
  const endpoints = [
    {
      method: "POST",
      path: "/api/v1/payments",
      description: "Create a new payment",
      request: {
        amount: 4999,
        currency: "USD",
        customer: {
          email: "customer@example.com",
        },
        metadata: {
          order_id: "order_123",
        },
      },
      response: {
        id: "pay_123456789",
        amount: 4999,
        currency: "USD",
        status: "pending",
        customer: {
          email: "customer@example.com",
        },
        metadata: {
          order_id: "order_123",
        },
        created_at: "2024-04-04T10:00:00Z",
        payment_url: "https://pay.example.com/pay_123456789",
      },
    },
    {
      method: "GET",
      path: "/api/v1/payments/{id}",
      description: "Retrieve a payment by ID",
      response: {
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
        confirmed_at: "2024-04-04T10:01:00Z",
      },
    },
  ];

  const examples = {
    curl: `curl -X POST https://api.example.com/v1/payments \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 4999,
    "currency": "USD",
    "customer": {
      "email": "customer@example.com"
    },
    "metadata": {
      "order_id": "order_123"
    }
  }'`,
    javascript: `const response = await fetch('https://api.example.com/v1/payments', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    amount: 4999,
    currency: 'USD',
    customer: {
      email: 'customer@example.com',
    },
    metadata: {
      order_id: 'order_123',
    },
  }),
});

const payment = await response.json();
console.log(payment);`,
    python: `import requests

response = requests.post(
    'https://api.example.com/v1/payments',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json',
    },
    json={
        'amount': 4999,
        'currency': 'USD',
        'customer': {
            'email': 'customer@example.com',
        },
        'metadata': {
            'order_id': 'order_123',
        },
    },
)

payment = response.json()
print(payment)`,
    php: `<?php

$ch = curl_init();

curl_setopt_array($ch, [
    CURLOPT_URL => 'https://api.example.com/v1/payments',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer YOUR_API_KEY',
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => json_encode([
        'amount' => 4999,
        'currency' => 'USD',
        'customer' => [
            'email' => 'customer@example.com',
        ],
        'metadata' => [
            'order_id' => 'order_123',
        ],
    ]),
]);

$response = curl_exec($ch);
$payment = json_decode($response, true);

curl_close($ch);
print_r($payment);`,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Documentation</CardTitle>
        <CardDescription>
          Learn how to integrate payments into your application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Main Endpoints</h3>
          {endpoints.map((endpoint, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-semibold text-blue-600">
                  {endpoint.method}
                </span>
                <span className="font-mono text-sm">{endpoint.path}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {endpoint.description}
              </p>
              {endpoint.request && (
                <div className="space-y-1">
                  <p className="text-sm font-medium">Request Body:</p>
                  <pre className="rounded-lg bg-muted p-2">
                    <code className="text-sm">
                      {JSON.stringify(endpoint.request, null, 2)}
                    </code>
                  </pre>
                </div>
              )}
              <div className="space-y-1">
                <p className="text-sm font-medium">Response:</p>
                <pre className="rounded-lg bg-muted p-2">
                  <code className="text-sm">
                    {JSON.stringify(endpoint.response, null, 2)}
                  </code>
                </pre>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Code Examples</h3>
          <Tabs defaultValue="curl">
            <TabsList>
              <TabsTrigger value="curl">cURL</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="php">PHP</TabsTrigger>
            </TabsList>
            {Object.entries(examples).map(([lang, code]) => (
              <TabsContent key={lang} value={lang}>
                <pre className="rounded-lg bg-muted p-4">
                  <code className="text-sm whitespace-pre-wrap">{code}</code>
                </pre>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
