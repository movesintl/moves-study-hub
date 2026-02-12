import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        if (error) {
          toast({
            title: "Authentication Error",
            description: error,
            variant: "destructive",
          });
          navigate('/auth');
          return;
        }

        if (code) {
          const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          
          if (exchangeError) {
            toast({
              title: "Authentication Error",
              description: exchangeError.message,
              variant: "destructive",
            });
            navigate('/auth');
            return;
          }

          if (data.session?.user) {
            // Wait a bit for profile creation
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Check user role and redirect accordingly
            const { data: userProfile } = await supabase
              .from('user_profiles')
              .select('role')
              .eq('user_id', data.session.user.id)
              .maybeSingle();

            if (!userProfile) {
              // Profile doesn't exist yet, try one more time
              await new Promise(resolve => setTimeout(resolve, 2000));
              const { data: retryProfile } = await supabase
                .from('user_profiles')
                .select('role')
                .eq('user_id', data.session.user.id)
                .maybeSingle();
              
              if (!retryProfile) {
                console.error('No user profile found, defaulting to student dashboard');
                navigate('/student-dashboard/home');
                return;
              }
              
              // Use retry result
              if (retryProfile.role === 'admin' || retryProfile.role === 'editor' || retryProfile.role === 'counselor') {
                navigate('/admin');
              } else if (retryProfile.role === 'agent') {
                navigate('/agent');
              } else {
                navigate('/student-dashboard/home');
              }
            } else {
              // Profile exists, redirect based on role
              if (userProfile.role === 'admin' || userProfile.role === 'editor' || userProfile.role === 'counselor') {
                navigate('/admin');
              } else if (userProfile.role === 'agent') {
                navigate('/agent');
              } else {
                navigate('/student-dashboard/home');
              }
            }

            toast({
              title: "Success",
              description: "Successfully signed in with Google!",
            });
          }
        } else {
          // No code parameter, redirect to auth
          navigate('/auth');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        toast({
          title: "Authentication Error",
          description: "An unexpected error occurred during authentication.",
          variant: "destructive",
        });
        navigate('/auth');
      }
    };

    handleAuthCallback();
  }, [navigate, searchParams, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Completing sign in...</h2>
        <p className="text-gray-600">Please wait while we redirect you.</p>
      </div>
    </div>
  );
};

export default AuthCallback;