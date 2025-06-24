
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, Calendar, GraduationCap, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CounsellingBookingFormProps {
  defaultDestination?: string;
}

const CounsellingBookingForm = ({ defaultDestination }: CounsellingBookingFormProps) => {
  const [formData, setFormData] = useState({
    student_name: '',
    student_email: '',
    student_phone: '',
    preferred_destination: defaultDestination || '',
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

  // Fetch destinations
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('counselling_bookings')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your counselling request has been submitted successfully. We'll contact you within 24 hours.",
      });

      // Reset form
      setFormData({
        student_name: '',
        student_email: '',
        student_phone: '',
        preferred_destination: defaultDestination || '',
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

  return (
    <Card className="shadow-xl border-0">
      <CardHeader className="bg-primary text-white rounded-t-lg">
        <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
          <GraduationCap className="h-6 w-6" />
          Book Free Counselling
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
              placeholder="Enter your full name"
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
                  placeholder="your.email@example.com"
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
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="preferred_destination">Preferred Destination *</Label>
              <Select value={formData.preferred_destination} onValueChange={(value) => handleInputChange('preferred_destination', value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select destination" />
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
              <Select value={formData.study_level} onValueChange={(value) => handleInputChange('study_level', value)}>
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

          <div className="space-y-2">
            <Label htmlFor="course_interest">Course Interest</Label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="course_interest"
                value={formData.course_interest}
                onChange={(e) => handleInputChange('course_interest', e.target.value)}
                className="pl-10 h-12"
                placeholder="e.g., MBA, Computer Science, Engineering"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="current_education_level">Current Education Level</Label>
              <Select value={formData.current_education_level} onValueChange={(value) => handleInputChange('current_education_level', value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select current level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high-school">High School</SelectItem>
                  <SelectItem value="diploma">Diploma</SelectItem>
                  <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                  <SelectItem value="masters">Master's Degree</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="english_test_score">English Test Score</Label>
              <Input
                id="english_test_score"
                value={formData.english_test_score}
                onChange={(e) => handleInputChange('english_test_score', e.target.value)}
                className="h-12"
                placeholder="e.g., IELTS 7.0, TOEFL 100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="work_experience">Work Experience</Label>
            <Input
              id="work_experience"
              value={formData.work_experience}
              onChange={(e) => handleInputChange('work_experience', e.target.value)}
              className="h-12"
              placeholder="e.g., 2 years in IT industry"
            />
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
              <Select value={formData.preferred_time} onValueChange={(value) => handleInputChange('preferred_time', value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                  <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
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
              placeholder="Tell us about your study goals and any specific questions"
              rows={4}
              className="resize-none"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full h-12 text-lg bg-accent hover:bg-accent/90">
            {loading ? 'Submitting...' : 'Book Free Counselling'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CounsellingBookingForm;
