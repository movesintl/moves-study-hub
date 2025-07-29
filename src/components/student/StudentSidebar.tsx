
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  LayoutDashboard, 
  FileText, 
  Heart, 
  User, 
  Settings, 
  LogOut,
  MessageCircle,
  Bell,
  Home
} from 'lucide-react';

const mainMenuItems = [
  { title: 'Dashboard', url: '/student-dashboard/home', icon: LayoutDashboard },
  { title: 'My Applications', url: '/student-dashboard/applications', icon: FileText },
  { title: 'Saved Courses', url: '/student-dashboard/saved-courses', icon: Heart },
  { title: 'Get Counselling', url: '/student-dashboard/counselling', icon: MessageCircle },
];


export function StudentSidebar() {
  const { state } = useSidebar();
  const { signOut, user } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isCollapsed = state === 'collapsed';

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground font-medium' : 'text-white/90 hover:text-white';

  const handleVisitWebsite = () => {
    window.location.href = '/';
  };

  return (
    <Sidebar className={`${isCollapsed ? 'w-16' : 'w-72'} bg-gradient-primary border-r-0 shadow-brand`} collapsible="icon">
      <div className="h-full flex flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-center">
            <div className="relative">
              <img 
                src="/lovable-uploads/student-dashboard-logo.png" 
                alt="Student Portal Logo" 
                className={`${isCollapsed ? 'w-10 h-10' : 'w-16 h-16'} object-contain transition-all duration-300 drop-shadow-lg`}
              />
              {!isCollapsed && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-accent rounded-full animate-pulse" />
              )}
            </div>
          </div>
          {!isCollapsed && (
            <div className="mt-4 text-center">
              <h2 className="text-xl font-bold text-white">Student Portal</h2>
              <p className="text-sm text-white/80 mt-1">Moves International</p>
            </div>
          )}
        </div>

        <SidebarContent className="flex-1 py-6">
          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-white text-xs uppercase tracking-wider px-4 mb-3">
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2 px-4">
                {mainMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        end 
                        className={({ isActive }) => 
                          `flex items-center px-4 py-3 rounded-xl transition-all duration-300 
                          hover:bg-sidebar-accent hover:shadow-elegant hover:scale-105 
                          ${isActive ? 'bg-sidebar-primary shadow-elegant' : ''} 
                          text-orange relative overflow-hidden`
                        }
                      >
                        <item.icon
                          className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 transition-all duration-300 text-white hover:text-orange-500`}
                        />

                        {!isCollapsed && (
                          <span className="font-medium transition-all duration-300 text-white hover:text-orange-500">
                            {item.title}
                          </span>
                        )}

                        {!isCollapsed && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Visit Website Section */}
        <div className="p-4 border-t border-white/10">
          <SidebarMenuButton 
            onClick={handleVisitWebsite} 
            className="w-full flex items-center px-4 py-3 rounded-xl text-white/90 hover:bg-blue-500/20 hover:text-blue-300 transition-all duration-300 group"
          >
            <Home className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 transition-all duration-300 group-hover:scale-110`} />
            {!isCollapsed && <span className="font-medium">Visit Website</span>}
          </SidebarMenuButton>
        </div>
      </div>
    </Sidebar>
  );
}
