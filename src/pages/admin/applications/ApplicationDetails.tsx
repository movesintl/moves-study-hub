
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, User, Mail, Phone, Calendar, MapPin, GraduationCap, FileText, Building2, Globe } from 'lucide-react';

interface ApplicationDetailsProps {
  applicationId: string;
  onBack: () => void;
  onStatusUpdate: () => void;
}

const ApplicationDetails = ({ applicationId, onBack, onStatusUpdate }: ApplicationDetailsProps) => {
  const { toast } = useToast();
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');

  const { data: application, isLoading } = useQuery({
    queryKey: ['application', applicationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          courses:course_id(title, level, study_area, description, duration_months),
          universities:university_id(name, location, website_url),
          destinations:destination_id(name, description)
        `)
        .eq('id', applicationId)
        .single();
      
      if (error) throw error;
      
      setNotes(data.notes || '');
      setStatus(data.status || 'pending');
      
      return data;
    }
  });

  const updateApplication = async () => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ 
          status,
          notes
        })
        .eq('id', applicationId);

      if (error) throw error;

      toast({
        title: "Application Updated",
        description: "Application details have been updated successfully",
      });

      onStatusUpdate();
    } catch (error) {
      console.error('Error updating application:', error);
      toast({
        title: "Error",
        description: "Failed to update application",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading application details...</div>;
  }

  if (!application) {
    return <div className="text-center py-8">Application not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Applications
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Application Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Student Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Full Name</Label>
                  <p className="text-gray-700">{application.student_name}</p>
                </div>
                <div>
                  <Label className="font-semibold">Email</Label>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    <p className="text-gray-700">{application.student_email}</p>
                  </div>
                </div>
                <div>
                  <Label className="font-semibold">Phone</Label>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    <p className="text-gray-700">{application.student_phone}</p>
                  </div>
                </div>
                <div>
                  <Label className="font-semibold">Date of Birth</Label>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <p className="text-gray-700">
                      {application.date_of_birth 
                        ? new Date(application.date_of_birth).toLocaleDateString()
                        : 'Not provided'
                      }
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="font-semibold">Nationality</Label>
                  <p className="text-gray-700">{application.nationality || 'Not provided'}</p>
                </div>
              </div>
              {application.address && (
                <div>
                  <Label className="font-semibold">Address</Label>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-1" />
                    <p className="text-gray-700">{application.address}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Application Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="h-5 w-5 mr-2" />
                Application Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="font-semibold">Course</Label>
                <p className="text-gray-700 text-lg">{application.courses?.title}</p>
                <p className="text-sm text-gray-500">
                  {application.courses?.level} • {application.courses?.study_area}
                </p>
              </div>
              
              <div>
                <Label className="font-semibold">University</Label>
                <div className="flex items-center">
                  <Building2 className="h-4 w-4 mr-2 text-gray-500" />
                  <div>
                    <p className="text-gray-700">{application.universities?.name}</p>
                    <p className="text-sm text-gray-500">{application.universities?.location}</p>
                  </div>
                </div>
              </div>

              <div>
                <Label className="font-semibold">Destination</Label>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-gray-500" />
                  <p className="text-gray-700">{application.destinations?.name}</p>
                </div>
              </div>

              <div>
                <Label className="font-semibold">Application Date</Label>
                <p className="text-gray-700">
                  {new Date(application.created_at).toLocaleDateString()} at{' '}
                  {new Date(application.created_at).toLocaleTimeString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          {application.documents && Array.isArray(application.documents) && application.documents.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Uploaded Documents ({application.documents.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {application.documents.map((doc: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-3 text-gray-500" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{doc.category?.toUpperCase()}</span>
                            {doc.label && (
                              <>
                                <span>•</span>
                                <span className="font-medium text-gray-700">{doc.label}</span>
                              </>
                            )}
                            <span>•</span>
                            <span>{doc.type}</span>
                            <span>•</span>
                            <span>{Math.round(doc.size / 1024)} KB</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {doc.type?.startsWith('image/') && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(doc.url || '#', '_blank')}
                          >
                            Preview
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = doc.url || '#';
                            link.download = doc.name;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                        >
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Status and Notes */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Current Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Admin Notes</Label>
                <Textarea
                  placeholder="Add notes about this application..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={6}
                />
              </div>

              <Button onClick={updateApplication} className="w-full">
                Update Application
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Applied:</span>
                <span className="font-medium">
                  {new Date(application.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated:</span>
                <span className="font-medium">
                  {new Date(application.updated_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Documents:</span>
                <span className="font-medium">
                  {Array.isArray(application.documents) ? application.documents.length : 0} files
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
