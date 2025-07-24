import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
  email?: string;
  full_name?: string;
}

const AllUsers: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Get all user profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) {
        throw profilesError;
      }

      // Get user emails from auth metadata through RPC call
      const { data: authUsers, error: authError } = await supabase.rpc('get_auth_users');
      
      if (authError) {
        console.error('Error fetching auth users:', authError);
        // Fallback to just showing profiles without email
        setUsers(profiles || []);
      } else {
        // Merge profile data with auth data
        const mergedUsers = profiles?.map(profile => {
          const authUser = authUsers?.find((au: any) => au.id === profile.user_id);
          return {
            ...profile,
            email: authUser?.email,
            full_name: authUser?.raw_user_meta_data?.full_name || 
                     `${authUser?.raw_user_meta_data?.first_name || ''} ${authUser?.raw_user_meta_data?.last_name || ''}`.trim() ||
                     authUser?.email?.split('@')[0]
          };
        }) || [];
        
        setUsers(mergedUsers);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'editor':
        return 'default';
      case 'counselor':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">All Users</h1>
        <p className="text-muted-foreground">Manage all registered users in the system</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Accounts ({users.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.full_name || 'N/A'}
                  </TableCell>
                  <TableCell>{user.email || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {users.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No users found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AllUsers;