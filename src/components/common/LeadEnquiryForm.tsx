
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, Globe, Calendar, GraduationCap, Users, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const LeadEnquiryForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    student_name: '',
    student_email: user?.email || '',
    student_phone: '',
    preferred_destination: '',
    study_level: '',
    course_interest: '',
    current_education_level: '',
    english_test_score: '',
    work_experience: '',
    preferred_date: '',
    preferred_time: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Fetch destinations from database
  const { data: destinations } = useQuery({
    queryKey: ['destinations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('id, name')
        .order('name');
      if (error) throw error;
      return data;
    },
  });

  // Fetch study levels
  const { data: studyLevels } = useQuery({
    queryKey: ['study-levels'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('course_study_levels')
        .select('id, name')
        .order('name');
      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('counselling_bookings')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: 'Enquiry Submitted!',
        description: 'Thank you for your interest. Our counsellor will contact you within 24 hours.',
      });

      // Reset form
      setFormData({
        student_name: '',
        student_email: user?.email || '',
        student_phone: '',
        preferred_destination: '',
        study_level: '',
        course_interest: '',
        current_education_level: '',
        english_test_score: '',
        work_experience: '',
        preferred_date: '',
        preferred_time: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Start Your Journey Today
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fill out the form below and get personalized guidance from our expert counsellors. 
            Take the first step towards your international education dreams.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Form Section - Left Side */}
          <div className="order-2 lg:order-1">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-primary to-accent text-white rounded-t-lg">
                <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                  <GraduationCap className="h-6 w-6" />
                  Get Free Counselling
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="student_name">Full Name *</Label>
                    <Input
                      id="student_name"
                      value={formData.student_name}
                      onChange={(e) => handleInputChange('student_name', e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="student_email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="student_email"
                          type="email"
                          value={formData.student_email}
                          onChange={(e) => handleInputChange('student_email', e.target.value)}
                          required
                          className="pl-10 h-12"
                          disabled={!!user?.email}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student_phone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="student_phone"
                          type="tel"
                          value={formData.student_phone}
                          onChange={(e) => handleInputChange('student_phone', e.target.value)}
                          required
                          className="pl-10 h-12"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="preferred_destination">Destination Country *</Label>
                      <Select onValueChange={(value) => handleInputChange('preferred_destination', value)}>
                        <SelectTrigger className="h-12">
                          <div className="flex items-center">
                            <Globe className="mr-2 h-5 w-5 text-gray-400" />
                            <SelectValue placeholder="Select destination" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {destinations?.map((destination) => (
                            <SelectItem key={destination.id} value={destination.name}>
                              {destination.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="study_level">Study Level</Label>
                      <Select onValueChange={(value) => handleInputChange('study_level', value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select study level" />
                        </SelectTrigger>
                        <SelectContent>
                          {studyLevels?.map((level) => (
                            <SelectItem key={level.id} value={level.name}>
                              {level.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="course_interest">Course Interest</Label>
                      <Input
                        id="course_interest"
                        value={formData.course_interest}
                        onChange={(e) => handleInputChange('course_interest', e.target.value)}
                        placeholder="e.g., MBA, Engineering, IT"
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="current_education_level">Current Education Level</Label>
                      <Select onValueChange={(value) => handleInputChange('current_education_level', value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select current level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="High School">High School</SelectItem>
                          <SelectItem value="Bachelor's Degree">Bachelor's Degree</SelectItem>
                          <SelectItem value="Master's Degree">Master's Degree</SelectItem>
                          <SelectItem value="PhD">PhD</SelectItem>
                          <SelectItem value="Diploma">Diploma</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="english_test_score">English Test Score</Label>
                      <Input
                        id="english_test_score"
                        value={formData.english_test_score}
                        onChange={(e) => handleInputChange('english_test_score', e.target.value)}
                        placeholder="e.g., IELTS 7.0, TOEFL 100"
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="work_experience">Work Experience</Label>
                      <Input
                        id="work_experience"
                        value={formData.work_experience}
                        onChange={(e) => handleInputChange('work_experience', e.target.value)}
                        placeholder="e.g., 2 years in IT"
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="preferred_date">Preferred Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="preferred_date"
                          type="date"
                          value={formData.preferred_date}
                          onChange={(e) => handleInputChange('preferred_date', e.target.value)}
                          className="pl-10 h-12"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferred_time">Preferred Time</Label>
                      <Select onValueChange={(value) => handleInputChange('preferred_time', value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</SelectItem>
                          <SelectItem value="Afternoon (12 PM - 5 PM)">Afternoon (12 PM - 5 PM)</SelectItem>
                          <SelectItem value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us more about your study goals..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full h-12 text-lg bg-gradient-to-r from-accent to-orange-500 hover:from-accent/90 hover:to-orange-500/90 shadow-lg"
                  >
                    {loading ? 'Submitting...' : 'Get Free Counselling'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Image Section - Right Side */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&h=600"
                  alt="Student studying abroad"
                  className="w-full h-80 object-cover rounded-2xl mb-6"
                />
                
                {/* Statistics Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-4 text-white text-center">
                    <Users className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-2xl font-bold">10,000+</div>
                    <div className="text-sm opacity-90">Students Placed</div>
                  </div>
                  <div className="bg-gradient-to-r from-accent to-orange-500 rounded-xl p-4 text-white text-center">
                    <Award className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-2xl font-bold">99%</div>
                    <div className="text-sm opacity-90">Success Rate</div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent border-2 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">Trusted by thousands</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Join successful students who achieved their dreams with our expert guidance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadEnquiryForm;
