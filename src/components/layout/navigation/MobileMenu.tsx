
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  secondaryMenuItems: any[];
  navigationItems: any[];
  user: any;
  onSignOut: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  secondaryMenuItems,
  navigationItems,
  user,
  onSignOut
}) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [openSubmenus, setOpenSubmenus] = useState<{[key: string]: boolean}>({});

  const toggleSubmenu = (itemName: string) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const getUserInitials = () => {
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="bg-white border-t max-h-[calc(100vh-64px)]">
        <ScrollArea className="h-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Secondary menu items in mobile */}
            <div className="border-b border-gray-200 pb-2 mb-2">
              {secondaryMenuItems.map((item) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() => toggleSubmenu(`secondary-${item.name}`)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium ${
                          isActive(item.path)
                            ? 'text-primary bg-gray-100'
                            : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                        }`}
                      >
                        <span>{item.name}</span>
                        {openSubmenus[`secondary-${item.name}`] ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      {openSubmenus[`secondary-${item.name}`] && (
                        <div className="ml-4 space-y-1 mt-1">
                          {item.submenu.map((subItem: any) =>
                            subItem.external ? (
                              <a
                                key={subItem.name}
                                href={subItem.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md"
                                onClick={onClose}
                              >
                                {subItem.name}
                              </a>
                            ) : (
                              <Link
                                key={subItem.name}
                                to={subItem.path}
                                className="block px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md"
                                onClick={onClose}
                              >
                                {subItem.name}
                              </Link>
                            )
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`block px-3 py-2 rounded-md text-sm font-medium ${
                        isActive(item.path)
                          ? 'text-primary bg-gray-100'
                          : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                      }`}
                      onClick={onClose}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Main navigation items in mobile */}
            {navigationItems.map((item) => (
              <div key={item.name}>
                {item.isButton ? (
                  <Link
                    to={item.path}
                    className="block mx-3 my-2 px-4 py-3 rounded-md text-center text-white bg-[#fa8500] hover:bg-[#fa8500]/90 font-medium"
                    onClick={onClose}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <>
                    {item.submenu ? (
                      <>
                        <button
                          onClick={() => toggleSubmenu(`main-${item.name}`)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium ${
                            isActive(item.path)
                              ? 'text-primary bg-gray-100'
                              : 'text-gray-700 hover:text-primary hover:bg-gray-100'
                          }`}
                        >
                          <span>{item.name}</span>
                          {openSubmenus[`main-${item.name}`] ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                        {openSubmenus[`main-${item.name}`] && (
                          <div className="ml-4 space-y-1 mt-1">
                            {item.submenu.map((subItem: any) => (
                              <Link
                                key={subItem.name}
                                to={subItem.path}
                                className="block px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md"
                                onClick={onClose}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        to={item.path}
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          isActive(item.path)
                            ? 'text-primary bg-gray-100'
                            : 'text-gray-700 hover:text-primary hover:bg-gray-100'
                        }`}
                        onClick={onClose}
                      >
                        {item.name}
                      </Link>
                    )}
                  </>
                )}
              </div>
            ))}

            <div className="px-3 py-2 space-y-2">
              {user ? (
                <>
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt={user.email} />
                      <AvatarFallback className="bg-primary text-white">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user.email}</span>
                  </div>
                  <Link
                    to="/student-dashboard"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-primary"
                    onClick={onClose}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/student-dashboard/profile"
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-primary"
                    onClick={onClose}
                  >
                    Profile
                  </Link>
                  <Button onClick={onSignOut} variant="outline" className="w-full">
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/auth">Sign In</Link>
                  </Button>
                  <Button
                    className="w-full bg-[#fa8500] hover:bg-[#fa8500]/90 text-white"
                    asChild
                  >
                    <Link to="/consultation">Book Consultation</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default MobileMenu;
