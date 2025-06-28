
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { menuItems, MenuItem } from '../config/menuItems';

const AdminSidebar = () => {
  const location = useLocation();
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const toggleSubMenu = (name: string) => {
    setOpenSubMenu(openSubMenu === name ? null : name);
  };

  return (
    <div className="w-72 flex-shrink-0 bg-white border-r border-gray-200 shadow-sm">
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
      <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-5rem)]">
        {menuItems.map((item) => (
          <div key={item.name}>
            {item.subItems ? (
              <div>
                <Button
                  variant="ghost"
                  className="w-full justify-start font-medium text-gray-700 hover:bg-primary/5 hover:text-primary transition-all duration-200 h-11 rounded-lg px-3"
                  onClick={() => toggleSubMenu(item.name)}
                >
                  <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span className="flex-1 text-left truncate">{item.name}</span>
                  {openSubMenu === item.name ? 
                    <ChevronUp className="h-4 w-4 text-gray-400 flex-shrink-0" /> : 
                    <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  }
                </Button>
                {openSubMenu === item.name && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-100 pl-3">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className={`flex items-center p-2 rounded-md text-sm transition-all duration-200 ${
                          location.pathname === subItem.href 
                            ? 'bg-primary text-white shadow-sm' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                        }`}
                      >
                        <div className="w-2 h-2 bg-current rounded-full mr-3 opacity-60 flex-shrink-0"></div>
                        <span className="truncate">{subItem.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={item.href}
                className={`flex items-center p-3 rounded-lg font-medium transition-all duration-200 ${
                  location.pathname === item.href 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-gray-700 hover:bg-primary/5 hover:text-primary'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
