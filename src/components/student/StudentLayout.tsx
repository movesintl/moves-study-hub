
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { StudentSidebar } from './StudentSidebar';
import StudentHeader from './StudentHeader';

interface StudentLayoutProps {
  children?: React.ReactNode;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-dashboard">
        <StudentSidebar />
        <div className="flex-1 flex flex-col">
          <StudentHeader />
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
