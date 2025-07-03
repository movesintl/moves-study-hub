
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
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-none mx-auto">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[calc(100vh-8rem)]">
                <div className="p-6">
                  <Outlet />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
};

export default AdminLayout;
