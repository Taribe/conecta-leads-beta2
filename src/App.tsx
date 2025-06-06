
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { MainLayout } from "./components/MainLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import MeusLeads from "./pages/MeusLeads";
import NovoLead from "./pages/NovoLead";
import EditarLead from "./pages/EditarLead";
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
              path="/*"
              element={
                <ProtectedRoute>
                  <SidebarProvider>
                    <div className="min-h-screen flex w-full">
                      <AppSidebar />
                      <SidebarInset>
                        <Routes>
                          <Route
                            path="/"
                            element={
                              <MainLayout>
                                <Index />
                              </MainLayout>
                            }
                          />
                          <Route
                            path="/dashboard"
                            element={
                              <MainLayout>
                                <Dashboard />
                              </MainLayout>
                            }
                          />
                          <Route
                            path="/meus-leads"
                            element={
                              <MainLayout>
                                <MeusLeads />
                              </MainLayout>
                            }
                          />
                          <Route
                            path="/novo-lead"
                            element={
                              <MainLayout>
                                <NovoLead />
                              </MainLayout>
                            }
                          />
                          <Route
                            path="/editar-lead/:id"
                            element={
                              <MainLayout>
                                <EditarLead />
                              </MainLayout>
                            }
                          />
                          <Route
                            path="/corretores"
                            element={
                              <MainLayout>
                                <Corretores />
                              </MainLayout>
                            }
                          />
                          <Route
                            path="/relatorios"
                            element={
                              <MainLayout>
                                <Relatorios />
                              </MainLayout>
                            }
                          />
                          <Route
                            path="/notificacoes"
                            element={
                              <MainLayout>
                                <Notificacoes />
                              </MainLayout>
                            }
                          />
                        </Routes>
                      </SidebarInset>
                    </div>
                  </SidebarProvider>
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
