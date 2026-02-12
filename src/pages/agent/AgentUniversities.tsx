import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
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
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Universities</h1>
        <p className="text-sm text-muted-foreground">Browse partner universities</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search universities..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 bg-card" />
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="text-center py-12 text-sm text-muted-foreground">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((uni: any) => (
            <div key={uni.id} className="bg-card rounded-xl border border-border p-5 hover:shadow-soft transition-all duration-200 group">
              <div className="flex items-center gap-3 mb-3">
                {uni.logo_url ? (
                  <img src={uni.logo_url} alt={uni.name} className="h-10 w-10 object-contain rounded-lg bg-muted p-1" />
                ) : (
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">{uni.name}</h3>
                  <p className="text-xs text-muted-foreground">{[uni.location, uni.country].filter(Boolean).join(', ')}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {uni.institution_type && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{uni.institution_type}</span>
                )}
                {uni.qs_world_ranking && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">QS: {uni.qs_world_ranking}</span>
                )}
                {uni.accreditation_status && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">{uni.accreditation_status}</span>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-sm text-muted-foreground">No universities found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AgentUniversities;
