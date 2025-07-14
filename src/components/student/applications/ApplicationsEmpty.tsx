import { FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ApplicationsEmptyProps {
  onNewApplication: () => void;
}

const ApplicationsEmpty = ({ onNewApplication }: ApplicationsEmptyProps) => {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications yet</h3>
        <p className="text-gray-600 mb-6">Start your journey by applying for a course</p>
        <Button onClick={onNewApplication}>
          <Plus className="mr-2 h-4 w-4" />
          Submit Your First Application
        </Button>
      </CardContent>
    </Card>
  );
};

export default ApplicationsEmpty;