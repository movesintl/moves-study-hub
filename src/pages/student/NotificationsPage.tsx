import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import NotificationCenter from '@/components/notifications/NotificationCenter';

const NotificationsPage: React.FC = () => {
  const { user } = useAuth();
  
  console.log('NotificationsPage rendered, user:', user);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-600 mt-2">Stay updated with your application status and announcements</p>
        {user && <p className="text-xs text-gray-400 mt-1">User: {user.email}</p>}
      </div>
      
      <NotificationCenter />
    </div>
  );
};

export default NotificationsPage;