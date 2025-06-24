
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './sidebar/AdminSidebar';
import AdminHeader from './header/AdminHeader';
import AdminAuthGuard from './AdminAuthGuard';

const AdminLayout = () => {
  return (
    <AdminAuthGuard>
      <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <AdminHeader />

          {/* Content Area */}
          <main className="flex-1 p-8 overflow-y-auto bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 min-h-[600px]">
                <div className="p-8">
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
