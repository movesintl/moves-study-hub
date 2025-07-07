
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ServicesList = () => {
  const { toast } = useToast();

  const { data: services, isLoading, refetch } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('title');
      
      if (error) throw error;
      return data;
    },
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Service deleted successfully",
      });
      refetch();
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading services...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Services</h1>
        <Link to="/admin/services/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Services</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Short Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services?.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {service.icon_url && (
                        <img src={service.icon_url} alt={service.title} className="w-6 h-6" />
                      )}
                      {service.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate">
                      {service.short_description || 'No description'}
                    </div>
                  </TableCell>
                   <TableCell>
                     <div className="flex gap-2">
                       <Link to={`/services/${service.slug || service.id}`}>
                         <Button variant="outline" size="sm">
                           <Eye className="h-4 w-4" />
                         </Button>
                       </Link>
                       <Link to={`/admin/services/${service.id}/edit`}>
                         <Button variant="outline" size="sm">
                           <Edit className="h-4 w-4" />
                         </Button>
                       </Link>
                       <Button 
                         variant="outline" 
                         size="sm"
                         onClick={() => handleDelete(service.id)}
                       >
                         <Trash2 className="h-4 w-4" />
                       </Button>
                     </div>
                   </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {services?.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No services found. Add your first service to get started.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicesList;
