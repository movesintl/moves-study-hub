
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

interface SecondaryMenuProps {
  items: Array<{
    name: string;
    path?: string;
    submenu?: Array<{
      name: string;
      path: string;
      external?: boolean;
    }>;
  }>;
}

const SecondaryMenu: React.FC<SecondaryMenuProps> = ({ items }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleMouseEnter = (itemName: string) => {
    setOpenDropdown(itemName);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <div className="border-b border-gray-200 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end h-10">
          <div className="hidden md:flex items-center space-x-6">
            {items.map((item) => (
              <div key={item.name} className="relative">
                {item.submenu ? (
                  <div
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button className="flex items-center text-sm text-white hover:text-gray-200 transition-all duration-300">
                      {item.name}
                      <ChevronDown className={`ml-1 h-3 w-3 transition-transform duration-300 ${
                        openDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className={`absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 z-[100] transition-all duration-300 transform ${
                      openDropdown === item.name 
                        ? 'opacity-100 translate-y-0 visible' 
                        : 'opacity-0 -translate-y-2 invisible'
                    }`}>
                      {/* Arrow pointing up */}
                      <div className="absolute -top-2 right-6 w-4 h-4 bg-white border-l border-t border-gray-100 transform rotate-45"></div>
                      
                      <div className="py-2">
                        {item.submenu.map((subItem, index) => (
                          subItem.external ? (
                            <a
                              key={subItem.name}
                              href={subItem.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`block px-4 py-3 text-sm transition-all duration-200 hover:translate-x-1 text-gray-700 hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 hover:text-primary ${
                                index === 0 ? 'rounded-t-lg' : ''
                              } ${
                                index === item.submenu!.length - 1 ? 'rounded-b-lg' : ''
                              }`}
                              style={{ animationDelay: `${index * 50}ms` }}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{subItem.name}</span>
                                <div className="h-0.5 bg-primary transition-all duration-300 w-0 group-hover:w-4"></div>
                              </div>
                            </a>
                          ) : (
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
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.path!}
                    className={`text-sm text-white hover:text-gray-200 transition-colors ${
                      isActive(item.path!) ? 'text-gray-200 font-medium' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryMenu;
