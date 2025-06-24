
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
  const [findUsOpen, setFindUsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

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
                    onMouseEnter={() => setFindUsOpen(true)}
                    onMouseLeave={() => setFindUsOpen(false)}
                  >
                    <button className="flex items-center text-sm text-white hover:text-gray-200 transition-colors">
                      {item.name}
                      <ChevronDown className="ml-1 h-3 w-3" />
                    </button>
                    {findUsOpen && (
                      <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-[100]">
                        {item.submenu.map((subItem) =>
                          subItem.external ? (
                            <a
                              key={subItem.name}
                              href={subItem.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
                            >
                              {subItem.name}
                            </a>
                          ) : (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
                            >
                              {subItem.name}
                            </Link>
                          )
                        )}
                      </div>
                    )}
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
