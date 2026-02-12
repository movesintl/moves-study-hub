import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Lock } from 'lucide-react';

const AgentSetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast({ title: 'Password too short', description: 'Password must be at least 6 characters.', variant: 'destructive' });
      return;
    }

    if (password !== confirmPassword) {
      toast({ title: 'Passwords do not match', description: 'Please make sure both passwords match.', variant: 'destructive' });
      return;
    }

    if (!user) {
      toast({ title: 'Not authenticated', description: 'Please sign in first.', variant: 'destructive' });
      navigate('/auth');
      return;
    }

    setLoading(true);
    try {
      // Set password on the auth account
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;

      // Mark agent as activated
      const { error: agentError } = await supabase
        .from('agents')
        .update({ activated_at: new Date().toISOString() })
        .eq('user_id', user.id);

      if (agentError) throw agentError;

      toast({ title: 'Password set successfully!', description: 'You can now log in with your email and password.' });
      navigate('/agent');
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Failed to set password.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Set Your Password</CardTitle>
          <CardDescription>
            Welcome to the Agent Portal! Please set a password so you can log in next time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSetPassword} className="space-y-4">
            <div>
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Min. 6 characters"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Re-enter your password"
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Setting password...' : 'Set Password & Continue'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentSetPassword;
