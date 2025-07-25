import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Clock, Search, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('all');
  const [modeFilter, setModeFilter] = useState('all');

  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_published', true)
        .gte('start_time', new Date().toISOString())
        .order('is_featured', { ascending: false })
        .order('start_time', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  const filteredEvents = events?.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = eventTypeFilter === 'all' || event.event_type === eventTypeFilter;
    const matchesMode = modeFilter === 'all' || event.mode === modeFilter;
    
    return matchesSearch && matchesType && matchesMode;
  });

  const featuredEvents = filteredEvents?.filter(event => event.is_featured);
  const regularEvents = filteredEvents?.filter(event => !event.is_featured);

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

  const EventCard = ({ event, featured = false }: { event: any; featured?: boolean }) => (
    <Card className={`group hover:shadow-lg transition-shadow ${featured ? 'ring-2 ring-primary' : ''}`}>
      {event.image_url && (
        <div className="aspect-video overflow-hidden rounded-t-lg">
          <img 
            src={event.image_url} 
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {featured && (
              <Badge variant="default" className="mb-2">Featured</Badge>
            )}
            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
              {event.title}
            </h3>
            <Badge className={`mt-2 ${getEventTypeColor(event.event_type)}`}>
              {event.event_type}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {event.description && (
          <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
        )}
        
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(event.start_time), 'PPP')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>
              {format(new Date(event.start_time), 'p')} - {format(new Date(event.end_time), 'p')}
            </span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
              {event.city && <span>, {event.city}</span>}
            </div>
          )}
          <div className="flex items-center gap-2">
            <Badge variant="outline">{event.mode}</Badge>
            {event.is_free ? (
              <Badge variant="secondary">Free</Badge>
            ) : (
              <Badge variant="secondary">${event.ticket_price}</Badge>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Link to={`/events/${event.slug}`} className="flex-1">
            <Button className="w-full">View Details</Button>
          </Link>
          {event.event_link && (
            <Button variant="outline" size="sm" asChild>
              <a href={event.event_link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto animate-pulse mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <div className="aspect-video bg-gray-200 animate-pulse"></div>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our educational events, webinars, and workshops to explore study abroad opportunities
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Event Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Webinar">Webinar</SelectItem>
              <SelectItem value="In-Person">In-Person</SelectItem>
              <SelectItem value="Workshop">Workshop</SelectItem>
              <SelectItem value="Open Day">Open Day</SelectItem>
              <SelectItem value="Info Session">Info Session</SelectItem>
            </SelectContent>
          </Select>
          <Select value={modeFilter} onValueChange={setModeFilter}>
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue placeholder="Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Modes</SelectItem>
              <SelectItem value="Online">Online</SelectItem>
              <SelectItem value="Offline">Offline</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Featured Events */}
        {featuredEvents && featuredEvents.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} featured />
              ))}
            </div>
          </div>
        )}

        {/* Regular Events */}
        {regularEvents && regularEvents.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {featuredEvents && featuredEvents.length > 0 ? 'More Events' : 'All Events'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* No Events */}
        {filteredEvents && filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">
              {searchTerm || eventTypeFilter !== 'all' || modeFilter !== 'all' 
                ? 'Try adjusting your search criteria'
                : 'Check back soon for upcoming events'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;