
import React, { useState } from 'react';
import {
  Home,
  BookOpen,
  Building2,
  MapPin,
  Settings,
  FileText,
  Image,
  ChevronDown,
  ChevronUp,
  Users,
  LogOut
} from 'lucide-react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const menuItems = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { 
    name: 'Courses', 
    href: '/admin/courses', 
    icon: BookOpen,
    subItems: [
      { name: 'All Courses', href: '/admin/courses' },
      { name: 'Study Areas', href: '/admin/courses/study-areas' },
      { name: 'Study Levels', href: '/admin/courses/study-levels' }
    ]
  },
  { name: 'Universities', href: '/admin/universities', icon: Building2 },
  { name: 'Destinations', href: '/admin/destinations', icon: MapPin },
  { name: 'Services', href: '/admin/services', icon: Settings },
  { 
    name: 'Blogs', 
    href: '/admin/blogs', 
    icon: FileText,
    subItems: [
      { name: 'All Blogs', href: '/admin/blogs' },
      { name: 'Categories', href: '/admin/blogs/categories' }
    ]
  },
  { name: 'Media Library', href: '/admin/media', icon: Image },
  { name: 'Team', href: '/admin/team', icon: Users }
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const toggleSubMenu = (name: string) => {
    setOpenSubMenu(openSubMenu === name ? null : name);
  };

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

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <div className="w-72 flex-shrink-0 bg-white border-r border-gray-200 shadow-lg">
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-center bg-gradient-to-r from-primary to-primary/90 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Admin Panel</h1>
              <p className="text-xs text-white/80">Moves International</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-6 space-y-2">
          {menuItems.map((item) => (
            <div key={item.name}>
              {item.subItems ? (
                <div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-medium text-gray-700 hover:bg-primary/5 hover:text-primary transition-all duration-200 h-12 rounded-xl"
                    onClick={() => toggleSubMenu(item.name)}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span className="flex-1 text-left">{item.name}</span>
                    {openSubMenu === item.name ? 
                      <ChevronUp className="h-4 w-4 text-gray-400" /> : 
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    }
                  </Button>
                  {openSubMenu === item.name && (
                    <div className="ml-6 mt-2 space-y-1 border-l-2 border-gray-100 pl-4">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className={`flex items-center p-3 rounded-lg text-sm transition-all duration-200 ${
                            location.pathname === subItem.href 
                              ? 'bg-primary text-white shadow-md' 
                              : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                          }`}
                        >
                          <div className="w-2 h-2 bg-current rounded-full mr-3 opacity-60"></div>
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.href}
                  className={`flex items-center p-3 rounded-xl font-medium transition-all duration-200 ${
                    location.pathname === item.href 
                      ? 'bg-primary text-white shadow-lg transform scale-[1.02]' 
                      : 'text-gray-700 hover:bg-primary/5 hover:text-primary hover:transform hover:scale-[1.01]'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
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
                <DropdownMenuItem onClick={() => navigate('/auth')} className="cursor-pointer hover:bg-red-50 text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-y-auto bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 min-h-[600px]">
              <div className="p-8">
                <Outlet />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
