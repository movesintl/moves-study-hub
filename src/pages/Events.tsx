import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Clock, Search, ExternalLink, Home, ChevronRight, Filter } from 'lucide-react';
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
      'Webinar': 'bg-gradient-to-r from-blue-500/10 to-blue-600/10 text-blue-700 border-blue-200',
      'In-Person': 'bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 text-emerald-700 border-emerald-200',
      'Workshop': 'bg-gradient-to-r from-purple-500/10 to-purple-600/10 text-purple-700 border-purple-200',
      'Open Day': 'bg-gradient-to-r from-orange-500/10 to-orange-600/10 text-orange-700 border-orange-200',
      'Info Session': 'bg-gradient-to-r from-gray-500/10 to-gray-600/10 text-gray-700 border-gray-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gradient-to-r from-gray-500/10 to-gray-600/10 text-gray-700 border-gray-200';
  };

  const EventCard = ({ event, featured = false }: { event: any; featured?: boolean }) => (
    <Card className={`group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm ${featured ? 'ring-2 ring-primary shadow-lg' : ''}`}>
      {event.image_url && (
        <div className="aspect-video overflow-hidden rounded-t-xl relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
          <img 
            src={event.image_url} 
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {featured && (
              <Badge variant="default" className="mb-2 bg-gradient-to-r from-accent to-orange-400 text-white border-0 shadow-lg">Featured Event</Badge>
            )}
            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
              {event.title}
            </h3>
            <Badge variant="outline" className={`mt-2 border ${getEventTypeColor(event.event_type)}`}>
              {event.event_type}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {event.description && (
          <p className="text-muted-foreground mb-4 line-clamp-3">{event.description}</p>
        )}
        
        <div className="space-y-3 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-3">
            <div className="p-1 bg-gradient-to-br from-blue-500/10 to-blue-600/20 rounded">
              <Calendar className="h-3 w-3 text-blue-600" />
            </div>
            <span className="font-medium">{format(new Date(event.start_time), 'PPP')}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-1 bg-gradient-to-br from-green-500/10 to-green-600/20 rounded">
              <Clock className="h-3 w-3 text-green-600" />
            </div>
            <span className="font-medium">
              {format(new Date(event.start_time), 'p')} - {format(new Date(event.end_time), 'p')}
            </span>
          </div>
          {event.location && (
            <div className="flex items-center gap-3">
              <div className="p-1 bg-gradient-to-br from-purple-500/10 to-purple-600/20 rounded">
                <MapPin className="h-3 w-3 text-purple-600" />
              </div>
              <span className="font-medium">{event.location}</span>
              {event.city && <span>, {event.city}</span>}
            </div>
          )}
          <div className="flex items-center gap-3 pt-2">
            <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary">{event.mode}</Badge>
            {event.is_free ? (
              <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0">Free</Badge>
            ) : (
              <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">${event.ticket_price}</Badge>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Link to={`/events/${event.slug}`} className="flex-1">
            <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300">
              View Details
            </Button>
          </Link>
          {event.event_link && (
            <Button variant="outline" size="sm" asChild className="border-primary/30 hover:border-primary hover:bg-primary/5">
              <a href={event.event_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
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
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4 py-16">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="h-12 bg-gradient-to-r from-muted/50 to-muted rounded-xl animate-pulse mx-auto max-w-md"></div>
              <div className="h-6 bg-gradient-to-r from-muted/30 to-muted/60 rounded-lg animate-pulse mx-auto max-w-2xl"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                  <div className="aspect-video bg-gradient-to-r from-muted/50 to-muted animate-pulse"></div>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="h-6 bg-gradient-to-r from-muted/50 to-muted rounded w-3/4 animate-pulse"></div>
                      <div className="h-4 bg-gradient-to-r from-muted/30 to-muted/60 rounded w-1/2 animate-pulse"></div>
                      <div className="h-4 bg-gradient-to-r from-muted/30 to-muted/60 rounded animate-pulse"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Modern Hero Section */}
      <section className="relative bg-[#023047] text-white py-12 lg:py-20 overflow-hidden">
        {/* Enhanced background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-60 right-20 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 left-1/3 w-48 h-48 bg-white/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
          {/* Additional subtle decorative elements */}
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-accent rounded-full animate-ping opacity-20"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-ping delay-3000 opacity-30"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[500px]">
            {/* Left Column - Text Content */}
            <div className="space-y-8 animate-fade-in">
              {/* Enhanced Modern Breadcrumb */}
              <nav className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300 cursor-pointer group">
                  <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 group-hover:border-white/40 transition-all duration-300">
                    <Home className="h-3 w-3 text-white" />
                  </div>
                  <span>Home</span>
                </div>
                <ChevronRight className="h-4 w-4 text-white/50" />
                <span className="text-white font-medium">Events</span>
              </nav>

              {/* Hero Content */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-white border border-white/20 hover:border-white/30 transition-all duration-300 animate-scale-in">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                  Educational Events & Workshops
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-black leading-tight animate-fade-in">
                  <span className="block text-white drop-shadow-lg">
                    Upcoming
                  </span>
                  <span className="block bg-gradient-to-r from-accent via-orange-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
                    Events
                  </span>
                </h1>
                
                <p className="text-xl text-white/90 leading-relaxed max-w-2xl animate-fade-in delay-200">
                  Join our educational events, webinars, and workshops to explore study abroad opportunities and connect with experts.
                </p>
              </div>

              {/* Modern Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-300">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 shadow-xl hover:shadow-2xl hover:shadow-accent/25 transition-all duration-300 text-lg px-8 py-6 text-white transform hover:scale-105"
                >
                  <Link to="#events" className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Browse Events
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/30 hover:border-white hover:bg-white/10 backdrop-blur-sm text-white hover:text-white text-lg px-8 py-6 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                >
                  <Link to="/contact" className="flex items-center gap-2">
                    <ExternalLink className="h-5 w-5" />
                    Contact Us
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-8 pt-4 animate-fade-in delay-500">
                <div className="flex items-center gap-3 group">
                  <div className="p-2 bg-emerald-500/20 backdrop-blur-sm rounded-lg border border-emerald-500/30 group-hover:border-emerald-500/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/20">
                    <Calendar className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span className="text-white/90 font-medium">Regular Webinars</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="p-2 bg-blue-500/20 backdrop-blur-sm rounded-lg border border-blue-500/30 group-hover:border-blue-500/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/20">
                    <MapPin className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-white/90 font-medium">Global Reach</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="p-2 bg-purple-500/20 backdrop-blur-sm rounded-lg border border-purple-500/30 group-hover:border-purple-500/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/20">
                    <Clock className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="text-white/90 font-medium">Expert Sessions</span>
                </div>
              </div>
            </div>

            {/* Right Column - Featured Image */}
            <div className="relative hidden lg:block animate-fade-in delay-700">
              <div className="relative w-full h-[400px] bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-2xl hover:shadow-white/10 group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10"></div>
                
                <div className="relative h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-accent to-orange-400 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="h-12 w-12 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">Join Our Community</h3>
                  <p className="text-lg text-white/80 leading-relaxed">
                    Connect with fellow students and education experts worldwide
                  </p>
                  
                  {/* Floating elements */}
                  <div className="absolute top-8 right-8 w-16 h-16 bg-accent/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-accent/30">
                    <Clock className="h-6 w-6 text-accent" />
                  </div>
                  
                  <div className="absolute bottom-8 left-8 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Content Section */}
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-16" id="events">
          <div className="space-y-12">

        {/* Enhanced Modern Filters */}
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg">
          <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="p-2 bg-gradient-to-r from-primary/10 to-primary/20 rounded-lg">
                <Filter className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-semibold text-foreground">Filter Events:</span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/80 border-border/50 hover:border-primary/50 transition-colors"
                />
              </div>
              <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
                <SelectTrigger className="w-full md:w-[180px] bg-background/80 border-border/50 hover:border-primary/50 transition-colors">
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
                <SelectTrigger className="w-full md:w-[150px] bg-background/80 border-border/50 hover:border-primary/50 transition-colors">
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
          </div>
        </div>

        {/* Enhanced Featured Events */}
        {featuredEvents && featuredEvents.length > 0 && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Featured Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} featured />
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Regular Events */}
        {regularEvents && regularEvents.length > 0 && (
          <div className="animate-fade-in delay-300">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {featuredEvents && featuredEvents.length > 0 ? 'More Events' : 'All Events'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* Enhanced No Events State */}
        {filteredEvents && filteredEvents.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">No events found</h3>
            <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
              {searchTerm || eventTypeFilter !== 'all' || modeFilter !== 'all' 
                ? 'Try adjusting your search criteria to find more events'
                : 'Check back soon for upcoming events and workshops'}
            </p>
          </div>
        )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;