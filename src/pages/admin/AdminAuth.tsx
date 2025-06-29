
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ForgotPasswordDialog from '@/components/auth/ForgotPasswordDialog';

const AdminAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkExistingAdmin = async () => {
      if (user) {
        try {
          const { data: userProfile, error } = await supabase
            .from('user_profiles')
            .select('role')
            .eq('user_id', user.id)
            .single();

          if (!error && userProfile?.role === 'admin') {
            navigate('/admin');
          } else {
            toast({
              title: "Access Denied",
              description: "You don't have admin privileges.",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error('Error checking admin status:', error);
        }
      }
    };

    checkExistingAdmin();
  }, [user, navigate, toast]);

  const handleAdminSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signIn(email, password);
    
    if (error) {
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Check if user is admin after successful login
    try {
      const { data: { user: signedInUser } } = await supabase.auth.getUser();
      
      if (signedInUser) {
        const { data: userProfile, error: profileError } = await supabase
          .from('user_profiles')
          .select('role')
          .eq('user_id', signedInUser.id)
          .single();

        if (profileError || userProfile?.role !== 'admin') {
          await supabase.auth.signOut();
          toast({
            title: "Access Denied",
            description: "You don't have admin privileges.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: "Successfully signed in as admin!",
          });
          navigate('/admin');
        }
      }
    } catch (error) {
      console.error('Error checking admin status after login:', error);
      toast({
        title: "Error",
        description: "Failed to verify admin privileges.",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  const handleAdminSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const redirectUrl = `${window.location.origin}/admin`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });

      if (error) {
        toast({
          title: "Error creating admin account",
          description: error.message,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (data.user) {
        // Create admin profile
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            user_id: data.user.id,
            role: 'admin'
          });

        if (profileError) {
          console.error('Error creating admin profile:', profileError);
          toast({
            title: "Account created but admin role not assigned",
            description: "Please contact support to get admin access.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Admin account created successfully",
            description: "Please check your email to verify your account, then sign in.",
          });
        }
      }
    } catch (error) {
      console.error('Error in admin signup:', error);
      toast({
        title: "Error creating admin account",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img 
            src="/lovable-uploads/abcbb2a1-5db8-45ce-8215-42e053f17039.png" 
            alt="Moves International" 
            className="h-12 w-auto mx-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-gray-900">Admin Portal</h2>
          <p className="text-gray-600 mt-2">Access the content management system</p>
        </div>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Admin Sign In</TabsTrigger>
            <TabsTrigger value="signup">Create Admin</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <Card>
              <CardHeader>
                <CardTitle>Admin Sign In</CardTitle>
                <CardDescription>Sign in to access the admin panel</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAdminSignIn} className="space-y-4">
                  <div>
                    <Label htmlFor="admin-signin-email">Email</Label>
                    <Input
                      id="admin-signin-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="admin-signin-password">Password</Label>
                    <Input
                      id="admin-signin-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div className="flex justify-end">
                    <ForgotPasswordDialog>
                      <Button 
                        type="button" 
                        variant="link" 
                        className="p-0 h-auto text-sm text-primary hover:underline"
                      >
                        Forgot Password?
                      </Button>
                    </ForgotPasswordDialog>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In to Admin Panel'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create Admin Account</CardTitle>
                <CardDescription>Create a new admin account with full access</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAdminSignUp} className="space-y-4">
                  <div>
                    <Label htmlFor="admin-signup-email">Email</Label>
                    <Input
                      id="admin-signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="admin-signup-password">Password</Label>
                    <Input
                      id="admin-signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="mt-1"
                      minLength={6}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Creating Admin Account...' : 'Create Admin Account'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminAuth;
