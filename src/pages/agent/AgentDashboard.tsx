import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Users, FileText, BookOpen, Building2, Home, LogOut, User, Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-[260px] flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0",
        "bg-gradient-to-b from-primary via-primary to-[hsl(195,100%,10%)]",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="px-5 pt-6 pb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shadow-lg">
                <span className="text-accent-foreground font-extrabold text-sm">M</span>
              </div>
              <div className="leading-tight">
                <p className="font-bold text-sm text-primary-foreground">Moves International</p>
                <p className="text-[11px] text-primary-foreground/60">Agent Portal</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-primary-foreground/60 hover:text-primary-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-semibold text-primary-foreground/40 uppercase tracking-widest px-3 mb-2">Menu</p>
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 group",
                  isActive
                    ? "bg-accent text-accent-foreground shadow-lg shadow-accent/30"
                    : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                )}
              >
                <item.icon className={cn("h-[18px] w-[18px] flex-shrink-0", isActive && "drop-shadow-sm")} />
                <span className="flex-1">{item.name}</span>
                {isActive && <ChevronRight className="h-3.5 w-3.5 opacity-70" />}
              </Link>
            );
          })}
        </nav>

        {/* User footer */}
        <div className="p-4 mt-auto">
          <div className="rounded-xl bg-primary-foreground/10 backdrop-blur-sm p-3 mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <User className="h-3.5 w-3.5 text-accent" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-primary-foreground truncate">{user?.email}</p>
                <p className="text-[10px] text-primary-foreground/50">Agent</p>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={signOut}
            className="w-full justify-start text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 gap-2 text-xs"
          >
            <LogOut className="h-3.5 w-3.5" />Sign Out
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 flex items-center gap-4 px-4 lg:px-8 border-b border-border bg-card sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-muted-foreground hover:text-foreground">
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <h2 className="text-sm font-semibold text-foreground">
              {navItems.find(i => i.href === location.pathname)?.name || 'Agent Portal'}
            </h2>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-muted/30">
          <div className="p-4 lg:p-8 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgentDashboard;
