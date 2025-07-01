import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Calendar, Award, Edit, Download, Bell, MapPin, Save, User, Droplets, Trash2, Phone } from 'lucide-react';
import Navbar from '../components/Navbar';
import ProfilePhotoUpload from '../components/ProfilePhotoUpload';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  updated_at: string;
  created_at: string;
}

interface UserRequest {
  id: string;
  name: string;
  blood_group_needed: string;
  location: string;
  contact_details: string;
  message: string | null;
  status: string;
  created_at: string;
}

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

const UserDashboard = () => {
  const { user, session, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userRequests, setUserRequests] = useState<UserRequest[]>([]);
  const [eventRegistrations, setEventRegistrations] = useState<EventRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    avatar_url: '',
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  // Fetch user profile and requests
  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchUserRequests();
      fetchEventRegistrations();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile(data);
        setFormData({
          full_name: data.full_name || '',
          avatar_url: data.avatar_url || '',
        });
      } else {
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([
            {
              id: user?.id,
              full_name: user?.user_metadata?.full_name || '',
              avatar_url: user?.user_metadata?.avatar_url || '',
            }
          ])
          .select()
          .single();

        if (createError) throw createError;
        
        setProfile(newProfile);
        setFormData({
          full_name: newProfile.full_name || '',
          avatar_url: newProfile.avatar_url || '',
        });
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('requests')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUserRequests(data || []);
    } catch (error: any) {
      console.error('Error fetching user requests:', error);
      toast({
        title: "Error",
        description: "Failed to load your requests",
        variant: "destructive",
      });
    }
  };

  const fetchEventRegistrations = async () => {
    try {
      const { data, error } = await supabase
        .from('event_registrations')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEventRegistrations(data || []);
    } catch (error: any) {
      console.error('Error fetching event registrations:', error);
      toast({
        title: "Error",
        description: "Failed to load your event registrations",
        variant: "destructive",
      });
    }
  };

  const handleDeleteRequest = async (requestId: string) => {
    try {
      const { error } = await supabase
        .from('requests')
        .delete()
        .eq('id', requestId);

      if (error) throw error;

      setUserRequests(prev => prev.filter(req => req.id !== requestId));
      toast({
        title: "Success",
        description: "Request deleted successfully",
      });
    } catch (error: any) {
      console.error('Error deleting request:', error);
      toast({
        title: "Error",
        description: "Failed to delete request",
        variant: "destructive",
      });
    }
  };

  const handleDeleteEventRegistration = async (registrationId: string) => {
    try {
      const { error } = await supabase
        .from('event_registrations')
        .delete()
        .eq('id', registrationId);

      if (error) throw error;

      setEventRegistrations(prev => prev.filter(reg => reg.id !== registrationId));
      toast({
        title: "Success",
        description: "Event registration cancelled successfully",
      });
    } catch (error: any) {
      console.error('Error cancelling event registration:', error);
      toast({
        title: "Error",
        description: "Failed to cancel event registration",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhotoUpdated = (newPhotoUrl: string) => {
    setProfile(prev => prev ? { ...prev, avatar_url: newPhotoUrl } : prev);
    setFormData(prev => ({ ...prev, avatar_url: newPhotoUrl }));
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          avatar_url: formData.avatar_url,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user?.id)
        .select()
        .single();

      if (error) throw error;

      setProfile(data);
      setEditing(false);
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than an hour ago';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-12 h-12 text-neon-pink animate-pulse mx-auto mb-4" fill="currentColor" />
          <p className="text-xl text-white">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const displayName = profile?.full_name || user.user_metadata?.full_name || user.email || 'User';
  const memberSince = new Date(user.created_at).toLocaleDateString();
  const bloodGroup = user.user_metadata?.blood_group || 'Not specified';
  const phone = user.user_metadata?.phone || 'Not provided';

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {displayName}!
            </h1>
            <p className="text-xl text-white/70">
              Thank you for being a life-saving hero
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Overview */}
              <div className="backdrop-blur-lg bg-white/5 border border-white/10 shadow-xl p-6 rounded-2xl animate-slide-up">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <ProfilePhotoUpload 
                      currentPhotoUrl={profile?.avatar_url || undefined}
                      onPhotoUpdated={handlePhotoUpdated}
                    />
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {displayName}
                      </h2>
                      <p className="text-white/60">{user.email}</p>
                      <div className="flex items-center text-white/60 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        Member since {memberSince}
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => editing ? handleSaveProfile() : setEditing(!editing)}
                    className="border-neon-pink/30 text-white hover:bg-neon-pink/10"
                  >
                    {editing ? (
                      <>
                        <Save className="w-4 h-4 md:mr-2" />
                        <span className="hidden md:inline">Save</span>
                      </>
                    ) : (
                      <>
                        <Edit className="w-4 h-4 md:mr-2" />
                        <span className="hidden md:inline">Edit Profile</span>
                      </>
                    )}
                  </Button>
                </div>

                {editing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="full_name" className="text-white">Full Name</Label>
                      <Input
                        id="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        className="mt-1 bg-black/30 border-white/20 text-white"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleSaveProfile} disabled={loading} className="bg-neon-pink hover:bg-neon-pink/90">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setEditing(false)} className="border-white/20 text-white">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl">
                      <Heart className="w-8 h-8 mx-auto mb-2 text-neon-pink" fill="currentColor" />
                      <div className="text-2xl font-bold text-neon-pink">
                        {bloodGroup}
                      </div>
                      <div className="text-sm text-white/60">
                        Blood Group
                      </div>
                    </div>
                    
                    <div className="text-center p-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl">
                      <User className="w-8 h-8 mx-auto mb-2 text-neon-pink" />
                      <div className="text-lg font-bold text-neon-pink">
                        Active
                      </div>
                      <div className="text-sm text-white/60">
                        Status
                      </div>
                    </div>
                    
                    <div className="text-center p-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl">
                      <div className="text-lg font-bold text-neon-pink">
                        {phone}
                      </div>
                      <div className="text-sm text-white/60">
                        Phone Number
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Event Registrations */}
              <div className="backdrop-blur-lg bg-white/5 border border-white/10 shadow-xl p-6 rounded-2xl animate-slide-up">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-neon-pink" />
                  Your Event Registrations
                </h3>
                
                {eventRegistrations.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-white/20 mx-auto mb-4" />
                    <p className="text-white/60 mb-4">You haven't registered for any events yet.</p>
                    <Button 
                      onClick={() => navigate('/events')}
                      className="bg-gradient-to-r from-neon-pink to-electric-cyan text-white"
                    >
                      Browse Events
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {eventRegistrations.map((registration) => (
                      <div key={registration.id} className="p-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <h4 className="font-medium text-white">{registration.event_title}</h4>
                              <Badge 
                                variant="secondary" 
                                className="ml-2 bg-green-900/30 text-green-400 border-green-400/20"
                              >
                                {registration.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-white/60 space-y-1">
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {new Date(registration.event_date).toLocaleDateString()}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {registration.event_location}
                              </div>
                              <div className="flex items-center">
                                <User className="w-3 h-3 mr-1" />
                                {registration.event_organizer}
                              </div>
                              <div className="text-xs">
                                Registered {getTimeAgo(registration.created_at)}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteEventRegistration(registration.id)}
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10 ml-4"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* User's Blood Requests */}
              <div className="backdrop-blur-lg bg-white/5 border border-white/10 shadow-xl p-6 rounded-2xl animate-slide-up">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Droplets className="w-5 h-5 mr-2 text-neon-pink" />
                  Your Blood Requests
                </h3>
                
                {userRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <Droplets className="w-12 h-12 text-white/20 mx-auto mb-4" />
                    <p className="text-white/60 mb-4">You haven't submitted any blood requests yet.</p>
                    <Button 
                      onClick={() => navigate('/request-form')}
                      className="bg-gradient-to-r from-neon-pink to-electric-cyan text-white"
                    >
                      Submit a Request
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userRequests.map((request) => (
                      <div key={request.id} className="p-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <h4 className="font-medium text-white">{request.name}</h4>
                              <Badge className="ml-2 bg-red-900/30 text-red-400 border-red-400/20">
                                Needs {request.blood_group_needed}
                              </Badge>
                              <Badge 
                                variant="secondary" 
                                className={`ml-2 ${
                                  request.status === 'active' 
                                    ? 'bg-green-900/30 text-green-400 border-green-400/20' 
                                    : 'bg-gray-900/30 text-gray-400 border-gray-400/20'
                                }`}
                              >
                                {request.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-white/60 space-y-1">
                              <div className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {request.location}
                              </div>
                              <div className="flex items-center">
                                <Phone className="w-3 h-3 mr-1" />
                                {request.contact_details}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {getTimeAgo(request.created_at)}
                              </div>
                            </div>
                            {request.message && (
                              <p className="text-sm text-white/70 mt-2 italic">"{request.message}"</p>
                            )}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteRequest(request.id)}
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10 ml-4"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Account Information */}
              <div className="backdrop-blur-lg bg-white/5 border border-white/10 shadow-xl p-6 rounded-2xl animate-slide-up">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Account Information
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg">
                    <div>
                      <div className="font-medium text-white">Email</div>
                      <div className="text-sm text-white/60">{user.email}</div>
                    </div>
                    <Badge variant="secondary" className="bg-green-900/30 text-green-400 border-green-400/20">
                      Verified
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg">
                    <div>
                      <div className="font-medium text-white">Account Created</div>
                      <div className="text-sm text-white/60">{memberSince}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg">
                    <div>
                      <div className="font-medium text-white">Last Updated</div>
                      <div className="text-sm text-white/60">
                        {profile?.updated_at ? new Date(profile.updated_at).toLocaleDateString() : 'Never'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <div className="backdrop-blur-lg bg-white/5 border border-white/10 shadow-xl p-6 rounded-2xl animate-fade-in">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button 
                    onClick={() => navigate('/donate-form')}
                    className="w-full bg-gradient-to-r from-neon-pink to-electric-cyan text-white hover:opacity-90"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Become a Donor
                  </Button>
                  <Button 
                    onClick={() => navigate('/request-form')}
                    variant="outline" 
                    className="w-full border-neon-pink/30 text-white hover:bg-neon-pink/10"
                  >
                    <Droplets className="w-4 h-4 mr-2" />
                    Request Blood
                  </Button>
                  <Button 
                    onClick={() => navigate('/events')}
                    variant="outline" 
                    className="w-full border-electric-cyan/30 text-white hover:bg-electric-cyan/10"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Browse Events
                  </Button>
                  <Button 
                    onClick={() => navigate('/requests')}
                    variant="outline" 
                    className="w-full border-electric-cyan/30 text-white hover:bg-electric-cyan/10"
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    View All Requests
                  </Button>
                  <Button 
                    onClick={() => navigate('/donors')}
                    variant="outline" 
                    className="w-full border-electric-cyan/30 text-white hover:bg-electric-cyan/10"
                  >
                    <User className="w-4 h-4 mr-2" />
                    View All Donors
                  </Button>
                </div>
              </div>

              {/* Profile Completion */}
              <div className="backdrop-blur-lg bg-white/5 border border-white/10 shadow-xl p-6 rounded-2xl animate-fade-in">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Profile Completion
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Complete your profile</span>
                    <span className="text-white/60">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <p className="text-sm text-white/60">
                    Add more information to help others connect with you
                  </p>
                </div>
              </div>

              {/* Community Stats */}
              <div className="backdrop-blur-lg bg-white/5 border border-white/10 shadow-xl p-6 rounded-2xl animate-fade-in">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Community Impact
                </h3>
                <div className="space-y-4">
                  <div className="text-center p-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg">
                    <div className="text-2xl font-bold text-neon-pink">25,000+</div>
                    <div className="text-sm text-white/60">Lives Saved</div>
                  </div>
                  <div className="text-center p-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg">
                    <div className="text-2xl font-bold text-electric-cyan">15,000+</div>
                    <div className="text-sm text-white/60">Active Donors</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
