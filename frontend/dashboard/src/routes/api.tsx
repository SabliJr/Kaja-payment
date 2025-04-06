import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ApiKeySection } from "@/components/api/api-key-section";
import { WebhookSection } from "@/components/api/webhook-section";
import { ApiDocumentation } from "@/components/api/api-documentation";
import { IntegrationExamples } from "@/components/api/integration-examples";

export const Route = createFileRoute("/api")({
  component: ApiPage,
});

function ApiPage() {
  const [apiKey, setApiKey] = useState("sk_test_123456789");
  const [webhookUrl, setWebhookUrl] = useState("");

  const handleRegenerateKey = () => {
    // Simuler la régénération de la clé API
    const newKey = "sk_test_" + Math.random().toString(36).substring(2);
    setApiKey(newKey);
  };

  const handleTestWebhook = async () => {
    if (!webhookUrl) {
      alert("Veuillez d'abord configurer l'URL du webhook");
      return;
    }

    // Simuler l'envoi d'un événement de test
    const testEvent = {
      event: "test",
      data: {
        id: "test_" + Math.random().toString(36).substring(2),
        amount: 4999,
        currency: "USD",
        status: "test",
        created_at: new Date().toISOString(),
      },
    };

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Signature": "test_signature",
        },
        body: JSON.stringify(testEvent),
      });

      if (response.ok) {
        alert("Test webhook envoyé avec succès !");
      } else {
        alert("Erreur lors de l'envoi du webhook de test");
      }
    } catch (error) {
      alert("Erreur lors de l'envoi du webhook de test : " + error);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">API & Integration</h2>
        <p className="text-muted-foreground">
          Manage your API keys and integrate payments into your application
        </p>
      </div>

      <div className="grid gap-4">
        <ApiKeySection apiKey={apiKey} onRegenerateKey={handleRegenerateKey} />
        <WebhookSection
          webhookUrl={webhookUrl}
          onWebhookUrlChange={setWebhookUrl}
          onTestWebhook={handleTestWebhook}
        />
        <ApiDocumentation />
        <IntegrationExamples />
      </div>
    </div>
  );
}
