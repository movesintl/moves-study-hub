import type { Application } from '@/types/applications';
import ApplicationCard from './ApplicationCard';

interface ApplicationsListProps {
  applications: Application[];
  onEditApplication: (application: Application) => void;
}

const ApplicationsList = ({ applications, onEditApplication }: ApplicationsListProps) => {
  return (
    <div className="grid gap-6">
      {applications.map((application) => (
        <ApplicationCard
          key={application.id}
          application={application}
          onEdit={onEditApplication}
        />
      ))}
    </div>
  );
};

export default ApplicationsList;