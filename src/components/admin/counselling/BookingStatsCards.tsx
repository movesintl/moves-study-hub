
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface BookingStatsCardsProps {
  stats: {
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  };
}

const BookingStatsCards = ({ stats }: BookingStatsCardsProps) => {
  return (
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
  );
};

export default BookingStatsCards;
