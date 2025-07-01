import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, MapPin, Clock, Users, Search, Heart, Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import HostEventForm from '../components/HostEventForm';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface EventRegistration {
  id: string;
  event_id: number;
  event_title: string;
  event_date: string;
  event_location: string;
  event_organizer: string;
  status: string;
  created_at: string;
}

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [userRegistrations, setUserRegistrations] = useState<EventRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [showHostForm, setShowHostForm] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const states = ['All', 'Assam', 'Manipur', 'Meghalaya', 'Arunachal Pradesh', 'Nagaland', 'Mizoram', 'Tripura', 'Sikkim'];

  const events = [
    {
      id: 1,
      title: 'Assam State Blood Drive - Guwahati',
      date: '2024-01-22',
      time: '8:00 AM - 6:00 PM',
      location: 'Gauhati Medical College',
      address: 'Bhangagarh, Guwahati, Assam 781032',
      description: 'Join us for the largest blood donation camp in Assam. Help save lives across the state with your generous contribution.',
      organizer: 'Assam State Blood Transfusion Council',
      expectedDonors: 500,
      spotsLeft: 78,
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500',
      status: 'upcoming',
    },
    {
      id: 2,
      title: 'Emergency Blood Collection - AIIMS Guwahati',
      date: '2024-01-28',
      time: '9:00 AM - 5:00 PM',
      location: 'AIIMS Guwahati',
      address: 'Changsari, Kamrup, Assam 781101',
      description: 'Urgent blood drive to support critical patients at AIIMS Guwahati. All blood types needed.',
      organizer: 'AIIMS Guwahati Blood Bank',
      expectedDonors: 300,
      spotsLeft: 12,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500',
      status: 'urgent',
    },
    {
      id: 3,
      title: 'Corporate Blood Donation Drive',
      date: '2024-02-05',
      time: '10:00 AM - 4:00 PM',
      location: 'Assam Oil Corporation Office',
      address: 'Duliajan, Dibrugarh, Assam 786602',
      description: 'Corporate blood drive with participation from oil industry employees across Upper Assam.',
      organizer: 'Assam Oil Corporation',
      expectedDonors: 200,
      spotsLeft: 45,
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500',
      status: 'upcoming',
    },
    {
      id: 4,
      title: 'Community Blood Camp - Jorhat',
      date: '2024-02-10',
      time: '9:00 AM - 5:00 PM',
      location: 'Jorhat Medical College',
      address: 'Barbheta, Jorhat, Assam 785001',
      description: 'Community blood donation camp serving the tea garden workers and local residents of Jorhat district.',
      organizer: 'Jorhat Medical College Blood Bank',
      expectedDonors: 150,
      spotsLeft: 23,
      image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      status: 'upcoming',
    },
    {
      id: 5,
      title: 'Bihu Special Blood Drive',
      date: '2024-04-14',
      time: '7:00 AM - 7:00 PM',
      location: 'Sarusajai Stadium',
      address: 'Sarusajai, Guwahati, Assam 781040',
      description: 'Special blood donation drive during Bihu festival. Celebrate the Assamese New Year by giving the gift of life.',
      organizer: 'Assam Blood Donors Association',
      expectedDonors: 1000,
      spotsLeft: 234,
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500',
      status: 'upcoming',
    },
    {
      id: 6,
      title: 'Tezpur University Blood Donation Camp',
      date: '2024-02-15',
      time: '10:00 AM - 6:00 PM',
      location: 'Tezpur University Campus',
      address: 'Napaam, Tezpur, Assam 784028',
      description: 'Student-led blood donation initiative at Tezpur University with participation from faculty and local community.',
      organizer: 'Tezpur University Student Union',
      expectedDonors: 180,
      spotsLeft: 56,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500',
      status: 'upcoming',
    },
    {
      id: 7,
      title: 'Tribal Area Blood Collection Drive',
      date: '2024-02-20',
      time: '9:00 AM - 4:00 PM',
      location: 'District Hospital Kokrajhar',
      address: 'Kokrajhar, Assam 783370',
      description: 'Special blood donation camp for tribal communities in BTAD area with mobile blood collection units.',
      organizer: 'District Health Department, Kokrajhar',
      expectedDonors: 120,
      spotsLeft: 34,
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500',
      status: 'upcoming',
    },
    {
      id: 8,
      title: 'Railway Hospital Blood Drive',
      date: '2024-02-25',
      time: '8:00 AM - 5:00 PM',
      location: 'Railway Hospital Guwahati',
      address: 'Panbazar, Guwahati, Assam 781001',
      description: 'Blood donation camp organized by Railway Hospital for railway employees and their families.',
      organizer: 'Northeast Frontier Railway',
      expectedDonors: 250,
      spotsLeft: 67,
      image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      status: 'upcoming',
    },
    {
      id: 9,
      title: 'Dibrugarh University Annual Blood Camp',
      date: '2024-03-01',
      time: '8:00 AM - 6:00 PM',
      location: 'Dibrugarh University',
      address: 'Dibrugarh, Assam 786004',
      description: 'Annual blood donation camp at Dibrugarh University with participation from students, faculty, and local community.',
      organizer: 'Dibrugarh University Health Centre',
      expectedDonors: 220,
      spotsLeft: 89,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      status: 'upcoming',
    },
    {
      id: 10,
      title: 'Guwahati Police Blood Donation Drive',
      date: '2024-03-05',
      time: '9:00 AM - 5:00 PM',
      location: 'Police Training College',
      address: 'Dergaon, Guwahati, Assam 781015',
      description: 'Blood donation camp organized by Assam Police for serving and retired police personnel and their families.',
      organizer: 'Assam Police Welfare Association',
      expectedDonors: 180,
      spotsLeft: 42,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      status: 'upcoming',
    },
    {
      id: 11,
      title: 'Tea Garden Workers Blood Camp - Sivasagar',
      date: '2024-03-10',
      time: '8:00 AM - 4:00 PM',
      location: 'Sivasagar Civil Hospital',
      address: 'Sivasagar, Assam 785640',
      description: 'Special blood donation camp for tea garden workers and their families in Sivasagar district.',
      organizer: 'Tea Estate Workers Union',
      expectedDonors: 160,
      spotsLeft: 71,
      image: 'https://images.unsplash.com/photo-1587462723516-4d47a95c7772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      status: 'upcoming',
    },
    {
      id: 12,
      title: 'Rotary Club Mega Blood Drive',
      date: '2024-03-15',
      time: '7:00 AM - 7:00 PM',
      location: 'Nehru Stadium',
      address: 'Maligaon, Guwahati, Assam 781011',
      description: 'Mega blood donation drive organized by Rotary Club International with multiple collection points.',
      organizer: 'Rotary Club of Guwahati',
      expectedDonors: 600,
      spotsLeft: 198,
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500',
      status: 'upcoming',
    },
    {
      id: 13,
      title: 'Youth Blood Donation Festival',
      date: '2024-03-20',
      time: '9:00 AM - 6:00 PM',
      location: 'Cotton University',
      address: 'Panbazar, Guwahati, Assam 781001',
      description: 'Youth-focused blood donation event with cultural programs and awareness campaigns.',
      organizer: 'Assam Youth Development Association',
      expectedDonors: 280,
      spotsLeft: 124,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      status: 'upcoming',
    }
  ];

  useEffect(() => {
    if (user) {
      fetchUserRegistrations();
    }
  }, [user]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedState]);

  const fetchUserRegistrations = async () => {
    try {
      const { data, error } = await supabase
        .from('event_registrations')
        .select('*')
        .eq('user_id', user?.id);

      if (error) throw error;
      setUserRegistrations(data || []);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching registrations:', error.message);
      } else {
        console.error('Error fetching registrations:', String(error));
      }
    }
  };

  const isEventRegistered = (eventId: number) => {
    return userRegistrations.some(reg => reg.event_id === eventId);
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesState = selectedState === 'All' || 
                        event.address.toLowerCase().includes(selectedState.toLowerCase());
    
    return matchesSearch && matchesState;
  });

  const handleRegister = async (eventId: number) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to register for events",
        variant: "destructive",
      });
      return;
    }

    const event = events.find(e => e.id === eventId);
    if (!event) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('event_registrations')
        .insert([
          {
            user_id: user.id,
            event_id: eventId,
            event_title: event.title,
            event_date: event.date,
            event_location: event.location,
            event_organizer: event.organizer,
          }
        ]);

      if (error) throw error;

      await fetchUserRegistrations();
      toast({
        title: "Success!",
        description: `You've successfully registered for ${event.title}`,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error registering for event:', error.message);
      } else {
        console.error('Error registering for event:', String(error));
      }
      toast({
        title: "Error",
        description: "Failed to register for event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Minimal Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/20 to-black" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-pink/3 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-electric-cyan/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <Navbar />
      
      <div className="relative w-full px-0 pt-12 pb-6 text-center overflow-hidden">
        {/* Hero Background Image - edge-to-edge */}
        <div className="absolute left-0 top-0 w-screen h-full z-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80"
            alt="Blood donation event hero background"
            className="w-full h-full object-cover object-center opacity-60"
          />
          {/* Gradient overlay for smooth blend */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/95" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-neon-pink to-electric-cyan mb-4"></h1>
            <p className="hidden md:block text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"></p>
          </div>
        </div>
      </div>

      <div className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-neon-pink to-electric-cyan mb-4">
              Blood Donation Events in Assam
            </h1>
            <p className="text-xl text-gray-300 hidden md:block mb-6">
              Find and register for blood donation events across Assam and Guwahati
            </p>
            
            {/* Host Event Button */}
            <Button
              onClick={() => setShowHostForm(true)}
              className="bg-gradient-to-r from-neon-pink to-electric-cyan text-white hover:opacity-90 mb-8"
            >
              <Plus className="w-5 h-5 mr-2" />
              Host an Event
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="glass-card p-6 rounded-2xl mb-8 animate-slide-up bg-gray-900/40 border-white/10">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neon-pink" />
                <Input
                  placeholder="Search events by name, location, or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 glass border-electric-cyan/20 focus:border-electric-cyan h-12 text-lg text-white bg-gray-900/50"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {states.map((state) => (
                  <Button
                    key={state}
                    variant={selectedState === state ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedState(state)}
                    className={selectedState === state 
                      ? "bg-gradient-to-r from-neon-pink to-electric-cyan text-white border-0" 
                      : "border-electric-cyan/30 text-electric-cyan hover:bg-electric-cyan/10 hover:text-white"
                    }
                  >
                    {state}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Events Grid */}
          <div className="space-y-8">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="glass-card rounded-2xl overflow-hidden bg-gray-900/40 border-white/10 animate-pulse min-h-[320px]">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <div className="h-64 md:h-full bg-gray-800/40 w-full" />
                    </div>
                    <div className="md:w-2/3 p-8">
                      <div className="h-8 bg-gray-700/40 rounded w-2/3 mb-4" />
                      <div className="h-4 bg-gray-700/30 rounded w-1/2 mb-2" />
                      <div className="h-4 bg-gray-700/30 rounded w-1/3 mb-2" />
                      <div className="h-4 bg-gray-700/20 rounded w-1/4 mb-2" />
                      <div className="h-10 bg-gray-700/20 rounded w-full mt-6" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              filteredEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="glass-card rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 animate-fade-in bg-gray-900/40 border-white/10"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="md:flex">
                    {/* Event Image */}
                    <div className="md:w-1/3">
                      <div
                        className="h-64 md:h-full bg-cover bg-center relative"
                        style={{ backgroundImage: `url(${event.image})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/20 to-electric-cyan/20" />
                        
                        {/* Status Badge */}
                        <div className="absolute top-4 left-4">
                          <Badge
                            className={`${
                              event.status === 'urgent'
                                ? 'bg-red-500 text-white animate-pulse'
                                : 'bg-neon-pink text-white'
                            }`}
                          >
                            {event.status === 'urgent' ? 'URGENT' : 'UPCOMING'}
                          </Badge>
                        </div>

                        {/* Registration Status */}
                        {isEventRegistered(event.id) && (
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-green-500 text-white">
                              Registered
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="md:w-2/3 p-8">
                      <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="mb-6">
                          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            {event.title}
                          </h2>
                          <p className="text-gray-300 leading-relaxed">
                            {event.description}
                          </p>
                        </div>

                        {/* Event Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center text-gray-300">
                            <Calendar className="w-5 h-5 mr-3 text-neon-pink" />
                            <div>
                              <div className="font-medium text-white">
                                {new Date(event.date).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </div>
                              <div className="text-sm text-gray-400">
                                {event.time}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center text-gray-300">
                            <MapPin className="w-5 h-5 mr-3 text-neon-pink" />
                            <div>
                              <div className="font-medium text-white">{event.location}</div>
                              <div className="text-sm text-gray-400">
                                {event.address}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center text-gray-300">
                            <Users className="w-5 h-5 mr-3 text-neon-pink" />
                            <div>
                              <div className="font-medium text-white">
                                {event.expectedDonors} Expected Donors
                              </div>
                              <div className="text-sm text-gray-400">
                                {event.spotsLeft} spots remaining
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center text-gray-300">
                            <Heart className="w-5 h-5 mr-3 text-neon-pink" fill="currentColor" />
                            <div>
                              <div className="font-medium text-white">Organized by</div>
                              <div className="text-sm text-gray-400">
                                {event.organizer}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-6">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">
                              Registration Progress
                            </span>
                            <span className="text-gray-400">
                              {event.expectedDonors - event.spotsLeft}/{event.expectedDonors}
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-neon-pink to-electric-cyan h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${((event.expectedDonors - event.spotsLeft) / event.expectedDonors) * 100}%`
                              }}
                            />
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-auto">
                          <Button
                            onClick={() => handleRegister(event.id)}
                            disabled={isEventRegistered(event.id) || event.spotsLeft === 0 || loading}
                            className={`w-full md:w-auto px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 ${
                              isEventRegistered(event.id)
                                ? 'bg-green-500 hover:bg-green-600 text-white'
                                : event.spotsLeft === 0
                                ? 'bg-gray-400 cursor-not-allowed text-white'
                                : 'bg-gradient-to-r from-neon-pink to-electric-cyan hover:from-neon-pink/90 hover:to-electric-cyan/90 text-white'
                            }`}
                          >
                            {isEventRegistered(event.id) ? (
                              <>
                                <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                                You're Registered!
                              </>
                            ) : event.spotsLeft === 0 ? (
                              'Event Full'
                            ) : (
                              <>
                                <Calendar className="w-5 h-5 mr-2" />
                                {loading ? 'Registering...' : 'Register Now'}
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-16 h-16 bg-neon-pink/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-neon-pink" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No events found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search or filter criteria to find more events.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Host Event Form Modal */}
      <HostEventForm 
        isOpen={showHostForm} 
        onClose={() => setShowHostForm(false)} 
      />
    </div>
  );
};

export default Events;
