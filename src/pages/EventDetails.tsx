import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, User, Mail, Phone, ExternalLink, ArrowLeft, Share2 } from 'lucide-react';
import { format } from 'date-fns';

const EventDetails = () => {
  const { slug } = useParams();

  const { data: event, isLoading, error } = useQuery({
    queryKey: ['event', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  const getEventTypeColor = (type: string) => {
    const colors = {
      'Webinar': 'bg-blue-100 text-blue-800',
      'In-Person': 'bg-green-100 text-green-800',
      'Workshop': 'bg-purple-100 text-purple-800',
      'Open Day': 'bg-orange-100 text-orange-800',
      'Info Session': 'bg-gray-100 text-gray-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const shareEvent = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.title,
        text: event?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="aspect-video bg-gray-200 rounded animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <Link to="/events">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isEventPast = new Date(event.end_time) < new Date();
  const registrationDeadlinePassed = event.registration_deadline && new Date(event.registration_deadline) < new Date();

  return (
    <>
      <Helmet>
        <title>{event.meta_title || event.title} | Moves International</title>
        <meta name="description" content={event.meta_description || event.description} />
        <meta property="og:title" content={event.title} />
        <meta property="og:description" content={event.description} />
        {event.image_url && <meta property="og:image" content={event.image_url} />}
        <meta property="og:type" content="event" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/events">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Events
              </Button>
            </Link>
            <Button variant="outline" onClick={shareEvent}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Event Header */}
          <div className="space-y-4 mb-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={getEventTypeColor(event.event_type)}>
                {event.event_type}
              </Badge>
              <Badge variant="outline">{event.mode}</Badge>
              {event.is_featured && (
                <Badge variant="default">Featured</Badge>
              )}
              {event.is_free ? (
                <Badge variant="secondary">Free</Badge>
              ) : (
                <Badge variant="secondary">${event.ticket_price}</Badge>
              )}
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900">{event.title}</h1>
            
            {isEventPast && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 font-medium">This event has ended.</p>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Event Image */}
              {event.image_url && (
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img 
                    src={event.image_url} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Description */}
              {event.description && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                    <div className="prose max-w-none">
                      <p className="whitespace-pre-wrap">{event.description}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Event Details */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Event Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">{format(new Date(event.start_time), 'PPPP')}</p>
                        <p className="text-sm text-gray-600">
                          {format(new Date(event.start_time), 'p')} - {format(new Date(event.end_time), 'p')}
                        </p>
                      </div>
                    </div>

                    {event.location && (
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium">{event.location}</p>
                          {event.city && <p className="text-sm text-gray-600">{event.city}</p>}
                        </div>
                      </div>
                    )}

                    {event.registration_deadline && (
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Registration Deadline</p>
                          <p className="text-sm text-gray-600">
                            {format(new Date(event.registration_deadline), 'PPP')}
                          </p>
                        </div>
                      </div>
                    )}

                    {event.host_name && (
                      <div className="flex items-start gap-3">
                        <User className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Host</p>
                          <p className="text-sm text-gray-600">{event.host_name}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Registration/Action */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Join This Event</h3>
                  
                  {isEventPast ? (
                    <p className="text-gray-600 mb-4">This event has ended.</p>
                  ) : registrationDeadlinePassed ? (
                    <p className="text-yellow-600 mb-4">Registration deadline has passed.</p>
                  ) : (
                    <div className="space-y-4">
                      {event.registration_required && event.registration_form_url ? (
                        <Button asChild className="w-full">
                          <a href={event.registration_form_url} target="_blank" rel="noopener noreferrer">
                            Register Now
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </a>
                        </Button>
                      ) : event.event_link ? (
                        <Button asChild className="w-full">
                          <a href={event.event_link} target="_blank" rel="noopener noreferrer">
                            Join Event
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Contact</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <a href={`mailto:${event.contact_email}`} className="text-primary hover:underline">
                        {event.contact_email}
                      </a>
                    </div>
                    {event.contact_phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <a href={`tel:${event.contact_phone}`} className="text-primary hover:underline">
                          {event.contact_phone}
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;