
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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

interface BookingUpdateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBooking: CounsellingBooking | null;
  updateForm: {
    status: string;
    admin_notes: string;
  };
  onUpdateFormChange: (field: string, value: string) => void;
  onUpdate: () => void;
}

const BookingUpdateDialog = ({ 
  isOpen, 
  onClose, 
  selectedBooking, 
  updateForm, 
  onUpdateFormChange, 
  onUpdate 
}: BookingUpdateDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
              onValueChange={(value) => onUpdateFormChange('status', value)}
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
              onChange={(e) => onUpdateFormChange('admin_notes', e.target.value)}
              placeholder="Add notes about this booking..."
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onUpdate}>
              Update Booking
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingUpdateDialog;
