
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { MainLayout } from "@/components/MainLayout";
import Dashboard from "./pages/Dashboard";
import MeusLeads from "./pages/MeusLeads";
import NovoLead from "./pages/NovoLead";
import Relatorios from "./pages/Relatorios";
import Notificacoes from "./pages/Notificacoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-gray-50">
            <AppSidebar />
            <MainLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/meus-leads" element={<MeusLeads />} />
                <Route path="/novo-lead" element={<NovoLead />} />
                <Route path="/relatorios" element={<Relatorios />} />
                <Route path="/notificacoes" element={<Notificacoes />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MainLayout>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
