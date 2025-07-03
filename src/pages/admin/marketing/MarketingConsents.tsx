import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import MarketingConsentsHeader from './components/MarketingConsentsHeader';
import MarketingConsentsTable from './components/MarketingConsentsTable';
import MarketingConsentsEmpty from './components/MarketingConsentsEmpty';
import MarketingConsentsLoading from './components/MarketingConsentsLoading';
import { MarketingConsent } from './types';

const MarketingConsents = () => {
  const [selectedConsents, setSelectedConsents] = useState<string[]>([]);

  const { data: consents, isLoading, refetch } = useQuery({
    queryKey: ['marketing-consents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketing_consents')
        .select('*')
        .order('consent_date', { ascending: false });
      
      if (error) throw error;
      return data as MarketingConsent[];
    },
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked && consents) {
      setSelectedConsents(consents.filter(c => c.is_active).map(c => c.id));
    } else {
      setSelectedConsents([]);
    }
  };

  const handleSelectConsent = (consentId: string, checked: boolean) => {
    if (checked) {
      setSelectedConsents(prev => [...prev, consentId]);
    } else {
      setSelectedConsents(prev => prev.filter(id => id !== consentId));
    }
  };

  const handleEmailSent = () => {
    setSelectedConsents([]);
  };

  const activeConsents = consents?.filter(c => c.is_active) || [];
  const selectedCount = selectedConsents.length;

  if (isLoading) {
    return <MarketingConsentsLoading />;
  }

  return (
    <div className="space-y-6">
      <MarketingConsentsHeader
        activeConsents={activeConsents}
        selectedCount={selectedCount}
        selectedConsents={selectedConsents}
        consents={consents}
        onEmailSent={handleEmailSent}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Marketing Consent Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!consents || consents.length === 0 ? (
            <MarketingConsentsEmpty />
          ) : (
            <MarketingConsentsTable
              consents={consents}
              selectedConsents={selectedConsents}
              activeConsents={activeConsents}
              selectedCount={selectedCount}
              onSelectAll={handleSelectAll}
              onSelectConsent={handleSelectConsent}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingConsents;