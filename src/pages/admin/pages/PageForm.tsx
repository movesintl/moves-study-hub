
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LeadEnquiryForm from '@/components/common/LeadEnquiryForm';

const PageForm = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Page Template</h1>
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/pages')}
        >
          Back to Pages
        </Button>
      </div>

      {/* Lead Enquiry Form Template */}
      <LeadEnquiryForm />
    </div>
  );
};

export default PageForm;
