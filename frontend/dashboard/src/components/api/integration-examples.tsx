import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function IntegrationExamples() {
  const examples = {
    html: `<!-- Payment Button -->
<form action="https://api.example.com/v1/payments" method="POST">
  <input type="hidden" name="amount" value="4999" />
  <input type="hidden" name="currency" value="USD" />
  <input type="hidden" name="description" value="Premium T-shirt" />
  <button type="submit" style="padding: 12px 24px; background: #0070f3; color: white; border: none; border-radius: 6px; cursor: pointer;">
    Pay $49.99
  </button>
</form>`,
    react: `import { useState } from 'react'

export function PaymentButton({ amount, currency, description }) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('https://api.example.com/v1/payments', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
          description,
        }),
      })

      const { payment_url } = await response.json()
      window.location.href = payment_url
    } catch (error) {
      console.error('Payment error:', error)
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading}
      style={{
        padding: '12px 24px',
        background: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        opacity: isLoading ? 0.7 : 1,
      }}
    >
      {isLoading ? 'Processing...' : \`Pay \${amount / 100} \${currency}\`}
    </button>
  )
}`,
    webhook: `// Node.js Webhook Handler Example
const express = require('express')
const crypto = require('crypto')

const app = express()
app.use(express.json())

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

app.post('/webhook', (req, res) => {
  const signature = req.headers['x-signature']
  
  // Verify webhook signature
  const hmac = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(JSON.stringify(req.body))
    .digest('hex')
    
  if (signature !== hmac) {
    return res.status(401).json({ error: 'Invalid signature' })
  }
  
  const { event, data } = req.body
  
  // Handle different event types
  switch (event) {
    case 'payment.confirmed':
      // Update order status
      console.log('Payment confirmed:', data.id)
      // Update your database, send confirmation email, etc.
      break
      
    case 'payment.failed':
      console.log('Payment failed:', data.id)
      // Handle failed payment
      break
  }
  
  res.json({ received: true })
})

app.listen(3000, () => {
  console.log('Webhook server running on port 3000')
})`,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integration Examples</CardTitle>
        <CardDescription>
          Ready-to-use code examples for common integration scenarios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="html">
          <TabsList>
            <TabsTrigger value="html">HTML Button</TabsTrigger>
            <TabsTrigger value="react">React Component</TabsTrigger>
            <TabsTrigger value="webhook">Webhook Handler</TabsTrigger>
          </TabsList>
          {Object.entries(examples).map(([lang, code]) => (
            <TabsContent key={lang} value={lang}>
              <pre className="rounded-lg bg-muted p-4">
                <code className="text-sm whitespace-pre-wrap">{code}</code>
              </pre>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
