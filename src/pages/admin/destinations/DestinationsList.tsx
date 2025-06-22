
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const DestinationsList = () => {
  const { toast } = useToast();

  const { data: destinations, isLoading, refetch } = useQuery({
    queryKey: ['destinations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this destination?')) return;

    const { error } = await supabase
      .from('destinations')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete destination",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Destination deleted successfully",
      });
      refetch();
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading destinations...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Destinations</h1>
        <Link to="/admin/destinations/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Destination
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Destinations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {destinations?.map((destination) => (
                <TableRow key={destination.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {destination.featured_image_url && (
                        <img src={destination.featured_image_url} alt={destination.name} className="w-8 h-8 rounded" />
                      )}
                      {destination.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate">
                      {destination.description || 'No description'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link to={`/admin/destinations/${destination.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(destination.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {destinations?.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No destinations found. Add your first destination to get started.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DestinationsList;
