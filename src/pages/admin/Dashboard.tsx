
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Building2, 
  Globe, 
  FileText, 
  Settings, 
  Image,
  Users,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const dashboardItems = [
    {
      title: 'Courses',
      icon: BookOpen,
      description: 'Manage courses and programs',
      link: '/admin/courses',
      count: '42'
    },
    {
      title: 'Universities',
      icon: Building2,
      description: 'Manage university listings',
      link: '/admin/universities',
      count: '18'
    },
    {
      title: 'Destinations',
      icon: Globe,
      description: 'Manage study destinations',
      link: '/admin/destinations',
      count: '12'
    },
    {
      title: 'Services',
      icon: Settings,
      description: 'Manage service offerings',
      link: '/admin/services',
      count: '6'
    },
    {
      title: 'Blogs',
      icon: FileText,
      description: 'Manage blog posts and articles',
      link: '/admin/blogs',
      count: '24'
    },
    {
      title: 'Media Library',
      icon: Image,
      description: 'Manage images, PDFs, and videos',
      link: '/admin/media',
      count: '156'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your educational consultancy website content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardItems.map((item) => (
          <Link key={item.title} to={item.link}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <item.icon className="h-8 w-8 text-primary" />
                  <span className="text-2xl font-bold text-gray-900">{item.count}</span>
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>New course added: "Master of Computer Science"</span>
                <span className="text-gray-500">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Blog post published: "Study in Australia Guide"</span>
                <span className="text-gray-500">5 hours ago</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>New university added: "University of Melbourne"</span>
                <span className="text-gray-500">1 day ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link to="/admin/courses/new" className="block">
              <div className="p-2 hover:bg-gray-50 rounded text-sm">+ Add New Course</div>
            </Link>
            <Link to="/admin/blogs/new" className="block">
              <div className="p-2 hover:bg-gray-50 rounded text-sm">+ Write New Blog Post</div>
            </Link>
            <Link to="/admin/universities/new" className="block">
              <div className="p-2 hover:bg-gray-50 rounded text-sm">+ Add University</div>
            </Link>
            <Link to="/admin/media" className="block">
              <div className="p-2 hover:bg-gray-50 rounded text-sm">+ Upload New Media</div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
