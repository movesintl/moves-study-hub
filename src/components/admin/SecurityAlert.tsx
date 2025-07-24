import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Shield, ExternalLink } from 'lucide-react';

const SecurityAlert: React.FC = () => {
  const openSupabaseAuth = () => {
    window.open('https://supabase.com/dashboard/project/coadhiipbnnqlmslpzeu/auth/providers', '_blank');
  };

  return (
    <Alert className="border-orange-200 bg-orange-50">
      <Shield className="h-4 w-4 text-orange-600" />
      <AlertTitle className="text-orange-800">Security Configuration Required</AlertTitle>
      <AlertDescription className="text-orange-700">
        <p className="mb-3">
          To complete security setup, please configure the following in your Supabase dashboard:
        </p>
        <ul className="list-disc pl-5 mb-3 space-y-1">
          <li>Enable leaked password protection in Auth settings</li>
          <li>Configure appropriate OTP expiry time (recommended: 10 minutes)</li>
          <li>Review and update password policies if needed</li>
        </ul>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={openSupabaseAuth}
          className="text-orange-800 border-orange-300 hover:bg-orange-100"
        >
          Open Supabase Auth Settings
          <ExternalLink className="ml-2 h-3 w-3" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default SecurityAlert;