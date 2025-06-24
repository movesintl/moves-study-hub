
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';
import { useCounsellingBookings } from '@/hooks/useCounsellingBookings';
import BookingStatsCards from '@/components/admin/counselling/BookingStatsCards';
import BookingCard from '@/components/admin/counselling/BookingCard';
import BookingUpdateDialog from '@/components/admin/counselling/BookingUpdateDialog';

const CounsellingBookings = () => {
  const {
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
  } = useCounsellingBookings();

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

      <BookingStatsCards stats={stats} />

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
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onUpdateClick={openUpdateDialog}
                  getStatusColor={getStatusColor}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <BookingUpdateDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        selectedBooking={selectedBooking}
        updateForm={updateForm}
        onUpdateFormChange={handleUpdateFormChange}
        onUpdate={handleUpdateBooking}
      />
    </div>
  );
};

export default CounsellingBookings;
