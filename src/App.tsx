
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import MainLayout from "./components/MainLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import MeusLeads from "./pages/MeusLeads";
import NovoLead from "./pages/NovoLead";
import Corretores from "./pages/Corretores";
import Relatorios from "./pages/Relatorios";
import Notificacoes from "./pages/Notificacoes";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Index />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/meus-leads"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <MeusLeads />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/novo-lead"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <NovoLead />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/corretores"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Corretores />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/relatorios"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Relatorios />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/notificacoes"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Notificacoes />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
