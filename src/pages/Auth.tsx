
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-primary/80 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-lg rotate-12"></div>
          <div className="absolute top-40 left-40 w-24 h-24 border border-white/20 rounded-lg -rotate-12"></div>
          <div className="absolute bottom-40 right-20 w-40 h-40 border border-white/20 rounded-lg rotate-45"></div>
          <div className="absolute bottom-20 right-40 w-20 h-20 border border-white/20 rounded-lg -rotate-45"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 py-12">
          <div className="max-w-md">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
                <img 
                  src="/lovable-uploads/abcbb2a1-5db8-45ce-8215-42e053f17039.png" 
                  alt="Moves International" 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="text-white text-xl font-bold">Moves International</span>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-6">
              Hello <br />
              Future Student! 👋
            </h1>
            
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              Start your journey to study abroad with expert guidance and personalized support. 
              Get access to top universities worldwide and make your dreams come true!
            </p>
            
            <div className="text-white/70 text-sm">
              © 2024 Moves International. All rights reserved.
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-12 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="text-center lg:hidden">
            <img 
              src="/lovable-uploads/abcbb2a1-5db8-45ce-8215-42e053f17039.png" 
              alt="Moves International" 
              className="h-12 w-auto mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-900">Moves International</h2>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
            <p className="text-gray-600">
              Don't have an account? <span className="text-primary font-medium">Create a new account now</span>, it's FREE! Takes less than a minute.
            </p>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="signin" className="text-sm">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="text-sm">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <Card className="border-0 shadow-none bg-transparent">
                <CardContent className="p-0">
                  <form onSubmit={handleSignIn} className="space-y-6">
                    <div>
                      <Label htmlFor="signin-email" className="text-gray-700 font-medium">Email</Label>
                      <Input
                        id="signin-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 h-12 border-gray-200 focus:border-primary focus:ring-primary"
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="signin-password" className="text-gray-700 font-medium">Password</Label>
                      <Input
                        id="signin-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 h-12 border-gray-200 focus:border-primary focus:ring-primary"
                        placeholder="Enter your password"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium" 
                      disabled={loading}
                    >
                      {loading ? 'Signing in...' : 'Login Now'}
                    </Button>
                    
                    <div className="text-center">
                      <ForgotPasswordDialog>
                        <Button 
                          type="button" 
                          variant="link" 
                          className="p-0 h-auto text-sm text-gray-500 hover:text-primary"
                        >
                          Forget password Click here
                        </Button>
                      </ForgotPasswordDialog>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="signup">
              <Card className="border-0 shadow-none bg-transparent">
                <CardContent className="p-0">
                  <form onSubmit={handleSignUp} className="space-y-6">
                    <div>
                      <Label htmlFor="signup-email" className="text-gray-700 font-medium">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 h-12 border-gray-200 focus:border-primary focus:ring-primary"
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="signup-password" className="text-gray-700 font-medium">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 h-12 border-gray-200 focus:border-primary focus:ring-primary"
                        minLength={6}
                        placeholder="Create a password (min. 6 characters)"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium" 
                      disabled={loading}
                    >
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
