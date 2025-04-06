import { Copy, RefreshCw } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ApiKeySectionProps {
  apiKey: string;
  onRegenerateKey: () => void;
}

export function ApiKeySection({ apiKey, onRegenerateKey }: ApiKeySectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>API Key</CardTitle>
        <CardDescription>
          Use this key to authenticate your API requests. Never share it
          publicly.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertDescription className="flex items-center justify-between">
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
              {apiKey}
            </code>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigator.clipboard.writeText(apiKey)}
              >
                <Copy className="h-4 w-4" />
                <span className="ml-2">Copy</span>
              </Button>
              <Button variant="outline" size="sm" onClick={onRegenerateKey}>
                <RefreshCw className="h-4 w-4" />
                <span className="ml-2">Regenerate</span>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
        <div className="text-sm text-muted-foreground">
          <p>
            ⚠️ Regenerating the API key will immediately invalidate the old one.
          </p>
          <p>Make sure to update your integrations with the new key.</p>
        </div>
      </CardContent>
    </Card>
  );
}
