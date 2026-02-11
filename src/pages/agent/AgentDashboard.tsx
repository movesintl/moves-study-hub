import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Users, FileText, BookOpen, Building2, Home, LogOut, User } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/agent', icon: Home },
  { name: 'My Students', href: '/agent/students', icon: Users },
  { name: 'Applications', href: '/agent/applications', icon: FileText },
  { name: 'Browse Courses', href: '/agent/courses', icon: BookOpen },
  { name: 'Universities', href: '/agent/universities', icon: Building2 },
];

const AgentDashboard = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 bg-white border-r border-gray-200">
        <div className="h-16 flex items-center justify-center bg-gradient-to-r from-primary to-primary/90 text-white px-4">
          <div>
            <h1 className="font-bold text-lg">Agent Portal</h1>
            <p className="text-xs text-white/80">Moves International</p>
          </div>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center p-3 rounded-lg font-medium transition-all duration-200 ${
                location.pathname === item.href
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-700 hover:bg-primary/5 hover:text-primary'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 w-64 p-4 border-t">
          <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
            <User className="h-4 w-4" />
            <span className="truncate">{user?.email}</span>
          </div>
          <Button variant="outline" size="sm" onClick={signOut} className="w-full">
            <LogOut className="h-4 w-4 mr-2" />Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
