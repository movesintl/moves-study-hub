
import React, { useState } from 'react';
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const [findUsOpen, setFindUsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  // Fetch destinations for the dropdown
  const { data: destinations = [] } = useQuery({
    queryKey: ['destinations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('id, name')
        .order('name');
      if (error) throw error;
      return data;
    }
  });

  // Secondary menu items (top menu)
  const secondaryMenuItems = [
    { name: 'About Us', path: '/about' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Contact', path: '/contact' },
    {
      name: 'Our Offices',
      submenu: [
        {
          name: 'Bangladesh Office',
          path: 'https://www.movesinternational.com.bd',
          external: true
        },
        {
          name: 'Australian Office',
          path: 'https://www.movesinternational.com.au',
          external: true
        }
      ]
    }
  ];

  // Main navigation items (updated without About Us, Blogs, Contact)
  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Find a Course', path: '/courses' },
    {
      name: 'Destinations',
      path: '/destinations',
      submenu: destinations.map(dest => ({
        name: dest.name,
        path: `/destinations/${dest.id}`
      }))
    },
    {
      name: 'Services',
      path: '/services',
      submenu: [
        { name: 'All Services', path: '/services' },
        { name: 'Consultation', path: '/services/consultation' },
        { name: 'Visa & Migration', path: '/services/visa-migration' },
        { name: 'English Test Prep', path: '/services/english-test-prep' },
        { name: 'Application Assistance', path: '/services/application-assistance' },
        { name: 'Scholarship Guidance', path: '/services/scholarship-guidance' },
        { name: 'Pre-Departure Support', path: '/services/pre-departure-support' }
      ]
    }
  ];

  const handleSignOut = async () => {
    await signOut();
    // The AuthContext now handles the redirect, so we don't need to do anything here
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  return (
    <>
      {/* Secondary Top Menu */}
      <div className="border-b border-gray-200 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end h-10">
            <div className="hidden md:flex items-center space-x-6">
              {secondaryMenuItems.map((item) => (
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
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
                              >
                                {subItem.name}
                              </a>
                            ) : (
                              <Link
                                key={subItem.name}
                                to={subItem.path}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
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
                      to={item.path}
                      className={`text-sm text-white hover:text-gray-200 transition-colors ${
                        isActive(item.path) ? 'text-gray-200 font-medium' : ''
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

      {/* Main Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <img
                  src="/lovable-uploads/abcbb2a1-5db8-45ce-8215-42e053f17039.png"
                  alt="Moves International"
                  className="h-10 w-auto"
                />
              </Link>

              {/* Desktop Navigation - moved closer to logo */}
              <div className="hidden md:flex items-center space-x-6">
                {navigationItems.map((item) => (
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
                        <button className="flex items-center text-gray-700 hover:text-primary transition-colors">
                          {item.name}
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </button>
                        {((item.name === 'Services' && servicesOpen) ||
                          (item.name === 'Destinations' && destinationsOpen)) && (
                          <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-[60]">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.path}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
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
            </div>

            {/* Auth buttons - kept on the right */}
            <div className="hidden md:flex items-center">
              {user ? (
                <div className="flex items-center space-x-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" alt={user.email} />
                          <AvatarFallback className="bg-primary text-white">
                            {getUserInitials()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
                      <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1 leading-none">
                          <p className="font-medium">{user.email}</p>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/student-dashboard" className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/student-dashboard/profile" className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut} className="flex items-center">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign Out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Button variant="outline" asChild>
                    <Link to="/auth">Sign In</Link>
                  </Button>
                  <Button className="bg-accent hover:bg-accent/90 text-white" asChild>
                    <Link to="/services/consultation">Book Consultation</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-primary"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
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
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.submenu && (
                      <div className="ml-4 space-y-1">
                        {item.submenu.map((subItem) =>
                          subItem.external ? (
                            <a
                              key={subItem.name}
                              href={subItem.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-3 py-2 text-sm text-gray-600 hover:text-primary"
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem.name}
                            </a>
                          ) : (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              className="block px-3 py-2 text-sm text-gray-600 hover:text-primary"
                              onClick={() => setIsOpen(false)}
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
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <div className="ml-4 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-primary"
                          onClick={() => setIsOpen(false)}
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
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/student-dashboard/profile"
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Profile
                    </Link>
                    <Button onClick={handleSignOut} variant="outline" className="w-full">
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
        )}
      </nav>
    </>
  );
};

export default Navigation;
