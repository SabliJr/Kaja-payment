import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common actions for your business</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <button className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent">
            <div className="space-y-1">
              <p className="text-sm font-medium">Add New Product</p>
              <p className="text-sm text-muted-foreground">
                Create a new product listing
              </p>
            </div>
            <ArrowUpRight className="h-4 w-4" />
          </button>
          <button className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent">
            <div className="space-y-1">
              <p className="text-sm font-medium">View Reports</p>
              <p className="text-sm text-muted-foreground">
                Generate detailed reports
              </p>
            </div>
            <ArrowUpRight className="h-4 w-4" />
          </button>
          <button className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent">
            <div className="space-y-1">
              <p className="text-sm font-medium">Manage API Keys</p>
              <p className="text-sm text-muted-foreground">
                View and rotate API keys
              </p>
            </div>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
