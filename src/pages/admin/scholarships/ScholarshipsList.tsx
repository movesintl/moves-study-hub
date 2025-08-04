import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Eye, Award, MapPin, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

// Type definitions
interface University {
  id: string;
  name: string;
}

interface Course {
  id: string;
  title: string;
}

interface Scholarship {
  id: string;
  title: string;
  slug: string;
  scholarship_type: string;
  scholarship_amount?: string;
  currency?: string;
  destination_country?: string;
  deadline?: string;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  university_id?: string;
  course_id?: string;
  universities?: University;
  courses?: Course;
}

type ScholarshipFilter = 'all' | 'published' | 'drafts' | 'featured' | 'active' | 'expired';

const ScholarshipsList = () => {
  const [filter, setFilter] = useState<ScholarshipFilter>('all');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch scholarships with proper typing
  const { data: scholarships, isLoading, error } = useQuery<
    Scholarship[],
    Error
  >({
    queryKey: ['admin-scholarships', filter],
    queryFn: async () => {
      let query = supabase
        .from('scholarships')
        .select(`
          *,
          universities:university_id (name),
          courses:course_id (title)
        `)
        .order('created_at', { ascending: false });
      
      // Apply filters
      switch (filter) {
        case 'published':
          query = query.eq('is_published', true);
          break;
        case 'drafts':
          query = query.eq('is_published', false);
          break;
        case 'featured':
          query = query.eq('is_featured', true);
          break;
        case 'active':
          const now = new Date().toISOString();
          query = query.gte('deadline', now);
          break;
        case 'expired':
          const today = new Date().toISOString();
          query = query.lt('deadline', today);
          break;
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as unknown as Scholarship[];
    },
    retry: 2, // Retry failed queries twice
  });

  // Delete mutation with proper typing
  const deleteScholarship = useMutation({
    mutationFn: async (scholarshipId: string) => {
      const { error } = await supabase
        .from('scholarships')
        .delete()
        .eq('id', scholarshipId);
      
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-scholarships'] });
      toast({ 
        title: 'Success', 
        description: 'Scholarship deleted successfully',
      });
    },
    onError: (error: Error) => {
      toast({ 
        title: 'Error', 
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  // Toggle published status with proper typing
  const togglePublished = useMutation({
    mutationFn: async ({ 
      scholarshipId, 
      isPublished 
    }: { 
      scholarshipId: string; 
      isPublished: boolean 
    }) => {
      const { error } = await supabase
        .from('scholarships')
        .update({ is_published: isPublished })
        .eq('id', scholarshipId);
      
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-scholarships'] });
      toast({
        title: 'Success',
        description: 'Publication status updated',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  // Toggle featured status with proper typing
  const toggleFeatured = useMutation({
    mutationFn: async ({ 
      scholarshipId, 
      isFeatured 
    }: { 
      scholarshipId: string; 
      isFeatured: boolean 
    }) => {
      const { error } = await supabase
        .from('scholarships')
        .update({ is_featured: isFeatured })
        .eq('id', scholarshipId);
      
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-scholarships'] });
      toast({
        title: 'Success',
        description: 'Featured status updated',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  // Scholarship type badge colors
  const getScholarshipTypeColor = (type: string) => {
    const colors = {
      'merit': 'bg-blue-100 text-blue-800',
      'need-based': 'bg-green-100 text-green-800',
      'sports': 'bg-purple-100 text-purple-800',
      'academic': 'bg-orange-100 text-orange-800',
      'research': 'bg-gray-100 text-gray-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  // Loading state
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

  // Error state
  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-red-500">Error loading scholarships: {error.message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Scholarships Management</h1>
        <Link to="/admin/scholarships/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Scholarship
          </Button>
        </Link>
      </div>

      <Tabs value={filter} onValueChange={(value) => setFilter(value as ScholarshipFilter)}>
        <TabsList>
          <TabsTrigger value="all">All Scholarships</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-6">
          {scholarships?.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No scholarships found matching your criteria.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {scholarships?.map((scholarship) => (
                <Card key={scholarship.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{scholarship.title}</h3>
                          <Badge className={getScholarshipTypeColor(scholarship.scholarship_type)}>
                            {scholarship.scholarship_type}
                          </Badge>
                          {scholarship.is_featured && (
                            <Badge variant="secondary">Featured</Badge>
                          )}
                        </div>
                        
                        <div className="space-y-1 text-sm text-gray-600">
                          {scholarship.scholarship_amount && (
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4" />
                              <span>{scholarship.scholarship_amount} {scholarship.currency}</span>
                            </div>
                          )}
                          {scholarship.universities?.name && (
                            <div className="flex items-center gap-2">
                              <Award className="h-4 w-4" />
                              <span>{scholarship.universities.name}</span>
                            </div>
                          )}
                          {scholarship.destination_country && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{scholarship.destination_country}</span>
                            </div>
                          )}
                          {scholarship.deadline && (
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Deadline:</span>
                              <span>{format(new Date(scholarship.deadline), 'PPP')}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 mt-4">
                          <div className="flex items-center gap-2">
                            <label className="text-sm">Published:</label>
                            <Switch
                              checked={scholarship.is_published}
                              onCheckedChange={(checked) =>
                                togglePublished.mutate({ 
                                  scholarshipId: scholarship.id, 
                                  isPublished: checked 
                                })
                              }
                              disabled={togglePublished.isPending}
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <label className="text-sm">Featured:</label>
                            <Switch
                              checked={scholarship.is_featured}
                              onCheckedChange={(checked) =>
                                toggleFeatured.mutate({ 
                                  scholarshipId: scholarship.id, 
                                  isFeatured: checked 
                                })
                              }
                              disabled={toggleFeatured.isPending}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link to={`/scholarships/${scholarship.slug}`} target="_blank">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link to={`/admin/scholarships/${scholarship.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this scholarship?')) {
                              deleteScholarship.mutate(scholarship.id);
                            }
                          }}
                          disabled={deleteScholarship.isPending}
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

export default ScholarshipsList;