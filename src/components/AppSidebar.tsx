
import { Home, Users, UserPlus, BarChart3, Bell, Plus, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Meus Leads", url: "/meus-leads", icon: Users },
  { title: "Novo Lead", url: "/novo-lead", icon: UserPlus },
  { title: "Relatórios", url: "/relatorios", icon: BarChart3 },
  { title: "Notificações", url: "/notificacoes", icon: Bell },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/e96c2aa9-84ba-4f75-8ef4-b2a4b2c6b0be" 
            alt="Corretor Conecta Logo" 
            className="w-10 h-10 object-contain"
          />
          <div>
            <h2 className="text-gray-900 font-semibold">Conecta Leads</h2>
            <p className="text-gray-500 text-sm">admin@conectaleads.com</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 data-[active=true]:bg-blue-100 data-[active=true]:text-blue-700 data-[active=true]:font-medium"
                  >
                    <Link to={item.url} className="flex items-center space-x-3 px-3 py-2 rounded-lg">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Separator className="mb-4 bg-gray-200" />
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-600 hover:text-blue-600 hover:bg-blue-50"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Lead
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50 mt-2"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
