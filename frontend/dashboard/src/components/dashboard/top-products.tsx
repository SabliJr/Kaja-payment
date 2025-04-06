import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function TopProducts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
        <CardDescription>Your best selling products</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {["Premium Plan", "Basic Plan", "Enterprise Plan"].map((product) => (
            <div key={product} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">{product}</p>
                <p className="text-sm text-muted-foreground">
                  Monthly subscription
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">$99.99</p>
                <p className="text-sm text-muted-foreground">45 sales</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
