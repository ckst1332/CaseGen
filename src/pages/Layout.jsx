

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  LayoutDashboard, 
  Plus, 
  FileText, 
  User,
  LogOut,
  Calculator
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User as UserEntity } from "@/api/entities";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: LayoutDashboard,
  },
  {
    title: "Generate Case",
    url: createPageUrl("Generate"),
    icon: Plus,
  },
  {
    title: "My Cases",
    url: createPageUrl("Cases"),
    icon: FileText,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await UserEntity.me();
      setUser(userData);
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await UserEntity.logout();
      // After logout, redirect to our custom landing page instead of platform default
      window.location.href = createPageUrl("Landing");
    } catch (error) {
      console.error("Error logging out:", error);
      // Even if logout fails, redirect to landing page
      window.location.href = createPageUrl("Landing");
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-slate-100">
        <Sidebar className="border-r border-slate-200 bg-white shadow-xl">
          <SidebarHeader className="border-b border-slate-200 p-6">
            <Link to={createPageUrl("Landing")} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-lg">Cagen</h2>
                <p className="text-xs text-slate-500 font-medium">Case Generator</p>
              </div>
            </Link>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-bold text-slate-500 uppercase tracking-wider px-3 py-2 mb-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`group hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-xl py-3 px-3 ${
                          location.pathname === item.url ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-600'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-semibold">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {user && (
              <SidebarGroup className="mt-6">
                <SidebarGroupLabel className="text-xs font-bold text-slate-500 uppercase tracking-wider px-3 py-2 mb-2">
                  Account Status
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <div className="px-3 py-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Completed</span>
                      <span className="text-sm font-bold text-slate-900">{user.cases_completed || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Credits Left</span>
                      <span className={`text-sm font-bold ${
                        (user.credits_remaining || 0) <= 3 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {user.credits_remaining || 0}
                      </span>
                    </div>
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </SidebarContent>

          <SidebarFooter className="border-t border-slate-200 p-4">
            {user ? (
              <div className="space-y-3">
                <Link to={createPageUrl("Account")}>
                  <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 text-sm truncate">{user.full_name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                  </div>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="w-full justify-start gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link to={createPageUrl("Auth")}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Sign In
                  </Button>
                </Link>
                <Link to={createPageUrl("Landing")}>
                  <Button variant="ghost" size="sm" className="w-full text-slate-600 hover:text-slate-900">
                    Back to Home
                  </Button>
                </Link>
              </div>
            )}
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-slate-200 px-6 py-4 md:hidden shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold text-slate-900">Cagen</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 to-slate-100">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

