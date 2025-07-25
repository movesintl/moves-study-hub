import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, ChevronDown, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import NotificationDropdown from '@/components/notifications/NotificationDropdown';

const StudentHeader = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const { data } = await supabase
          .from('user_profiles')
          .select('role')
          .eq('user_id', user.id)
          .single();
        
        setUserProfile(data);
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
  };

  const getUserInitials = () => {
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return 'ST';
  };

  const getUserDisplayName = () => {
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'Student';
  };

  return (
    <header className="h-20 glass border-b border-white/10 flex items-center justify-between px-8 backdrop-blur-xl">
      {/* Left side - Sidebar trigger and Dashboard title */}
      <div className="flex items-center space-x-4">
        <SidebarTrigger className="text-primary hover:bg-white/10 rounded-lg p-2 transition-all duration-200" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Student Dashboard
        </h1>
      </div>

      {/* Right side - Notifications, Settings, and User */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <NotificationDropdown />

        {/* Settings */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/student-dashboard/settings')}
          className="relative hover:bg-white/10 rounded-full text-gray-600 hover:text-gray-900"
        >
          <Settings className="h-5 w-5" />
        </Button>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-3 hover:bg-white/10 rounded-full p-2">
              <Avatar className="h-8 w-8 border-2 border-primary/20">
                <AvatarImage src="" alt="Student" />
                <AvatarFallback className="bg-primary text-white font-semibold text-xs">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium text-gray-900">{getUserDisplayName()}</p>
                <p className="text-xs text-gray-500">Student</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent 
            align="end" 
            className="w-56 bg-white border border-gray-200 shadow-lg rounded-xl z-50"
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{getUserDisplayName()}</p>
              <p className="text-xs text-gray-500">{user?.email || 'No email'}</p>
            </div>
            
            <DropdownMenuItem 
              onClick={() => navigate('/student-dashboard/profile')} 
              className="cursor-pointer hover:bg-gray-50"
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              onClick={() => navigate('/student-dashboard/settings')} 
              className="cursor-pointer hover:bg-gray-50"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem 
              onClick={handleSignOut} 
              className="cursor-pointer hover:bg-red-50 text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default StudentHeader;