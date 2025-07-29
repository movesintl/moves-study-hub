
import React from 'react';
import StaffManagement from '@/components/admin/team/StaffManagement';

const TeamManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Our Staff</h1>
        <p className="text-muted-foreground">Manage your staff members information</p>
      </div>

      <StaffManagement />
    </div>
  );
};

export default TeamManagement;
