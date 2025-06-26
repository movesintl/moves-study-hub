
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import SecondaryMenu from './navigation/SecondaryMenu';
import NavigationMenu from './navigation/NavigationMenu';
import UserMenu from './navigation/UserMenu';
import MobileMenu from './navigation/MobileMenu';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  // Fetch destinations for the dropdown
  const { data: destinations = [] } = useQuery({
    queryKey: ['destinations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('id, name, slug')
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

  // Main navigation items - filter out destinations without slugs
  const destinationSubmenu = destinations
    .filter(dest => dest.slug && dest.slug.trim() !== '')
    .map(dest => ({
      name: dest.name,
      path: `/destinations/${dest.slug}`
    }));

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Find a Course', path: '/courses' },
    {
      name: 'Destinations',
      path: '/destinations',
      submenu: destinationSubmenu
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
    setIsOpen(false);
  };

  return (
    <>
      {/* Secondary Top Menu */}
      <SecondaryMenu items={secondaryMenuItems} />

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

              {/* Desktop Navigation */}
              <NavigationMenu items={navigationItems} />
            </div>

            {/* Auth section */}
            <div className="hidden md:flex items-center">
              {user ? (
                <UserMenu user={user} onSignOut={handleSignOut} />
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
        <MobileMenu
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          secondaryMenuItems={secondaryMenuItems}
          navigationItems={navigationItems}
          user={user}
          onSignOut={handleSignOut}
        />
      </nav>
    </>
  );
};

export default Navigation;
