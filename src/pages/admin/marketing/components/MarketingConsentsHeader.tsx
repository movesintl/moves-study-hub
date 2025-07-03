import React from 'react';
import { Users } from 'lucide-react';
import BulkEmailDialog from './BulkEmailDialog';
import { MarketingConsent } from '../types';

interface MarketingConsentsHeaderProps {
  activeConsents: MarketingConsent[];
  selectedCount: number;
  selectedConsents: string[];
  consents: MarketingConsent[] | undefined;
  onEmailSent: () => void;
}

const MarketingConsentsHeader = ({
  activeConsents,
  selectedCount,
  selectedConsents,
  consents,
  onEmailSent,
}: MarketingConsentsHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Marketing Consents</h1>
        <p className="text-muted-foreground">
          Manage users who have consented to receive marketing communications
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{activeConsents.length} active consents</span>
        </div>
        
        {selectedCount > 0 && (
          <BulkEmailDialog
            selectedCount={selectedCount}
            selectedConsents={selectedConsents}
            consents={consents}
            onEmailSent={onEmailSent}
          />
        )}
      </div>
    </div>
  );
};

export default MarketingConsentsHeader;