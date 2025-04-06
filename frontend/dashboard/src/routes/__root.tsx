import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <div className="bg-background">
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
          <Outlet />
          <TanStackRouterDevtools />
        </SidebarProvider>
      </div>
    </QueryClientProvider>
  ),
});
