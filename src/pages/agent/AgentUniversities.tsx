import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { Search, Building2, MapPin, Award, Star } from 'lucide-react';

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
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-[hsl(195,100%,20%)] flex items-center justify-center shadow-lg">
          <Building2 className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Universities</h1>
          <p className="text-xs text-muted-foreground">Browse partner universities</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search universities..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 rounded-xl bg-card" />
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="text-center py-16 text-sm text-muted-foreground">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((uni: any) => (
            <div key={uni.id} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-elegant transition-all duration-300 group">
              {/* Header with gradient */}
              <div className="h-20 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent flex items-end p-4">
                <div className="flex items-center gap-3">
                  {uni.logo_url ? (
                    <img src={uni.logo_url} alt={uni.name} className="h-11 w-11 object-contain rounded-xl bg-card p-1.5 shadow-sm border border-border" />
                  ) : (
                    <div className="h-11 w-11 rounded-xl bg-card shadow-sm border border-border flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm text-foreground truncate group-hover:text-primary transition-colors">{uni.name}</h3>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-2.5 w-2.5" />
                      {[uni.location, uni.country].filter(Boolean).join(', ')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-3">
                <div className="flex flex-wrap gap-1.5">
                  {uni.institution_type && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium flex items-center gap-1">
                      <Award className="h-2.5 w-2.5" />{uni.institution_type}
                    </span>
                  )}
                  {uni.qs_world_ranking && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-bold flex items-center gap-1">
                      <Star className="h-2.5 w-2.5" />QS: {uni.qs_world_ranking}
                    </span>
                  )}
                  {uni.accreditation_status && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">{uni.accreditation_status}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16">
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-3">
                <Building2 className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground mb-1">No universities found</p>
              <p className="text-xs text-muted-foreground">Try a different search term</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AgentUniversities;
