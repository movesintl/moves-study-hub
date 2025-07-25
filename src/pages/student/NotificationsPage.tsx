import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import NotificationCenter from '@/components/notifications/NotificationCenter';

const NotificationsPage: React.FC = () => {
  const { user, loading, session } = useAuth();
  
  console.log('Student NotificationsPage rendered, user:', user);
  console.log('Student NotificationsPage loading:', loading);
  console.log('Student NotificationsPage session:', session);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading user information...</div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-600 mt-2">Stay updated with your application status and announcements</p>
        {user && <p className="text-xs text-gray-400 mt-1">User: {user.email} (ID: {user.id})</p>}
        {!user && <p className="text-xs text-red-500 mt-1">No user found - please log in</p>}
      </div>
      
      <NotificationCenter />
    </div>
  );
};

export default NotificationsPage;