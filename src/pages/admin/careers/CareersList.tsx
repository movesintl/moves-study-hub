import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Eye, MapPin, Calendar, Building2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const CareersList = () => {
  const [filter, setFilter] = useState('all');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: careers, isLoading } = useQuery({
    queryKey: ['admin-careers', filter],
    queryFn: async () => {
      let query = supabase.from('careers').select('*').order('created_at', { ascending: false });
      
      switch (filter) {
        case 'published':
          query = query.eq('is_published', true);
          break;
        case 'drafts':
          query = query.eq('is_published', false);
          break;
        case 'full-time':
          query = query.eq('job_type', 'Full-Time');
          break;
        case 'part-time':
          query = query.eq('job_type', 'Part-Time');
          break;
        case 'internship':
          query = query.eq('job_type', 'Internship');
          break;
        case 'contract':
          query = query.eq('job_type', 'Contract');
          break;
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  const deleteCareer = useMutation({
    mutationFn: async (careerId: string) => {
      const { error } = await supabase.from('careers').delete().eq('id', careerId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-careers'] });
      toast({ title: 'Career deleted successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error deleting career', description: error.message, variant: 'destructive' });
    }
  });

  const togglePublished = useMutation({
    mutationFn: async ({ careerId, isPublished }: { careerId: string; isPublished: boolean }) => {
      const { error } = await supabase
        .from('careers')
        .update({ is_published: isPublished })
        .eq('id', careerId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-careers'] });
      toast({ title: 'Career updated successfully' });
    }
  });

  const getJobTypeColor = (type: string) => {
    const colors = {
      'Full-Time': 'bg-green-100 text-green-800',
      'Part-Time': 'bg-blue-100 text-blue-800',
      'Internship': 'bg-purple-100 text-purple-800',
      'Contract': 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Careers Management</h1>
        <Link to="/admin/careers/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Career
          </Button>
        </Link>
      </div>

      <Tabs value={filter} onValueChange={setFilter} className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Jobs</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="full-time">Full-Time</TabsTrigger>
          <TabsTrigger value="part-time">Part-Time</TabsTrigger>
          <TabsTrigger value="internship">Internship</TabsTrigger>
          <TabsTrigger value="contract">Contract</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-6">
          {careers?.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No careers found.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {careers?.map((career) => (
                <Card key={career.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{career.job_title}</h3>
                          <Badge className={getJobTypeColor(career.job_type)}>
                            {career.job_type}
                          </Badge>
                          {career.is_published && (
                            <Badge variant="secondary">Published</Badge>
                          )}
                        </div>
                        
                        <div className="space-y-1 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            <span>{career.department}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{career.location}</span>
                          </div>
                          {career.application_deadline && (
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>
                                Deadline: {format(new Date(career.application_deadline), 'PPP')}
                              </span>
                            </div>
                          )}
                        </div>

                        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                          {career.short_description}
                        </p>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <label className="text-sm">Published:</label>
                            <Switch
                              checked={career.is_published}
                              onCheckedChange={(checked) =>
                                togglePublished.mutate({ careerId: career.id, isPublished: checked })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link to={`/careers/${career.slug}`} target="_blank">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link to={`/admin/careers/${career.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteCareer.mutate(career.id)}
                          disabled={deleteCareer.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CareersList;