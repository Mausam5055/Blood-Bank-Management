
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Download, MapPin, Phone, Calendar, User, RefreshCw, Mail, Weight, Ruler, Activity } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navbar from '../components/Navbar';

interface Donor {
  id: string;
  full_name: string;
  email: string | null;
  blood_group: string;
  age: number;
  phone_number: string;
  address: string | null;
  city: string;
  state: string;
  last_donation_date: string | null;
  medical_conditions: string | null;
  emergency_contact: string | null;
  weight: number | null;
  height: number | null;
  availability: boolean;
  pdf_url: string | null;
  created_at: string;
}

const DonorDirectory = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('=== FETCHING DONORS ===');
      
      const { data, error, count } = await supabase
        .from('donors')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      console.log('Raw Supabase response:', { data, error, count });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('All donors from database:', data);
      setDonors(data || []);
      
    } catch (error: any) {
      console.error('=== ERROR FETCHING DONORS ===');
      console.error('Error:', error);
      setError(error.message);
      toast({
        title: "Error",
        description: "Failed to load donors: " + error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      console.log('=== FETCH DONORS COMPLETE ===');
    }
  };

  const handleDownloadPDF = (pdfUrl: string, donorName: string) => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    } else {
      toast({
        title: "Error",
        description: "PDF not available for this donor",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="pt-20 pb-16 px-4 flex items-center justify-center">
          <div className="text-center">
            <Heart className="w-12 h-12 text-neon-pink animate-pulse mx-auto mb-4" fill="currentColor" />
            <p className="text-xl text-white">Loading donors...</p>
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
              <Heart className="w-10 h-10 text-white" fill="currentColor" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">Blood Donors</h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Connect with verified blood donors in your area
            </p>
            <div className="mt-6">
              <Button 
                onClick={fetchDonors}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 hover:text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Donors
              </Button>
            </div>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
              <p className="text-red-400">Error: {error}</p>
              <Button 
                onClick={fetchDonors}
                className="mt-2 bg-red-600 hover:bg-red-700"
              >
                Try Again
              </Button>
            </div>
          )}

          <div className="mb-4 text-center">
            <p className="text-white/60">
              Found {donors.length} registered donor{donors.length !== 1 ? 's' : ''}
            </p>
          </div>

          {donors.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">No donors currently available</h2>
              <p className="text-white/60 mb-8">Be the first to register as a donor and help save lives!</p>
              <Button 
                onClick={() => window.location.href = '/donate-form'}
                className="bg-gradient-to-r from-neon-pink to-electric-cyan text-white"
              >
                Become a Donor
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {donors.map((donor) => (
                <Card key={donor.id} className="backdrop-blur-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-neon-pink to-electric-cyan rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-white text-lg">{donor.full_name}</CardTitle>
                          <div className="flex items-center mt-1">
                            <Badge className="bg-neon-pink/20 text-neon-pink border-neon-pink/30">
                              {donor.blood_group}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Badge 
                        variant={donor.availability ? "default" : "secondary"}
                        className={donor.availability 
                          ? "bg-green-900/30 text-green-400 border-green-400/20" 
                          : "bg-gray-900/30 text-gray-400 border-gray-400/20"
                        }
                      >
                        {donor.availability ? 'Available' : 'Unavailable'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-white/70">
                        <Calendar className="w-4 h-4 mr-2 text-neon-pink" />
                        Age: {donor.age}
                      </div>
                      <div className="flex items-center text-white/70">
                        <Phone className="w-4 h-4 mr-2 text-neon-pink" />
                        {donor.phone_number}
                      </div>
                    </div>
                    
                    <div className="flex items-center text-white/70 text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-neon-pink" />
                      {donor.address ? `${donor.address}, ` : ''}{donor.city}, {donor.state}
                    </div>

                    {donor.email && (
                      <div className="flex items-center text-white/70 text-sm">
                        <Mail className="w-4 h-4 mr-2 text-neon-pink" />
                        {donor.email}
                      </div>
                    )}

                    {(donor.weight || donor.height) && (
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {donor.weight && (
                          <div className="flex items-center text-white/70">
                            <Weight className="w-4 h-4 mr-2 text-neon-pink" />
                            {donor.weight} kg
                          </div>
                        )}
                        {donor.height && (
                          <div className="flex items-center text-white/70">
                            <Ruler className="w-4 h-4 mr-2 text-neon-pink" />
                            {donor.height} cm
                          </div>
                        )}
                      </div>
                    )}

                    {donor.last_donation_date && (
                      <div className="flex items-center text-white/70 text-sm">
                        <Activity className="w-4 h-4 mr-2 text-neon-pink" />
                        Last donation: {formatDate(donor.last_donation_date)}
                      </div>
                    )}

                    {donor.medical_conditions && (
                      <div className="text-white/60 text-sm bg-white/5 p-2 rounded">
                        <p className="font-medium mb-1">Medical conditions:</p>
                        <p className="text-xs">{donor.medical_conditions}</p>
                      </div>
                    )}

                    <div className="flex gap-2 pt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-white/20 text-white hover:bg-white/10"
                        onClick={() => window.location.href = `tel:${donor.phone_number}`}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                      {donor.pdf_url && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 border-neon-pink/30 text-neon-pink hover:bg-neon-pink/10"
                          onClick={() => handleDownloadPDF(donor.pdf_url!, donor.full_name)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          PDF
                        </Button>
                      )}
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

export default DonorDirectory;
