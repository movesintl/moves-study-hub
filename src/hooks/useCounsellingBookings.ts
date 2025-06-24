
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

export const useCounsellingBookings = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<CounsellingBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<CounsellingBooking | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    status: '',
    admin_notes: '',
  });

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

  const handleUpdateFormChange = (field: string, value: string) => {
    setUpdateForm(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return {
    bookings,
    loading,
    selectedBooking,
    isDialogOpen,
    updateForm,
    openUpdateDialog,
    handleUpdateBooking,
    getStatusColor,
    getStatusCounts,
    handleUpdateFormChange,
    setIsDialogOpen,
  };
};
