
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
import { 
  LayoutDashboard, 
  FileText, 
  Heart, 
  User, 
  Settings, 
  LogOut,
  MessageCircle
} from 'lucide-react';

const menuItems = [
  { title: 'Dashboard', url: '/student-dashboard/home', icon: LayoutDashboard },
  { title: 'My Applications', url: '/student-dashboard/applications', icon: FileText },
  { title: 'Saved Courses', url: '/student-dashboard/saved-courses', icon: Heart },
  { title: 'Get Counselling', url: '/student-dashboard/counselling', icon: MessageCircle },
  { title: 'Profile', url: '/student-dashboard/profile', icon: User },
  { title: 'Settings', url: '/student-dashboard/settings', icon: Settings },
];

export function StudentSidebar() {
  const { state } = useSidebar();
  const { signOut } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isCollapsed = state === 'collapsed';

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'bg-muted text-primary font-medium' : 'hover:bg-muted/50';

  const handleSignOut = async () => {
    await signOut();
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
              <h2 className="text-xl font-bold text-sidebar-foreground">Student Portal</h2>
              <p className="text-sm text-sidebar-foreground/70 mt-1">Academic Excellence</p>
            </div>
          )}
        </div>

        <SidebarContent className="flex-1 py-6">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2 px-4">
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        end 
                        className={({ isActive }) => 
                          `${getNavCls({ isActive })} 
                          flex items-center px-4 py-3 rounded-xl transition-all duration-300 
                          hover:bg-sidebar-accent hover:shadow-elegant hover:scale-105
                          ${isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-elegant' : 'text-sidebar-foreground/80'}
                          group relative overflow-hidden`
                        }
                      >
                        <item.icon className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 transition-all duration-300 group-hover:scale-110`} />
                        {!isCollapsed && (
                          <span className="font-medium transition-all duration-300">{item.title}</span>
                        )}
                        {!isCollapsed && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Sign Out Section */}
        <div className="p-4 border-t border-white/10">
          <SidebarMenuButton 
            onClick={handleSignOut} 
            className="w-full flex items-center px-4 py-3 rounded-xl text-sidebar-foreground/80 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 group"
          >
            <LogOut className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 transition-all duration-300 group-hover:scale-110`} />
            {!isCollapsed && <span className="font-medium">Sign Out</span>}
          </SidebarMenuButton>
        </div>
      </div>
    </Sidebar>
  );
}
