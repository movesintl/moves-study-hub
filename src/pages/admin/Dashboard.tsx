import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  BookOpen, 
  Building2, 
  Globe, 
  FileText, 
  Settings, 
  Image,
  Users,
  BarChart3,
  TrendingUp,
  Calendar,
  Award,
  GraduationCap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  // Fetch dynamic counts from the database
  const { data: counts } = useQuery({
    queryKey: ['dashboard-counts'],
    queryFn: async () => {
      const [courses, universities, destinations, services, blogs, studyAreas, studyLevels] = await Promise.all([
        supabase.from('courses').select('id', { count: 'exact', head: true }),
        supabase.from('universities').select('id', { count: 'exact', head: true }),
        supabase.from('destinations').select('id', { count: 'exact', head: true }),
        supabase.from('services').select('id', { count: 'exact', head: true }),
        supabase.from('blogs').select('id', { count: 'exact', head: true }),
        supabase.from('course_study_areas').select('id', { count: 'exact', head: true }),
        supabase.from('course_study_levels').select('id', { count: 'exact', head: true })
      ]);
      
      return {
        courses: courses.count || 0,
        universities: universities.count || 0,
        destinations: destinations.count || 0,
        services: services.count || 0,
        blogs: blogs.count || 0,
        studyAreas: studyAreas.count || 0,
        studyLevels: studyLevels.count || 0
      };
    }
  });

  // Fetch recent activity
  const { data: recentActivity } = useQuery({
    queryKey: ['recent-activity'],
    queryFn: async () => {
      const [recentCourses, recentBlogs] = await Promise.all([
        supabase.from('courses').select('title, created_at').order('created_at', { ascending: false }).limit(3),
        supabase.from('blogs').select('title, created_at').order('created_at', { ascending: false }).limit(3)
      ]);
      
      return {
        courses: recentCourses.data || [],
        blogs: recentBlogs.data || []
      };
    }
  });

  const dashboardItems = [
    {
      title: 'Courses',
      icon: BookOpen,
      description: 'Manage courses and programs',
      link: '/admin/courses',
      count: counts?.courses || 0,
      gradient: 'from-blue-500 to-blue-600',
      subItems: [
        { title: 'Study Areas', link: '/admin/courses/study-areas', count: counts?.studyAreas || 0 },
        { title: 'Study Levels', link: '/admin/courses/study-levels', count: counts?.studyLevels || 0 }
      ]
    },
    {
      title: 'Universities',
      icon: Building2,
      description: 'Manage university listings',
      link: '/admin/universities',
      count: counts?.universities || 0,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Destinations',
      icon: Globe,
      description: 'Manage study destinations',
      link: '/admin/destinations',
      count: counts?.destinations || 0,
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: 'Services',
      icon: Settings,
      description: 'Manage service offerings',
      link: '/admin/services',
      count: counts?.services || 0,
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Blogs',
      icon: FileText,
      description: 'Manage blog posts and articles',
      link: '/admin/blogs',
      count: counts?.blogs || 0,
      gradient: 'from-pink-500 to-pink-600',
      subItems: [
        { title: 'Categories', link: '/admin/blogs/categories' }
      ]
    },
    {
      title: 'Media Library',
      icon: Image,
      description: 'Manage images, PDFs, and videos',
      link: '/admin/media',
      count: '156',
      gradient: 'from-indigo-500 to-indigo-600'
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary to-accent p-8 text-white">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-white/90 text-lg">Manage your educational consultancy website content</p>
        </div>
        <div className="absolute top-0 right-0 opacity-10">
          <GraduationCap size={200} />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 font-medium">Total Courses</p>
                <p className="text-2xl font-bold text-blue-900">{counts?.courses || 0}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 font-medium">Universities</p>
                <p className="text-2xl font-bold text-green-900">{counts?.universities || 0}</p>
              </div>
              <Building2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 font-medium">Blog Posts</p>
                <p className="text-2xl font-bold text-purple-900">{counts?.blogs || 0}</p>
              </div>
              <FileText className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 font-medium">Destinations</p>
                <p className="text-2xl font-bold text-orange-900">{counts?.destinations || 0}</p>
              </div>
              <Globe className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardItems.map((item) => (
          <div key={item.title} className="group">
            <Link to={item.link}>
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${item.gradient}`}></div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${item.gradient} text-white`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <span className="text-3xl font-bold text-gray-900">{item.count}</span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">{item.description}</p>
                  {item.subItems && (
                    <div className="space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.title}
                          to={subItem.link}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-between text-xs text-gray-500 hover:text-primary transition-colors p-2 rounded hover:bg-gray-50"
                        >
                          <span>• {subItem.title}</span>
                          {subItem.count && <span className="font-medium">{subItem.count}</span>}
                        </Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <TrendingUp className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentActivity?.courses.slice(0, 2).map((course, index) => (
                <div key={index} className="flex items-center justify-between text-sm border-b pb-2">
                  <span className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    New course: "{course.title}"
                  </span>
                  <span className="text-gray-500">{formatDate(course.created_at)}</span>
                </div>
              ))}
              {recentActivity?.blogs.slice(0, 2).map((blog, index) => (
                <div key={index} className="flex items-center justify-between text-sm border-b pb-2">
                  <span className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-purple-500" />
                    Blog published: "{blog.title}"
                  </span>
                  <span className="text-gray-500">{formatDate(blog.created_at)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="flex items-center gap-2 text-green-900">
              <Award className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-3">
            <Link to="/admin/courses/new" className="block">
              <div className="flex items-center gap-3 p-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 rounded-lg transition-all text-sm font-medium text-gray-700 hover:text-blue-700">
                <BookOpen className="h-4 w-4" />
                Add New Course
              </div>
            </Link>
            <Link to="/admin/blogs/new" className="block">
              <div className="flex items-center gap-3 p-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 rounded-lg transition-all text-sm font-medium text-gray-700 hover:text-purple-700">
                <FileText className="h-4 w-4" />
                Write New Blog Post
              </div>
            </Link>
            <Link to="/admin/universities/new" className="block">
              <div className="flex items-center gap-3 p-3 hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 rounded-lg transition-all text-sm font-medium text-gray-700 hover:text-green-700">
                <Building2 className="h-4 w-4" />
                Add University
              </div>
            </Link>
            <Link to="/admin/media" className="block">
              <div className="flex items-center gap-3 p-3 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 rounded-lg transition-all text-sm font-medium text-gray-700 hover:text-orange-700">
                <Image className="h-4 w-4" />
                Upload New Media
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
