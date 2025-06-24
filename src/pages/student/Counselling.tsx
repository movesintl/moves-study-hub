
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { MessageCircle, Calendar, Clock, User } from 'lucide-react';

interface CounsellingBooking {
  id: string;
  student_name: string;
  student_email: string;
  student_phone: string;
  preferred_destination?: string;
  study_level?: string;
  message?: string;
  preferred_date?: string;
  preferred_time?: string;
  status: string;
  admin_notes?: string;
  created_at: string;
}

interface Destination {
  id: string;
  name: string;
}

interface StudyLevel {
  id: string;
  name: string;
}

const Counselling = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState<CounsellingBooking[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [studyLevels, setStudyLevels] = useState<StudyLevel[]>([]);
  const [formData, setFormData] = useState({
    student_name: '',
    student_phone: '',
    preferred_destination: '',
    study_level: '',
    message: '',
    preferred_date: '',
    preferred_time: '',
  });

  useEffect(() => {
    if (user) {
      fetchBookings();
      fetchDestinations();
      fetchStudyLevels();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('counselling_bookings')
        .select('*')
        .eq('student_email', user?.email)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching bookings:', error);
        toast({
          title: "Error",
          description: "Failed to fetch your counselling bookings.",
          variant: "destructive",
        });
        return;
      }
      
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Error",
        description: "Failed to fetch your counselling bookings.",
        variant: "destructive",
      });
    }
  };

  const fetchDestinations = async () => {
    try {
      const { data, error } = await supabase
        .from('destinations')
        .select('id, name')
        .order('name');

      if (error) throw error;
      setDestinations(data || []);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    }
  };

  const fetchStudyLevels = async () => {
    try {
      const { data, error } = await supabase
        .from('course_study_levels')
        .select('id, name')
        .order('name');

      if (error) throw error;
      setStudyLevels(data || []);
    } catch (error) {
      console.error('Error fetching study levels:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email) {
      toast({
        title: "Error",
        description: "You must be logged in to book counselling.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('counselling_bookings')
        .insert([
          {
            ...formData,
            student_email: user.email,
          }
        ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your counselling request has been submitted successfully!",
      });

      // Reset form
      setFormData({
        student_name: '',
        student_phone: '',
        preferred_destination: '',
        study_level: '',
        message: '',
        preferred_date: '',
        preferred_time: '',
      });

      // Refresh bookings
      fetchBookings();
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: "Error",
        description: "Failed to submit counselling request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Get Counselling</h1>
        <p className="text-gray-600">Book a free counselling session with our experts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Book Free Counselling
            </CardTitle>
            <CardDescription>
              Fill in your details to book a free counselling session
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="student_name">Full Name *</Label>
                <Input
                  id="student_name"
                  value={formData.student_name}
                  onChange={(e) => handleInputChange('student_name', e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="student_phone">Phone Number *</Label>
                <Input
                  id="student_phone"
                  value={formData.student_phone}
                  onChange={(e) => handleInputChange('student_phone', e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div>
                <Label htmlFor="preferred_destination">Preferred Destination</Label>
                <Select value={formData.preferred_destination} onValueChange={(value) => handleInputChange('preferred_destination', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinations.map((destination) => (
                      <SelectItem key={destination.id} value={destination.name}>
                        {destination.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="study_level">Study Level</Label>
                <Select value={formData.study_level} onValueChange={(value) => handleInputChange('study_level', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select study level" />
                  </SelectTrigger>
                  <SelectContent>
                    {studyLevels.map((level) => (
                      <SelectItem key={level.id} value={level.name}>
                        {level.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="preferred_date">Preferred Date</Label>
                <Input
                  id="preferred_date"
                  type="date"
                  value={formData.preferred_date}
                  onChange={(e) => handleInputChange('preferred_date', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="preferred_time">Preferred Time</Label>
                <Select value={formData.preferred_time} onValueChange={(value) => handleInputChange('preferred_time', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select preferred time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                    <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Tell us about your study goals and any specific questions"
                  rows={3}
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Submitting...' : 'Book Free Counselling'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* My Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>My Counselling Bookings</CardTitle>
            <CardDescription>Track your counselling session requests</CardDescription>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No counselling bookings yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="font-medium">{booking.student_name}</span>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      {booking.preferred_destination && (
                        <p><strong>Destination:</strong> {booking.preferred_destination}</p>
                      )}
                      {booking.study_level && (
                        <p><strong>Study Level:</strong> {booking.study_level}</p>
                      )}
                      {booking.preferred_date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(booking.preferred_date).toLocaleDateString()}</span>
                          {booking.preferred_time && (
                            <>
                              <Clock className="h-4 w-4 ml-2" />
                              <span>{booking.preferred_time}</span>
                            </>
                          )}
                        </div>
                      )}
                      {booking.message && (
                        <p><strong>Message:</strong> {booking.message}</p>
                      )}
                      {booking.admin_notes && (
                        <p className="text-blue-600"><strong>Admin Notes:</strong> {booking.admin_notes}</p>
                      )}
                      <p className="text-xs text-gray-500">
                        Submitted: {new Date(booking.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Counselling;
