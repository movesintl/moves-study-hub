import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { UserPlus } from 'lucide-react';

interface EventRegistrationFormProps {
  eventId: string;
  eventTitle: string;
  onSuccess?: () => void;
}

const EventRegistrationForm: React.FC<EventRegistrationFormProps> = ({ eventId, eventTitle, onSuccess }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    designation: '',
    message: ''
  });

  const registerForEvent = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase
        .from('event_registrations')
        .insert([{ ...data, event_id: eventId }]);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: 'Registration successful!', description: 'We will contact you with event details.' });
      setFormData({ name: '', email: '', phone: '', company: '', designation: '', message: '' });
      queryClient.invalidateQueries({ queryKey: ['event-registrations'] });
      onSuccess?.();
    },
    onError: (error: any) => {
      if (error.message.includes('duplicate key')) {
        toast({ title: 'Already registered', description: 'You are already registered for this event.', variant: 'destructive' });
      } else {
        toast({ title: 'Registration failed', description: error.message, variant: 'destructive' });
      }
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerForEvent.mutate(formData);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Register for {eventTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="company">Company/Organization</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="designation">Designation</Label>
            <Input
              id="designation"
              value={formData.designation}
              onChange={(e) => handleInputChange('designation', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              rows={3}
            />
          </div>

          <Button type="submit" disabled={registerForEvent.isPending} className="w-full">
            {registerForEvent.isPending ? 'Registering...' : 'Register for Event'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EventRegistrationForm;