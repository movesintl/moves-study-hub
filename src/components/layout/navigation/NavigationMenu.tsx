
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
}

interface NavigationMenuProps {
  items: NavigationItem[];
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ items }) => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="hidden md:flex items-center space-x-6">
      {items.map((item) => (
        <div key={item.name} className="relative">
          {item.submenu ? (
            <div
              className="relative"
              onMouseEnter={() => {
                if (item.name === 'Services') setServicesOpen(true);
                if (item.name === 'Destinations') setDestinationsOpen(true);
              }}
              onMouseLeave={() => {
                if (item.name === 'Services') setServicesOpen(false);
                if (item.name === 'Destinations') setDestinationsOpen(false);
              }}
            >
              <button className="flex items-center text-gray-700 hover:text-primary transition-colors font-medium">
                {item.name}
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {((item.name === 'Services' && servicesOpen) ||
                (item.name === 'Destinations' && destinationsOpen)) && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-[60]">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.path}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors first:rounded-t-md last:rounded-b-md"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              to={item.path}
              className={`text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium ${
                isActive(item.path)
                  ? 'text-primary font-semibold border-b-2 border-primary'
                  : ''
              }`}
            >
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default NavigationMenu;
