import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Application } from '@/types/applications';

interface ApplicationCardProps {
  application: Application;
  onEdit: (application: Application) => void;
}

const ApplicationCard = ({ application, onEdit }: ApplicationCardProps) => {
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

  return (
    <Card className="hover:shadow-lg transition-shadow">
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
              onClick={() => onEdit(application)}
            >
              Edit Application
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationCard;