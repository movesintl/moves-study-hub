
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, User } from 'lucide-react';
import CounsellingBookingForm from '@/components/forms/CounsellingBookingForm';

interface CounsellingBooking {
  id: string;
  student_name: string;
  student_email: string;
  student_phone: string;
  preferred_destination?: string;
  study_level?: string;
  course_interest?: string;
  current_education_level?: string;
  english_test_score?: string;
  work_experience?: string;
  message?: string;
  preferred_date?: string;
  preferred_time?: string;
  status: string;
  admin_notes?: string;
  created_at: string;
}

const Counselling = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<CounsellingBooking[]>([]);

  useEffect(() => {
    if (user) {
      fetchBookings();
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const handleBookingSuccess = () => {
    fetchBookings();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Get Counselling</h1>
        <p className="text-gray-600">Book a free counselling session with our experts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Form */}
        <div>
          <CounsellingBookingForm onSuccess={handleBookingSuccess} />
        </div>

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
                      {booking.course_interest && (
                        <p><strong>Course Interest:</strong> {booking.course_interest}</p>
                      )}
                      {booking.current_education_level && (
                        <p><strong>Current Education:</strong> {booking.current_education_level}</p>
                      )}
                      {booking.english_test_score && (
                        <p><strong>English Test Score:</strong> {booking.english_test_score}</p>
                      )}
                      {booking.work_experience && (
                        <p><strong>Work Experience:</strong> {booking.work_experience}</p>
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
