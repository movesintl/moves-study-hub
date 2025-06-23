
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, Globe, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LeadEnquiryForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    destination: '',
    course: '',
    intakeDate: '',
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, this would save to database
    console.log('Form submitted:', formData);
    
    toast({
      title: 'Enquiry Submitted!',
      description: 'Thank you for your interest. Our counsellor will contact you within 24 hours.',
    });

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      destination: '',
      course: '',
      intakeDate: '',
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Start Your Journey Today
          </h2>
          <p className="text-xl text-gray-600">
            Fill out the form below and get personalized guidance from our expert counsellors.
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="bg-primary text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center">Get Free Counselling</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="pl-10 h-12"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      className="pl-10 h-12"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination Country *</Label>
                  <Select onValueChange={(value) => handleInputChange('destination', value)}>
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
                  <Label htmlFor="course">Course Interest</Label>
                  <Input
                    id="course"
                    value={formData.course}
                    onChange={(e) => handleInputChange('course', e.target.value)}
                    placeholder="e.g., MBA, Engineering, IT"
                    className="h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="intakeDate">Preferred Intake Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Select onValueChange={(value) => handleInputChange('intakeDate', value)}>
                    <SelectTrigger className="h-12 pl-10">
                      <SelectValue placeholder="Select intake date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024-feb">February 2024</SelectItem>
                      <SelectItem value="2024-jul">July 2024</SelectItem>
                      <SelectItem value="2024-sep">September 2024</SelectItem>
                      <SelectItem value="2025-feb">February 2025</SelectItem>
                      <SelectItem value="2025-jul">July 2025</SelectItem>
                      <SelectItem value="2025-sep">September 2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 text-lg bg-accent hover:bg-accent/90">
                Get Free Counselling
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LeadEnquiryForm;
