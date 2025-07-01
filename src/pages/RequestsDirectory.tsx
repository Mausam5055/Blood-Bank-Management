
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Droplets, MapPin, Phone, Calendar, User, RefreshCw, Building, UserCheck, AlertTriangle, Hash, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navbar from '../components/Navbar';

interface Request {
  id: string;
  name: string;
  blood_group_needed: string;
  location: string;
  contact_details: string;
  message: string | null;
  patient_age: number | null;
  hospital_name: string | null;
  doctor_name: string | null;
  urgency_level: string;
  units_needed: number;
  required_by_date: string | null;
  medical_condition: string | null;
  relation_to_patient: string | null;
  status: string;
  created_at: string;
}

const RequestsDirectory = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('=== FETCHING REQUESTS ===');
      
      const { data, error, count } = await supabase
        .from('requests')
        .select('*', { count: 'exact' })
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      console.log('Raw Supabase response:', { data, error, count });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('All requests from database:', data);
      setRequests(data || []);
      
    } catch (error: any) {
      console.error('=== ERROR FETCHING REQUESTS ===');
      console.error('Error:', error);
      setError(error.message);
      toast({
        title: "Error",
        description: "Failed to load requests: " + error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      console.log('=== FETCH REQUESTS COMPLETE ===');
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString();
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return 'bg-red-900/30 text-red-400 border-red-400/20';
      case 'high':
        return 'bg-orange-900/30 text-orange-400 border-orange-400/20';
      case 'normal':
        return 'bg-blue-900/30 text-blue-400 border-blue-400/20';
      case 'low':
        return 'bg-green-900/30 text-green-400 border-green-400/20';
      default:
        return 'bg-gray-900/30 text-gray-400 border-gray-400/20';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="pt-20 pb-16 px-4 flex items-center justify-center">
          <div className="text-center">
            <Droplets className="w-12 h-12 text-neon-pink animate-pulse mx-auto mb-4" />
            <p className="text-xl text-white">Loading requests...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-neon-pink to-electric-cyan rounded-full flex items-center justify-center mx-auto mb-6">
              <Droplets className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">Blood Requests</h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Help save lives by responding to urgent blood requests in your area
            </p>
            <div className="mt-6">
              <Button 
                onClick={fetchRequests}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Requests
              </Button>
            </div>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
              <p className="text-red-400">Error: {error}</p>
              <Button 
                onClick={fetchRequests}
                className="mt-2 bg-red-600 hover:bg-red-700"
              >
                Try Again
              </Button>
            </div>
          )}

          <div className="mb-4 text-center">
            <p className="text-white/60">
              Found {requests.length} active request{requests.length !== 1 ? 's' : ''}
            </p>
          </div>

          {requests.length === 0 ? (
            <div className="text-center py-16">
              <Droplets className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">No active requests found</h2>
              <p className="text-white/60 mb-8">Check back later for new blood requests.</p>
              <Button 
                onClick={() => window.location.href = '/request-form'}
                className="bg-gradient-to-r from-neon-pink to-electric-cyan text-white"
              >
                Submit a Request
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {requests.map((request) => (
                <Card key={request.id} className="backdrop-blur-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-neon-pink to-electric-cyan rounded-full flex items-center justify-center">
                          <Droplets className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-white text-lg">{request.name}</CardTitle>
                          <div className="flex items-center mt-1 space-x-2">
                            <Badge className="bg-neon-pink/20 text-neon-pink border-neon-pink/30">
                              {request.blood_group_needed}
                            </Badge>
                            <Badge className={getUrgencyColor(request.urgency_level)}>
                              {request.urgency_level}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {request.patient_age && (
                        <div className="flex items-center text-white/70">
                          <Calendar className="w-4 h-4 mr-2 text-neon-pink" />
                          Age: {request.patient_age}
                        </div>
                      )}
                      <div className="flex items-center text-white/70">
                        <Hash className="w-4 h-4 mr-2 text-neon-pink" />
                        {request.units_needed} unit{request.units_needed !== 1 ? 's' : ''}
                      </div>
                    </div>
                    
                    <div className="flex items-center text-white/70 text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-neon-pink" />
                      {request.location}
                    </div>

                    {request.hospital_name && (
                      <div className="flex items-center text-white/70 text-sm">
                        <Building className="w-4 h-4 mr-2 text-neon-pink" />
                        {request.hospital_name}
                      </div>
                    )}

                    {request.doctor_name && (
                      <div className="flex items-center text-white/70 text-sm">
                        <UserCheck className="w-4 h-4 mr-2 text-neon-pink" />
                        Dr. {request.doctor_name}
                      </div>
                    )}

                    {request.relation_to_patient && (
                      <div className="flex items-center text-white/70 text-sm">
                        <User className="w-4 h-4 mr-2 text-neon-pink" />
                        Relation: {request.relation_to_patient}
                      </div>
                    )}

                    {request.required_by_date && (
                      <div className="flex items-center text-white/70 text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-neon-pink" />
                        Required by: {formatDate(request.required_by_date)}
                      </div>
                    )}

                    {request.medical_condition && (
                      <div className="text-white/60 text-sm bg-white/5 p-2 rounded">
                        <p className="font-medium mb-1">Medical condition:</p>
                        <p className="text-xs">{request.medical_condition}</p>
                      </div>
                    )}

                    {request.message && (
                      <div className="text-white/60 text-sm bg-white/5 p-2 rounded">
                        <p className="font-medium mb-1">Additional message:</p>
                        <p className="text-xs">{request.message}</p>
                      </div>
                    )}

                    <div className="text-white/50 text-xs">
                      Posted: {formatDate(request.created_at)}
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-white/20 text-white hover:bg-white/10"
                        onClick={() => window.location.href = `tel:${request.contact_details.match(/\d+/)?.[0] || ''}`}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-neon-pink/30 text-neon-pink hover:bg-neon-pink/10"
                        onClick={() => window.location.href = `mailto:${request.contact_details.match(/[\w\.-]+@[\w\.-]+\.\w+/)?.[0] || ''}`}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestsDirectory;
