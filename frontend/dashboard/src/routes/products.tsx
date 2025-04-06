import { createFileRoute } from "@tanstack/react-router";
import { useProducts } from "@/hooks/useProducts";
import { ProductsHeader } from "@/components/products/products-header";
import { ProductStats } from "@/components/products/product-stats";
import { ProductList } from "@/components/products/product-list";
import { ApiDocumentation } from "@/components/products/api-documentation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
});

function ProductsPage() {
  const { products, total, isLoading } = useProducts();
  const apiKey = "sk_test_123456789"; // To be replaced with real API key

  const generatePaymentLink = (productId: string) => {
    const baseUrl = "https://pay.yoursite.com";
    const link = `${baseUrl}/pay/${productId}`;
    // You might want to show this link in a toast or modal
    console.log(link);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <ProductsHeader />

      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="api">API Documentation</TabsTrigger>
        </TabsList>
        <TabsContent value="products" className="space-y-4">
          <ProductStats products={products} total={total} />
          <ProductList
            products={products}
            onGeneratePaymentLink={generatePaymentLink}
          />
        </TabsContent>
        <TabsContent value="api" className="space-y-4">
          <ApiDocumentation apiKey={apiKey} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
