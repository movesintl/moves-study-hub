import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Loader2, Edit, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { useRoleValidation } from '@/hooks/useRoleValidation';

interface AuthUser {
  id: string;
  email: string;
  raw_user_meta_data?: {
    full_name?: string;
    first_name?: string;
    last_name?: string;
  };
  created_at: string;
}

type UserRole = 'admin' | 'editor' | 'counselor' | 'student' | 'agent';

interface UserProfile {
  id: string;
  user_id: string;
  role: UserRole | 'user'; // Allow 'user' for existing data, will be migrated to 'student'
  created_at: string;
  email?: string;
  full_name?: string;
}

const AllUsers: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [newRole, setNewRole] = useState<UserRole>('student');
  const { currentRole, hasPermission, updateUserRole, canModifyRole } = useRoleValidation();

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
      const { data: authUsersData, error: authError } = await supabase.rpc('get_auth_users');
      
      if (authError) {
        console.error('Error fetching auth users:', authError);
        // Fallback to just showing profiles without email
        setUsers(profiles || []);
      } else {
        // Parse the JSON response
        const authUsers = Array.isArray(authUsersData) ? authUsersData : [];
        
        // Merge profile data with auth data
        const mergedUsers = profiles?.map(profile => {
          const authUser = authUsers.find((au: any) => au.id === profile.user_id) as unknown as AuthUser | undefined;
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

  const handleRoleChange = async (userId: string, oldRole: UserRole | 'user', newRole: UserRole) => {
    try {
      const result = await updateUserRole(userId, newRole, oldRole === 'user' ? 'student' : oldRole);
      
      if (!result.success) {
        toast.error(result.error || 'Failed to update user role');
        setEditingUserId(null);
        return;
      }

      // Update local state
      setUsers(users.map(user => 
        user.user_id === userId ? { ...user, role: newRole } : user
      ));

      setEditingUserId(null);
      toast.success(`User role updated to ${newRole}`);
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Failed to update user role');
      setEditingUserId(null);
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
      case 'student':
      case 'user': // Legacy role, treat as student
        return 'outline';
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
                <TableHead>Actions</TableHead>
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
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setEditingUserId(user.user_id);
                            // Convert legacy 'user' role to 'student' for editing
                            setNewRole(user.role === 'user' ? 'student' : user.role as UserRole);
                          }}
                          disabled={!hasPermission('canManageUsers') || !canModifyRole(user.role as UserRole)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          {canModifyRole(user.role as UserRole) ? 'Edit Role' : 'Cannot Edit'}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-orange-500" />
                            Change User Role
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to change the role for {user.full_name || user.email}? This action will affect their access permissions and is logged for security purposes.
                            {newRole === 'admin' && (
                              <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded">
                                <strong>Warning:</strong> Granting admin access gives full system control.
                              </div>
                            )}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="py-4">
                          <Select value={newRole} onValueChange={(value) => setNewRole(value as UserRole)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="counselor">Counselor</SelectItem>
                              <SelectItem value="editor">Editor</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={() => setEditingUserId(null)}>
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleRoleChange(user.user_id, user.role, newRole)}
                            disabled={newRole === user.role}
                          >
                            Update Role
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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