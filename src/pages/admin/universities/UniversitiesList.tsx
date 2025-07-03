
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Plus, Edit, Trash2, ExternalLink, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const UniversitiesList = () => {
  const { toast } = useToast();

  const { data: universities, isLoading, refetch } = useQuery({
    queryKey: ['universities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this university?')) return;

    const { error } = await supabase
      .from('universities')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete university",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "University deleted successfully",
      });
      refetch();
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading universities...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Universities</h1>
        <Link to="/admin/universities/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add University
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Universities</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {universities?.map((university) => (
                <TableRow key={university.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {university.logo_url && (
                        <img src={university.logo_url} alt={university.name} className="w-8 h-8 rounded" />
                      )}
                      {university.name}
                    </div>
                  </TableCell>
                  <TableCell>{university.location || 'N/A'}</TableCell>
                  <TableCell>
                    {university.website_url ? (
                      <a 
                        href={university.website_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                      >
                        Visit <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link to={`/universities/${university.id}`}>
                        <Button variant="outline" size="sm" title="View University">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to={`/admin/universities/${university.id}/edit`}>
                        <Button variant="outline" size="sm" title="Edit University">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(university.id)}
                        title="Delete University"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {universities?.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No universities found. Add your first university to get started.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UniversitiesList;
