
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { FileText, Heart, User, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Application {
  id: string;
  status: string;
  created_at: string;
  courses?: { title: string };
  universities?: { name: string };
}

interface SavedCourse {
  id: string;
  courses: {
    title: string;
    university: string;
    country: string;
  };
}

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [savedCourses, setSavedCourses] = useState<SavedCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Fetch recent applications
      const { data: applicationsData, error: applicationsError } = await supabase
        .from('applications')
        .select(`
          id,
          status,
          created_at,
          courses(title),
          universities(name)
        `)
        .eq('student_email', user?.email)
        .order('created_at', { ascending: false })
        .limit(5);

      if (applicationsError) throw applicationsError;
      setApplications(applicationsData || []);

      // Fetch saved courses
      const { data: savedCoursesData, error: savedCoursesError } = await supabase
        .from('saved_courses')
        .select(`
          id,
          courses(title, university, country)
        `)
        .eq('user_id', user?.id)
        .limit(5);

      if (savedCoursesError) throw savedCoursesError;
      setSavedCourses(savedCoursesData || []);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = [
    {
      title: 'Total Applications',
      value: applications.length,
      icon: FileText,
      description: 'Applications submitted',
    },
    {
      title: 'Under Review',
      value: applications.filter(app => app.status === 'under_review').length,
      icon: TrendingUp,
      description: 'Applications being reviewed',
    },
    {
      title: 'Saved Courses',
      value: savedCourses.length,
      icon: Heart,
      description: 'Courses in your wishlist',
    },
  ];

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {user?.email}!</h1>
        <p className="text-gray-600">Here's an overview of your application progress</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Applications</CardTitle>
              <Button asChild variant="outline" size="sm">
                <Link to="/student-dashboard/applications">View All</Link>
              </Button>
            </div>
            <CardDescription>Your latest course applications</CardDescription>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No applications yet</p>
            ) : (
              <div className="space-y-3">
                {applications.map((application) => (
                  <div key={application.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{application.courses?.title || 'Course Not Found'}</p>
                      <p className="text-sm text-gray-600">{application.universities?.name}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(application.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={getStatusColor(application.status)}>
                      {application.status.replace('_', ' ')}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Saved Courses */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Saved Courses</CardTitle>
              <Button asChild variant="outline" size="sm">
                <Link to="/student-dashboard/saved-courses">View All</Link>
              </Button>
            </div>
            <CardDescription>Courses you've saved for later</CardDescription>
          </CardHeader>
          <CardContent>
            {savedCourses.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No saved courses yet</p>
            ) : (
              <div className="space-y-3">
                {savedCourses.map((savedCourse) => (
                  <div key={savedCourse.id} className="p-3 border rounded-lg">
                    <p className="font-medium">{savedCourse.courses.title}</p>
                    <p className="text-sm text-gray-600">{savedCourse.courses.university}</p>
                    <p className="text-xs text-gray-500">{savedCourse.courses.country}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Get started with these common tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild className="h-auto p-6 flex flex-col items-center">
              <Link to="/courses">
                <FileText className="h-8 w-8 mb-2" />
                <span>Browse Courses</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-6 flex flex-col items-center">
              <Link to="/student-dashboard/profile">
                <User className="h-8 w-8 mb-2" />
                <span>Update Profile</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-6 flex flex-col items-center">
              <Link to="/student-dashboard/applications">
                <TrendingUp className="h-8 w-8 mb-2" />
                <span>Track Applications</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
