import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Calendar, Users, MapPin, Phone, Activity, Edit, Trash2, User, Mail, Camera, FileText, PlusCircle, Search, Bell } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navbar from '../components/Navbar';
import ProfilePhotoUpload from '../components/ProfilePhotoUpload';

interface Donation {
  id: string;
  user_id: string;
  full_name: string;
  blood_group: string;
  age: number;
  phone_number: string;
  city: string;
  state: string;
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

interface BloodRequest {
  id: string;
  user_id: string;
  name: string;
  blood_group_needed: string;
  location: string;
  urgency: string;
  status: string;
  created_at: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | undefined>(user?.user_metadata?.avatar_url);

  useEffect(() => {
    if (user) {
      fetchDonations();
      fetchRegistrations();
      fetchRequests();
    }
  }, [user]);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('donors')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDonations(data || []);
    } catch (error: any) {
      console.error('Error fetching donations:', error);
      toast({
        title: "Error",
        description: "Failed to load donations: " + error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('event_registrations')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRegistrations(data || []);
    } catch (error: any) {
      console.error('Error fetching registrations:', error);
      toast({
        title: "Error",
        description: "Failed to load event registrations: " + error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blood_requests')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error: any) {
      console.error('Error fetching blood requests:', error);
      toast({
        title: "Error",
        description: "Failed to load blood requests: " + error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditDonation = (donation: Donation) => {
    // Implement edit donation logic here
    console.log('Edit donation:', donation);
    toast({
      title: "Edit Donation",
      description: "Edit donation functionality is under development.",
    });
  };

  const handleDeleteDonation = async (donationId: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('donors')
        .delete()
        .eq('id', donationId);

      if (error) throw error;

      setDonations(donations.filter(donation => donation.id !== donationId));
      toast({
        title: "Success",
        description: "Donation record deleted successfully.",
      });
    } catch (error: any) {
      console.error('Error deleting donation:', error);
      toast({
        title: "Error",
        description: "Failed to delete donation: " + error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditRequest = (request: BloodRequest) => {
    // Implement edit request logic here
    console.log('Edit request:', request);
    toast({
      title: "Edit Request",
      description: "Edit request functionality is under development.",
    });
  };

  const handleDeleteRequest = async (requestId: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('blood_requests')
        .delete()
        .eq('id', requestId);

      if (error) throw error;

      setRequests(requests.filter(request => request.id !== requestId));
      toast({
        title: "Success",
        description: "Blood request deleted successfully.",
      });
    } catch (error: any) {
      console.error('Error deleting request:', error);
      toast({
        title: "Error",
        description: "Failed to delete request: " + error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <ProfilePhotoUpload 
                  currentPhotoUrl={profilePhotoUrl}
                  onPhotoUpdated={(newUrl) => setProfilePhotoUrl(newUrl)}
                />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Welcome back, {user?.user_metadata?.full_name || user?.email}!
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your compassion makes a difference in the world
                  </p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <Activity className="w-4 h-4 mr-1" />
                Active Donor
              </Badge>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                onClick={() => window.location.href = '/donate-form'}
                className="h-20 flex flex-col items-center justify-center bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Heart className="w-6 h-6 mb-2" fill="currentColor" />
                <span className="text-sm font-medium">Donate Blood</span>
              </Button>
              
              <Button
                onClick={() => window.location.href = '/request-form'}
                className="h-20 flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Search className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Request Blood</span>
              </Button>
              
              <Button
                onClick={() => window.location.href = '/events'}
                className="h-20 flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0 shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Calendar className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Find Events</span>
              </Button>
              
              <Button
                onClick={() => window.location.href = '/donors'}
                className="h-20 flex flex-col items-center justify-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Users className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Find Donors</span>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Donations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Heart className="w-8 h-8 text-red-500 mr-3" fill="currentColor" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {donations.length}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Lives saved</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Event Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-blue-500 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {registrations.length}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Upcoming events</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Blood Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Search className="w-8 h-8 text-purple-500 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {requests.length}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Active requests</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Impact Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Activity className="w-8 h-8 text-green-500 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {donations.length * 3}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Lives impacted</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* My Blood Donations */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <Heart className="w-5 h-5 mr-2 text-red-500" fill="currentColor" />
                  My Blood Donations
                </CardTitle>
                <CardDescription>Your donation history and records</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <Heart className="w-12 h-12 text-red-500 animate-pulse mx-auto mb-4" fill="currentColor" />
                    <p className="text-gray-600 dark:text-gray-400">Loading donations...</p>
                  </div>
                ) : donations.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No donations yet</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Start your journey by registering as a donor!</p>
                    <Button 
                      onClick={() => window.location.href = '/donate-form'}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      <Heart className="w-4 h-4 mr-2" fill="currentColor" />
                      Become a Donor
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-80 overflow-y-auto">
                    {donations.map((donation) => (
                      <div key={donation.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                            <Heart className="w-6 h-6 text-red-500" fill="currentColor" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{donation.full_name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Blood Group: {donation.blood_group} | Age: {donation.age}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-500">
                              {donation.city}, {donation.state}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditDonation(donation)}
                            className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                          >
                            <Edit className="w-4 h-4 md:mr-2" />
                            <span className="hidden md:inline">Edit</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteDonation(donation.id)}
                            className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="w-4 h-4 md:mr-2" />
                            <span className="hidden md:inline">Delete</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Event Registrations */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                  My Event Registrations
                </CardTitle>
                <CardDescription>Events you've registered for</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-blue-500 animate-pulse mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">Loading registrations...</p>
                  </div>
                ) : registrations.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No events registered</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Join blood donation events in your area!</p>
                    <Button 
                      onClick={() => window.location.href = '/events'}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Find Events
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-80 overflow-y-auto">
                    {registrations.map((registration) => (
                      <div key={registration.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                              <Calendar className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">{registration.event_title}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {new Date(registration.event_date).toLocaleDateString()}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-500">
                                {registration.event_location}
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            {registration.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Blood Requests */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <Search className="w-5 h-5 mr-2 text-purple-500" />
                  My Blood Requests
                </CardTitle>
                <CardDescription>Your blood requests and their status</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <Search className="w-12 h-12 text-purple-500 animate-pulse mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">Loading requests...</p>
                  </div>
                ) : requests.length === 0 ? (
                  <div className="text-center py-8">
                    <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No requests made</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Request blood when you need it most</p>
                    <Button 
                      onClick={() => window.location.href = '/request-form'}
                      className="bg-purple-500 hover:bg-purple-600 text-white"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Request Blood
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-80 overflow-y-auto">
                    {requests.map((request) => (
                      <div key={request.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                              <Search className="w-6 h-6 text-purple-500" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">{request.name}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Blood Group: {request.blood_group_needed}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-500">
                                {request.location}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <Badge className={`${
                              request.status === 'active' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                            }`}>
                              {request.status}
                            </Badge>
                            <div className="flex space-x-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditRequest(request)}
                                className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteRequest(request.id)}
                                className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <Activity className="w-5 h-5 mr-2 text-green-500" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest actions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Profile updated</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Registered for blood drive</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Blood donation completed</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
