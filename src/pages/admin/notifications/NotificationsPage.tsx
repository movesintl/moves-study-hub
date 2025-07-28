import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Bell, Check, CheckCheck, Trash2, Clock, User, FileText, Phone, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  category: 'application' | 'counselling' | 'system' | 'contact' | 'job_application' | 'general';
  reference_id?: string;
  reference_table?: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

const NotificationsPage: React.FC = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('all');

  const fetchAllNotifications = async () => {
    if (!user) {
      setNotificationsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      setNotifications((data || []) as Notification[]);
    } catch (error) {
      console.error('Error fetching all notifications:', error);
      toast({
        title: "Error",
        description: "Failed to fetch notifications",
        variant: "destructive",
      });
    } finally {
      setNotificationsLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      if (error) throw error;

      setNotifications(prev => 
        prev.map(n => 
          n.id === notificationId ? { ...n, is_read: true } : n
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast({
        title: "Error",
        description: "Failed to mark notification as read",
        variant: "destructive",
      });
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId);

      if (error) throw error;

      setNotifications(prev => prev.filter(n => n.id !== notificationId));
    } catch (error) {
      console.error('Error deleting notification:', error);
      toast({
        title: "Error",
        description: "Failed to delete notification",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchAllNotifications();
  }, [user]);

  const getCategoryIcon = (category: string) => {
    const iconMap = {
      application: FileText,
      counselling: User,
      contact: Phone,
      job_application: Briefcase,
      system: Bell,
      general: Bell,
    };
    
    const IconComponent = iconMap[category as keyof typeof iconMap] || Bell;
    return <IconComponent className="h-5 w-5" />;
  };

  const getTypeColor = (type: string) => {
    const colorMap = {
      info: 'bg-blue-100 text-blue-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
    };
    
    return colorMap[type as keyof typeof colorMap] || 'bg-gray-100 text-gray-800';
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.is_read;
    return notification.category === activeTab;
  });

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const categories = [
    { value: 'all', label: 'All', count: notifications.length },
    { value: 'unread', label: 'Unread', count: unreadCount },
    { value: 'application', label: 'Applications', count: notifications.filter(n => n.category === 'application').length },
    { value: 'counselling', label: 'Counselling', count: notifications.filter(n => n.category === 'counselling').length },
    { value: 'job_application', label: 'Jobs', count: notifications.filter(n => n.category === 'job_application').length },
    { value: 'contact', label: 'Contact', count: notifications.filter(n => n.category === 'contact').length },
  ];

  if (loading || notificationsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading notifications...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">All Notifications</h1>
        <p className="text-gray-600 mt-2">View and manage all system notifications</p>
        {user && <p className="text-xs text-gray-400 mt-1">Admin User: {user.email}</p>}
      </div>
      
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-6 w-6" />
              <span>All System Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount} unread
                </Badge>
              )}
            </CardTitle>
            
            <Button
              variant="outline"
              size="sm"
              onClick={fetchAllNotifications}
              className="flex items-center space-x-1"
            >
              <Bell className="h-4 w-4" />
              <span>Refresh</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 lg:grid-cols-6 mb-6">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.value} 
                  value={category.value}
                  className="flex items-center space-x-1 text-xs"
                >
                  <span>{category.label}</span>
                  {category.count > 0 && (
                    <Badge variant="secondary" className="text-xs h-4 px-1">
                      {category.count}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab}>
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No notifications in this category</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border ${
                        !notification.is_read ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`p-2 rounded-full ${getTypeColor(notification.type)}`}>
                          {getCategoryIcon(notification.category)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-gray-900">
                              {notification.title}
                            </h3>
                            {!notification.is_read && (
                              <div className="h-2 w-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                            )}
                          </div>
                          
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                              <span className="ml-2">• User ID: {notification.user_id.slice(0, 8)}...</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {notification.category.replace('_', ' ')}
                              </Badge>
                              
                              <div className="flex items-center space-x-1">
                                {!notification.is_read && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => markAsRead(notification.id)}
                                    className="h-6 w-6 p-0"
                                    title="Mark as read"
                                  >
                                    <Check className="h-3 w-3" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteNotification(notification.id)}
                                  className="h-6 w-6 p-0 hover:text-red-600"
                                  title="Delete notification"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsPage;