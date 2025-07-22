
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { StudentSidebar } from './StudentSidebar';

interface StudentLayoutProps {
  children?: React.ReactNode;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-dashboard">
        <StudentSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-20 glass border-b border-white/10 flex items-center px-8 backdrop-blur-xl">
            <SidebarTrigger className="text-primary hover:bg-white/10 rounded-lg p-2 transition-all duration-200" />
            <div className="ml-6">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Student Portal
              </h1>
              <p className="text-sm text-muted-foreground">Manage your academic journey</p>
            </div>
          </header>
          <main className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              {children || <Outlet />}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default StudentLayout;
