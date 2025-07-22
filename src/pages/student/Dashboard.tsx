
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
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
          Welcome back, {user?.email?.split('@')[0]}!
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your academic journey continues here. Track your progress, explore opportunities, and achieve your educational goals.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="group hover:shadow-royal transition-all duration-500 bg-gradient-subtle border-0 shadow-elegant hover:scale-105 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{stat.title}</CardTitle>
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applications */}
        <Card className="shadow-elegant border-0 bg-gradient-subtle hover:shadow-royal transition-all duration-300 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-primary flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Recent Applications
              </CardTitle>
              <Button asChild variant="outline" size="sm" className="bg-white/50 hover:bg-primary hover:text-white transition-all duration-300">
                <Link to="/student-dashboard/applications">View All</Link>
              </Button>
            </div>
            <CardDescription className="text-base">Your latest course applications and their status</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {applications.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground text-lg">No applications yet</p>
                <p className="text-sm text-muted-foreground/70 mt-2">Start your journey by applying to courses</p>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((application) => (
                  <div key={application.id} className="group p-4 rounded-xl border bg-white/50 hover:bg-white hover:shadow-soft transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-primary group-hover:text-accent transition-colors duration-300">
                          {application.courses?.title || 'Course Not Found'}
                        </p>
                        <p className="text-muted-foreground mt-1">{application.universities?.name}</p>
                        <p className="text-xs text-muted-foreground/70 mt-2 flex items-center gap-1">
                          <span>Applied on {new Date(application.created_at).toLocaleDateString()}</span>
                        </p>
                      </div>
                      <Badge className={`${getStatusColor(application.status)} px-3 py-1 font-medium`}>
                        {application.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Saved Courses */}
        <Card className="shadow-elegant border-0 bg-gradient-subtle hover:shadow-royal transition-all duration-300 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-accent/5 to-primary/5 border-b border-border/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-primary flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Saved Courses
              </CardTitle>
              <Button asChild variant="outline" size="sm" className="bg-white/50 hover:bg-primary hover:text-white transition-all duration-300">
                <Link to="/student-dashboard/saved-courses">View All</Link>
              </Button>
            </div>
            <CardDescription className="text-base">Courses you've bookmarked for consideration</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {savedCourses.length === 0 ? (
              <div className="text-center py-8">
                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground text-lg">No saved courses yet</p>
                <p className="text-sm text-muted-foreground/70 mt-2">Browse and save courses that interest you</p>
              </div>
            ) : (
              <div className="space-y-4">
                {savedCourses.map((savedCourse) => (
                  <div key={savedCourse.id} className="group p-4 rounded-xl border bg-white/50 hover:bg-white hover:shadow-soft transition-all duration-300">
                    <p className="font-semibold text-primary group-hover:text-accent transition-colors duration-300">
                      {savedCourse.courses.title}
                    </p>
                    <p className="text-muted-foreground mt-1">{savedCourse.courses.university}</p>
                    <p className="text-xs text-muted-foreground/70 mt-2 flex items-center gap-1">
                      📍 {savedCourse.courses.country}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-elegant border-0 bg-gradient-subtle overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-b border-border/50 text-center">
          <CardTitle className="text-2xl font-bold text-primary">Quick Actions</CardTitle>
          <CardDescription className="text-base">Accelerate your academic journey with these essential tools</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Button asChild className="h-auto p-8 flex flex-col items-center bg-gradient-royal hover:scale-105 shadow-elegant hover:shadow-royal transition-all duration-300 group">
              <Link to="/courses">
                <div className="p-4 bg-white/20 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="h-10 w-10 text-white" />
                </div>
                <span className="text-lg font-semibold text-white">Browse Courses</span>
                <span className="text-sm text-white/80 mt-2">Discover your perfect program</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-8 flex flex-col items-center border-2 border-primary/20 hover:border-primary hover:bg-primary/5 hover:scale-105 transition-all duration-300 group">
              <Link to="/student-dashboard/profile">
                <div className="p-4 bg-primary/10 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <span className="text-lg font-semibold text-primary">Update Profile</span>
                <span className="text-sm text-muted-foreground mt-2">Keep your info current</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-8 flex flex-col items-center border-2 border-accent/20 hover:border-accent hover:bg-accent/5 hover:scale-105 transition-all duration-300 group">
              <Link to="/student-dashboard/applications">
                <div className="p-4 bg-accent/10 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-10 w-10 text-accent" />
                </div>
                <span className="text-lg font-semibold text-accent">Track Applications</span>
                <span className="text-sm text-muted-foreground mt-2">Monitor your progress</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
