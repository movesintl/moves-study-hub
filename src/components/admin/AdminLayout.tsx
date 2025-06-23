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
  Users
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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 bg-sidebar border-r border-gray-200">
        <div className="h-16 flex items-center justify-center bg-sidebar-primary text-sidebar-primary-foreground font-bold text-lg">
          Admin Panel
        </div>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            item.subItems ? (
              <div key={item.name}>
                <Button
                  variant="ghost"
                  className="w-full justify-start font-normal"
                  onClick={() => toggleSubMenu(item.name)}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                  {openSubMenu === item.name ? <ChevronUp className="h-4 w-4 ml-auto" /> : <ChevronDown className="h-4 w-4 ml-auto" />}
                </Button>
                {openSubMenu === item.name && (
                  <div className="pl-4 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className={`flex items-center p-2 rounded-md hover:bg-gray-100 ${location.pathname === subItem.href ? 'font-medium bg-gray-100' : ''}`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center p-2 rounded-md hover:bg-gray-100 ${location.pathname === item.href ? 'font-medium bg-gray-100' : ''}`}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.name}
              </Link>
            )
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between bg-white border-b border-gray-200 p-4">
          <div className="flex items-center">
            <button className="md:hidden mr-4">
              {/* Add a hamburger menu icon here for mobile */}
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold">
              {menuItems.find(item => item.href === location.pathname)?.name || 'Dashboard'}
            </h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Shadcn" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate('/admin/profile')}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/admin/settings')}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/auth')}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
