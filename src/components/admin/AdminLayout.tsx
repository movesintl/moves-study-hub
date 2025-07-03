
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './sidebar/AdminSidebar';
import AdminHeader from './header/AdminHeader';
import AdminAuthGuard from './AdminAuthGuard';

const AdminLayout = () => {
  return (
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <AdminHeader />

          {/* Content Area */}
          <main className="flex-1 overflow-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
};

export default AdminLayout;
