
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash2, Plus, FileText } from 'lucide-react';
import StudentApplicationForm from '@/components/applications/StudentApplicationForm';

interface Application {
  id: string;
  student_name: string;
  student_email: string;
  student_phone: string;
  status: string;
  created_at: string;
  course_id?: string;
  university_id?: string;
  destination_id?: string;
  courses?: { title: string };
  universities?: { name: string };
  destinations?: { name: string };
}

const StudentDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loadingApplications, setLoadingApplications] = useState(true);
  const [editingApplication, setEditingApplication] = useState<Application | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          courses(title),
          universities(name),
          destinations(name)
        `)
        .eq('student_email', user?.email)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Error",
        description: "Failed to fetch your applications.",
        variant: "destructive",
      });
    } finally {
      setLoadingApplications(false);
    }
  };

  const handleDeleteApplication = async (id: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setApplications(applications.filter(app => app.id !== id));
      toast({
        title: "Success",
        description: "Application deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting application:', error);
      toast({
        title: "Error",
        description: "Failed to delete application.",
        variant: "destructive",
      });
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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Student Dashboard</h1>
          <p className="text-xl text-gray-600">Manage your course applications</p>
        </div>
        
        <Tabs defaultValue="new-application" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new-application" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Application
            </TabsTrigger>
            <TabsTrigger value="my-applications" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              My Applications ({applications.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="new-application">
            <StudentApplicationForm 
              editingApplication={editingApplication}
              onSuccess={() => {
                fetchApplications();
                setEditingApplication(null);
              }}
              onCancel={() => setEditingApplication(null)}
            />
          </TabsContent>
          
          <TabsContent value="my-applications">
            <div className="space-y-4">
              {loadingApplications ? (
                <div className="text-center py-8">Loading your applications...</div>
              ) : applications.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                    <p className="text-gray-600">Start by submitting your first course application.</p>
                  </CardContent>
                </Card>
              ) : (
                applications.map((application) => (
                  <Card key={application.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{application.courses?.title || 'Course Not Found'}</CardTitle>
                          <CardDescription>
                            {application.universities?.name} • {application.destinations?.name}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(application.status)}>
                            {application.status.replace('_', ' ')}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingApplication(application)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Application</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this application? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteApplication(application.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Application Date:</span>
                          <p>{new Date(application.created_at).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="font-medium">Status:</span>
                          <p className="capitalize">{application.status.replace('_', ' ')}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentDashboard;
