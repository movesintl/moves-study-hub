
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { MessageCircle, Calendar, Clock, User, Phone, Mail, Edit, BookOpen, GraduationCap } from 'lucide-react';

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
  updated_at: string;
}

const CounsellingBookings = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<CounsellingBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<CounsellingBooking | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    status: '',
    admin_notes: '',
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('counselling_bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Error",
        description: "Failed to fetch counselling bookings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBooking = async () => {
    if (!selectedBooking) return;

    try {
      const { error } = await supabase
        .from('counselling_bookings')
        .update({
          status: updateForm.status,
          admin_notes: updateForm.admin_notes,
        })
        .eq('id', selectedBooking.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Booking updated successfully!",
      });

      setIsDialogOpen(false);
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking:', error);
      toast({
        title: "Error",
        description: "Failed to update booking.",
        variant: "destructive",
      });
    }
  };

  const openUpdateDialog = (booking: CounsellingBooking) => {
    setSelectedBooking(booking);
    setUpdateForm({
      status: booking.status,
      admin_notes: booking.admin_notes || '',
    });
    setIsDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusCounts = () => {
    return {
      total: bookings.length,
      pending: bookings.filter(b => b.status === 'pending').length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      completed: bookings.filter(b => b.status === 'completed').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length,
    };
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading counselling bookings...</div>;
  }

  const stats = getStatusCounts();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Counselling Bookings</h1>
        <p className="text-gray-600">Manage student counselling session requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-gray-600">Total Bookings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-sm text-gray-600">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
            <p className="text-sm text-gray-600">Confirmed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.completed}</div>
            <p className="text-sm text-gray-600">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
            <p className="text-sm text-gray-600">Cancelled</p>
          </CardContent>
        </Card>
      </div>

      {/* Bookings List */}
      <Card>
        <CardHeader>
          <CardTitle>All Counselling Bookings</CardTitle>
          <CardDescription>Manage and update counselling session bookings</CardDescription>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No bookings yet</h3>
              <p className="text-gray-600">Counselling bookings will appear here when students submit requests.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-gray-500" />
                      <div>
                        <h3 className="font-semibold text-lg">{booking.student_name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            <span>{booking.student_email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            <span>{booking.student_phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openUpdateDialog(booking)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Update
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Counselling Booking</DialogTitle>
                            <DialogDescription>
                              Update the status and add notes for {selectedBooking?.student_name}'s booking
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>Status</Label>
                              <Select
                                value={updateForm.status}
                                onValueChange={(value) => setUpdateForm(prev => ({ ...prev, status: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="confirmed">Confirmed</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Admin Notes</Label>
                              <Textarea
                                value={updateForm.admin_notes}
                                onChange={(e) => setUpdateForm(prev => ({ ...prev, admin_notes: e.target.value }))}
                                placeholder="Add notes about this booking..."
                                rows={3}
                              />
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button onClick={handleUpdateBooking}>
                                Update Booking
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      {booking.preferred_destination && (
                        <p><strong>Destination:</strong> {booking.preferred_destination}</p>
                      )}
                      {booking.study_level && (
                        <p><strong>Study Level:</strong> {booking.study_level}</p>
                      )}
                      {booking.course_interest && (
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          <span><strong>Course Interest:</strong> {booking.course_interest}</span>
                        </div>
                      )}
                      {booking.current_education_level && (
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          <span><strong>Current Education:</strong> {booking.current_education_level}</span>
                        </div>
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
                          <span><strong>Date:</strong> {new Date(booking.preferred_date).toLocaleDateString()}</span>
                          {booking.preferred_time && (
                            <>
                              <Clock className="h-4 w-4 ml-2" />
                              <span>{booking.preferred_time}</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-500">
                        <strong>Submitted:</strong> {new Date(booking.created_at).toLocaleDateString()}
                      </p>
                      {booking.updated_at !== booking.created_at && (
                        <p className="text-gray-500">
                          <strong>Last Updated:</strong> {new Date(booking.updated_at).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>

                  {booking.message && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium text-sm">Message:</p>
                      <p className="text-sm text-gray-700 mt-1">{booking.message}</p>
                    </div>
                  )}

                  {booking.admin_notes && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium text-sm text-blue-800">Admin Notes:</p>
                      <p className="text-sm text-blue-700 mt-1">{booking.admin_notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CounsellingBookings;
