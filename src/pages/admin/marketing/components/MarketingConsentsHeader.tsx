import React from 'react';
import { Users, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import BulkEmailDialog from './BulkEmailDialog';
import { MarketingConsent } from '../types';
import { exportToCSV, exportSelectedToCSV, exportActiveConsentsToCSV } from '../utils/csvExport';

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
  const handleExportAll = () => {
    if (consents && consents.length > 0) {
      exportToCSV(consents, 'all-marketing-consents');
    }
  };

  const handleExportActive = () => {
    if (consents && consents.length > 0) {
      exportActiveConsentsToCSV(consents, 'active-marketing-consents');
    }
  };

  const handleExportSelected = () => {
    if (consents && selectedConsents.length > 0) {
      exportSelectedToCSV(consents, selectedConsents, 'selected-marketing-consents');
    }
  };

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

        {/* Export Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleExportAll}>
              Export All ({consents?.length || 0} records)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportActive}>
              Export Active Only ({activeConsents.length} records)
            </DropdownMenuItem>
            {selectedCount > 0 && (
              <DropdownMenuItem onClick={handleExportSelected}>
                Export Selected ({selectedCount} records)
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        
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