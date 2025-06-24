import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Users, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';
import { menuItems } from '../config/menuItems';

const AdminHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();

  const getCurrentPageTitle = () => {
    const currentItem = menuItems.find(item => {
      if (item.subItems) {
        return item.subItems.some(subItem => subItem.href === location.pathname);
      }
      return item.href === location.pathname;
    });
    
    if (currentItem?.subItems) {
      const subItem = currentItem.subItems.find(sub => sub.href === location.pathname);
      return subItem?.name || currentItem.name;
    }
    
    return currentItem?.name || 'Dashboard';
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="h-20 flex items-center justify-between bg-white/80 backdrop-blur-sm border-b border-gray-200 px-8 shadow-sm">
      <div className="flex items-center space-x-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {getCurrentPageTitle()}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your {getCurrentPageTitle().toLowerCase()}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Notification Bell */}
        <Button variant="ghost" size="icon" className="relative hover:bg-gray-100 rounded-full">
          <div className="w-10 h-10 flex items-center justify-center">
            <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
          </div>
        </Button>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-3 hover:bg-gray-100 rounded-full p-2">
              <Avatar className="h-10 w-10 border-2 border-primary/20">
                <AvatarImage src="https://github.com/shadcn.png" alt="Admin" />
                <AvatarFallback className="bg-primary text-white font-semibold">AD</AvatarFallback>
              </Avatar>
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200 shadow-lg rounded-xl">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@movesinternational.com</p>
            </div>
            <DropdownMenuItem onClick={() => navigate('/admin/profile')} className="cursor-pointer hover:bg-gray-50">
              <Users className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/admin/settings')} className="cursor-pointer hover:bg-gray-50">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer hover:bg-red-50 text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminHeader;
