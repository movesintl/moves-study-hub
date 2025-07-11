import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone, Linkedin, Twitter, Facebook } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  designation: string;
  description?: string;
  email?: string;
  phone?: string;
  profile_image_url?: string;
  social_media_links: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  display_order: number;
}

const OurStaff = () => {
  const { data: staffMembers, isLoading } = useQuery({
    queryKey: ['public-staff-members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('staff_members')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as StaffMember[];
    },
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Staff</h2>
          <p className="text-lg text-gray-600">Loading our amazing team...</p>
        </div>
      </div>
    );
  }

  if (!staffMembers || staffMembers.length === 0) {
    return null;
  }

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Staff</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our dedicated team of education consultants who are committed to helping you achieve your academic goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {staffMembers.map((staff) => (
            <Card key={staff.id} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={staff.profile_image_url || ''} alt={staff.name} />
                    <AvatarFallback className="text-lg">
                      {getInitials(staff.name)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {staff.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    {staff.designation}
                  </p>
                  {staff.description && (
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {staff.description}
                    </p>
                  )}
                </div>

                {/* Contact Information */}
                <div className="space-y-2 mb-4">
                  {staff.email && (
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <a 
                        href={`mailto:${staff.email}`}
                        className="hover:text-primary transition-colors"
                      >
                        {staff.email}
                      </a>
                    </div>
                  )}
                  {staff.phone && (
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <a 
                        href={`tel:${staff.phone}`}
                        className="hover:text-primary transition-colors"
                      >
                        {staff.phone}
                      </a>
                    </div>
                  )}
                </div>

                {/* Social Media Links */}
                {(staff.social_media_links?.linkedin || 
                  staff.social_media_links?.twitter || 
                  staff.social_media_links?.facebook) && (
                  <div className="flex justify-center gap-3">
                    {staff.social_media_links.linkedin && (
                      <a 
                        href={staff.social_media_links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                    {staff.social_media_links.twitter && (
                      <a 
                        href={staff.social_media_links.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-600 transition-colors"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                    )}
                    {staff.social_media_links.facebook && (
                      <a 
                        href={staff.social_media_links.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:text-blue-900 transition-colors"
                      >
                        <Facebook className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurStaff;