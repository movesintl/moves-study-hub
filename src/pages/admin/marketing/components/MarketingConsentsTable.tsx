import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MarketingConsent } from '../types';

interface MarketingConsentsTableProps {
  consents: MarketingConsent[];
  selectedConsents: string[];
  activeConsents: MarketingConsent[];
  selectedCount: number;
  onSelectAll: (checked: boolean) => void;
  onSelectConsent: (consentId: string, checked: boolean) => void;
}

const MarketingConsentsTable = ({
  consents,
  selectedConsents,
  activeConsents,
  selectedCount,
  onSelectAll,
  onSelectConsent,
}: MarketingConsentsTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedCount === activeConsents.length && activeConsents.length > 0}
                onCheckedChange={onSelectAll}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Consent Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {consents.map((consent) => (
            <TableRow key={consent.id}>
              <TableCell>
                <Checkbox
                  checked={selectedConsents.includes(consent.id)}
                  onCheckedChange={(checked) => 
                    onSelectConsent(consent.id, checked as boolean)
                  }
                  disabled={!consent.is_active}
                />
              </TableCell>
              <TableCell className="font-medium">
                {consent.student_name}
              </TableCell>
              <TableCell>{consent.student_email}</TableCell>
              <TableCell>{consent.student_phone || 'N/A'}</TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {consent.source || 'Unknown'}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(consent.consent_date).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge variant={consent.is_active ? 'default' : 'secondary'}>
                  {consent.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MarketingConsentsTable;