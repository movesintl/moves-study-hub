
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

interface NavigationItem {
  name: string;
  path: string;
  submenu?: Array<{
    name: string;
    path: string;
  }>;
  isButton?: boolean;
}

interface NavigationMenuProps {
  items: NavigationItem[];
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ items }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  
  const isParentActive = (item: NavigationItem) => {
    // Check if current path matches the main item path
    if (location.pathname === item.path) return true;
    
    // Check if current path matches any submenu item path
    if (item.submenu) {
      return item.submenu.some(subItem => location.pathname === subItem.path);
    }
    
    // For destinations, check if we're on any destination page
    if (item.path === '/destinations' && location.pathname.startsWith('/destinations/')) {
      return true;
    }
    
    // For services, check if we're on any service page
    if (item.path === '/services' && location.pathname.startsWith('/services/')) {
      return true;
    }
    
    // For events, check if we're on any event page
    if (item.path === '/events' && location.pathname.startsWith('/events/')) {
      return true;
    }
    
    return false;
  };

  const handleMouseEnter = (itemName: string) => {
    setOpenDropdown(itemName);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <div className="hidden md:flex  items-center space-x-6">
      {items.map((item) => (
        <div key={item.name} className="relative">
          {item.submenu && item.submenu.length > 0 ? (
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              <button className={`flex items-center text-gray-700 hover:text-primary transition-all duration-300 font-medium px-3 py-2 rounded-md hover:bg-gray-50 group ${
                isParentActive(item) ? 'text-primary font-semibold' : ''
              }`}>
                {item.name}
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                  openDropdown === item.name ? 'rotate-180' : ''
                }`} />
              </button>
              
              {/* Active indicator for parent menu item */}
              {isParentActive(item) && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-fade-in"></div>
              )}
              
              {/* Dropdown Menu */}
              <div className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-2xl border border-gray-200 z-[9999] transition-all duration-300 transform backdrop-blur-sm ${
                openDropdown === item.name 
                  ? 'opacity-100 translate-y-0 visible' 
                  : 'opacity-0 -translate-y-2 invisible'
              }`} style={{ backgroundColor: 'rgba(255, 255, 255, 0.98)' }}>
                {/* Arrow pointing up */}
                <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45" style={{ backgroundColor: 'rgba(255, 255, 255, 0.98)' }}></div>
                
                <div className="py-2">
                  {item.submenu.map((subItem, index) => (
                    <Link
                      key={subItem.name}
                      to={subItem.path}
                      className={`block px-4 py-3 text-sm transition-all duration-200 hover:translate-x-1 ${
                        isActive(subItem.path)
                          ? 'bg-gradient-to-r from-primary/10 to-accent/10 text-primary font-medium border-r-2 border-primary'
                          : 'text-gray-700 hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 hover:text-primary'
                      } ${
                        index === 0 ? 'rounded-t-lg' : ''
                      } ${
                        index === item.submenu!.length - 1 ? 'rounded-b-lg' : ''
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{subItem.name}</span>
                        <div className={`h-0.5 bg-primary transition-all duration-300 ${
                          isActive(subItem.path) ? 'w-4' : 'w-0 group-hover:w-4'
                        }`}></div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : item.isButton ? (
            <Link
              to={item.path}
              className="bg-[#fa8500] hover:bg-[#fa8500]/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
            >
              {item.name}
            </Link>
          ) : (
            <Link
              to={item.path}
              className={`text-gray-700 hover:text-primary transition-all duration-300 px-3 py-2 rounded-md text-sm font-medium relative overflow-hidden group ${
                isActive(item.path)
                  ? 'text-primary font-semibold'
                  : ''
              }`}
            >
              <span className="relative z-10">{item.name}</span>
              {isActive(item.path) && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-fade-in"></div>
              )}
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default NavigationMenu;
