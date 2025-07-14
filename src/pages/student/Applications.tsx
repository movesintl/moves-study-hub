import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStudentApplications } from '@/hooks/useStudentApplications';
import StudentApplicationForm from '@/components/applications/StudentApplicationForm';
import ApplicationsEmpty from '@/components/student/applications/ApplicationsEmpty';
import ApplicationsLoading from '@/components/student/applications/ApplicationsLoading';
import ApplicationsList from '@/components/student/applications/ApplicationsList';
import type { Application } from '@/types/applications';

const Applications = () => {
  const location = useLocation();
  const [showForm, setShowForm] = useState(false);
  const [editingApplication, setEditingApplication] = useState<Application | null>(null);
  const [preselectedCourseId, setPreselectedCourseId] = useState<string | null>(null);

  const { data: applications = [], isLoading, refetch } = useStudentApplications();

  // Check for preselected course from navigation state
  useEffect(() => {
    if (location.state?.preselectedCourseId) {
      setPreselectedCourseId(location.state.preselectedCourseId);
      setShowForm(true);
      // Clear the state to prevent reopening form on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

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
        <ApplicationsLoading />
      ) : applications.length === 0 ? (
        <ApplicationsEmpty onNewApplication={handleNewApplication} />
      ) : (
        <ApplicationsList
          applications={applications}
          onEditApplication={handleEditApplication}
        />
      )}
    </div>
  );
};

export default Applications;
