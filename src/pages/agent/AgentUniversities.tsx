import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Search, Building2 } from 'lucide-react';

const AgentUniversities = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: universities = [], isLoading } = useQuery({
    queryKey: ['agent-browse-universities'],
    queryFn: async () => {
      const { data, error } = await supabase.from('universities').select('*').order('name');
      if (error) throw error;
      return data;
    },
  });

  const filtered = universities.filter((u: any) =>
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.country?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Universities</h1>
        <p className="text-gray-600">Browse partner universities</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search universities..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((uni: any) => (
            <Card key={uni.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  {uni.logo_url ? (
                    <img src={uni.logo_url} alt={uni.name} className="h-10 w-10 object-contain rounded" />
                  ) : (
                    <Building2 className="h-10 w-10 text-primary" />
                  )}
                  <div>
                    <CardTitle className="text-lg">{uni.name}</CardTitle>
                    <p className="text-sm text-gray-500">{uni.location}, {uni.country}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {uni.institution_type && <Badge variant="outline">{uni.institution_type}</Badge>}
                  {uni.qs_world_ranking && <Badge variant="outline">QS: {uni.qs_world_ranking}</Badge>}
                  {uni.accreditation_status && <Badge variant="secondary">{uni.accreditation_status}</Badge>}
                </div>
              </CardContent>
            </Card>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">No universities found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AgentUniversities;
