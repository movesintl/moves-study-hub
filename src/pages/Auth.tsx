
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import ForgotPasswordDialog from '@/components/auth/ForgotPasswordDialog';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/student-dashboard');
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signIn(email, password);
    
    if (error) {
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Successfully signed in!",
      });
      navigate('/student-dashboard');
    }
    
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signUp(email, password);
    
    if (error) {
      toast({
        title: "Error signing up",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Check your email",
        description: "We've sent you a confirmation link to complete your registration.",
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Content */}
      <div className="flex-1 bg-gradient-to-br from-primary via-primary/95 to-primary/90 relative overflow-hidden flex items-center justify-center px-12 py-8">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-16 left-16 w-24 h-24 border border-white/10 rounded-lg rotate-12"></div>
          <div className="absolute top-32 left-32 w-16 h-16 border border-white/10 rounded-lg -rotate-12"></div>
          <div className="absolute bottom-32 right-16 w-32 h-32 border border-white/10 rounded-lg rotate-45"></div>
          <div className="absolute bottom-16 right-32 w-20 h-20 border border-white/10 rounded-lg -rotate-45"></div>
          <div className="absolute top-1/2 left-8 w-28 h-28 border border-white/10 rounded-lg rotate-6"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-lg text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mr-4">
              <img 
                src="/lovable-uploads/abcbb2a1-5db8-45ce-8215-42e053f17039.png" 
                alt="Moves International" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <span className="text-white text-2xl font-bold">Moves International</span>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-8 leading-tight">
            Hello <br />
            Future Student! 👋
          </h1>
          
          <p className="text-white/90 text-lg leading-relaxed mb-8 max-w-md mx-auto">
            Skip repetitive tasks and get highly productive through our expert guidance. 
            Start your journey to study abroad and save tons of time!
          </p>
          
          <div className="text-white/60 text-sm">
            © 2024 Moves International. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="w-full max-w-md flex flex-col justify-center px-8 py-12 bg-white">
        <div className="w-full max-w-sm mx-auto">
          {/* Logo for mobile */}
          <div className="text-center mb-8 lg:hidden">
            <img 
              src="/lovable-uploads/abcbb2a1-5db8-45ce-8215-42e053f17039.png" 
              alt="Moves International" 
              className="h-12 w-auto mx-auto mb-4"
            />
            <h2 className="text-xl font-bold text-gray-900">Moves International</h2>
          </div>

          <div className="text-right mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
            <p className="text-gray-600 text-sm">
              Don't have an account? <span className="text-primary font-medium underline cursor-pointer">Create a new account now</span>, it's FREE! Takes less than a minute.
            </p>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100">
              <TabsTrigger value="signin" className="text-sm">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="text-sm">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-primary focus:ring-0 placeholder:text-gray-400"
                    placeholder="hisalim.ux@gmail.com"
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-primary focus:ring-0 placeholder:text-gray-400"
                    placeholder="Password"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg mt-8" 
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Login Now'}
                </Button>
                
                <div className="flex items-center my-6">
                  <Separator className="flex-1" />
                  <span className="px-3 text-gray-500 text-sm">or</span>
                  <Separator className="flex-1" />
                </div>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full h-12 border-gray-200 hover:bg-gray-50 rounded-lg"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Login with Google
                </Button>
                
                <div className="text-center mt-6">
                  <ForgotPasswordDialog>
                    <Button 
                      type="button" 
                      variant="link" 
                      className="p-0 h-auto text-sm text-gray-500 hover:text-primary"
                    >
                      Forget password <span className="underline">Click here</span>
                    </Button>
                  </ForgotPasswordDialog>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-primary focus:ring-0 placeholder:text-gray-400"
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-primary focus:ring-0 placeholder:text-gray-400"
                    minLength={6}
                    placeholder="Create a password (min. 6 characters)"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg mt-8" 
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
                
                <div className="flex items-center my-6">
                  <Separator className="flex-1" />
                  <span className="px-3 text-gray-500 text-sm">or</span>
                  <Separator className="flex-1" />
                </div>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full h-12 border-gray-200 hover:bg-gray-50 rounded-lg"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Sign up with Google
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
