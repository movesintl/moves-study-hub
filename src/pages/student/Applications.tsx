import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus, FileText, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import StudentApplicationForm from '@/components/applications/StudentApplicationForm';

interface Application {
  id: string;
  student_name: string;
  student_email: string;
  student_phone: string;
  date_of_birth?: string;
  nationality?: string;
  address?: string;
  course_id?: string;
  university_id?: string;
  destination_id?: string;
  status: string;
  created_at: string;
  courses?: { title: string; university: string };
  universities?: { name: string };
  destinations?: { name: string };
  documents?: { name: string; size: number; type: string }[];
}

const Applications = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [showForm, setShowForm] = useState(false);
  const [editingApplication, setEditingApplication] = useState<Application | null>(null);
  const [preselectedCourseId, setPreselectedCourseId] = useState<string | null>(null);

  // Check for preselected course from navigation state
  useEffect(() => {
    if (location.state?.preselectedCourseId) {
      setPreselectedCourseId(location.state.preselectedCourseId);
      setShowForm(true);
      // Clear the state to prevent reopening form on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const { data: applications = [], isLoading, refetch } = useQuery({
    queryKey: ['student-applications', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          courses(title, university),
          universities(name),
          destinations(name)
        `)
        .eq('student_email', user.email)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Transform the data to match our Application interface
      return (data || []).map(app => ({
        ...app,
        documents: (app.documents as unknown as { name: string; size: number; type: string }[]) || []
      })) as Application[];
    },
    enabled: !!user?.id
  });

  const handleNewApplication = () => {
    setEditingApplication(null);
    setPreselectedCourseId(null);
    setShowForm(true);
  };

  const handleEditApplication = (application: Application) => {
    setEditingApplication(application);
    setPreselectedCourseId(null);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingApplication(null);
    setPreselectedCourseId(null);
    refetch();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingApplication(null);
    setPreselectedCourseId(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {editingApplication ? 'Edit Application' : 'New Application'}
            </h1>
            <p className="text-gray-600">
              {editingApplication ? 'Update your application details' : 'Apply for a course'}
            </p>
          </div>
        </div>

        <StudentApplicationForm
          editingApplication={editingApplication}
          preselectedCourseId={preselectedCourseId}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Applications</h1>
          <p className="text-gray-600">Track your course applications</p>
        </div>
        <Button onClick={handleNewApplication}>
          <Plus className="mr-2 h-4 w-4" />
          New Application
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : applications.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications yet</h3>
            <p className="text-gray-600 mb-6">Start your journey by applying for a course</p>
            <Button onClick={handleNewApplication}>
              <Plus className="mr-2 h-4 w-4" />
              Submit Your First Application
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {applications.map((application) => (
            <Card key={application.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">
                      {application.courses?.title || 'Course Application'}
                    </CardTitle>
                    <CardDescription>
                      {application.courses?.university || application.universities?.name} • {application.destinations?.name}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(application.status)}
                    <Badge className={getStatusColor(application.status)}>
                      {application.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Submitted:</span>
                      <span className="ml-2 text-gray-600">
                        {new Date(application.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Phone:</span>
                      <span className="ml-2 text-gray-600">{application.student_phone}</span>
                    </div>
                    {application.nationality && (
                      <div>
                        <span className="font-medium text-gray-700">Nationality:</span>
                        <span className="ml-2 text-gray-600">{application.nationality}</span>
                      </div>
                    )}
                    {application.documents && application.documents.length > 0 && (
                      <div>
                        <span className="font-medium text-gray-700">Documents:</span>
                        <span className="ml-2 text-gray-600">{application.documents.length} files</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditApplication(application)}
                    >
                      Edit Application
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
