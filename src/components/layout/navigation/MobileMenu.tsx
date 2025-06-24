
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

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

  const getUserInitials = () => {
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
        {/* Secondary menu items in mobile */}
        <div className="border-b border-gray-200 pb-2 mb-2">
          {secondaryMenuItems.map((item) => (
            <div key={item.name}>
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
              {item.submenu && (
                <div className="ml-4 space-y-1">
                  {item.submenu.map((subItem: any) =>
                    subItem.external ? (
                      <a
                        key={subItem.name}
                        href={subItem.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-primary"
                        onClick={onClose}
                      >
                        {subItem.name}
                      </a>
                    ) : (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-primary"
                        onClick={onClose}
                      >
                        {subItem.name}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main navigation items in mobile */}
        {navigationItems.map((item) => (
          <div key={item.name}>
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
            {item.submenu && (
              <div className="ml-4 space-y-1">
                {item.submenu.map((subItem: any) => (
                  <Link
                    key={subItem.name}
                    to={subItem.path}
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-primary"
                    onClick={onClose}
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
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
                className="w-full bg-accent hover:bg-accent/90 text-white"
                asChild
              >
                <Link to="/services/consultation">Book Consultation</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
