
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="flex-1 overflow-auto">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-3">
        <SidebarTrigger className="text-gray-600 hover:text-gray-900" />
      </div>
      <div className="p-6">
        {children}
      </div>
    </main>
  );
}
