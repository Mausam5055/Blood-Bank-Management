
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplets, CheckCircle, User, Phone, MapPin, MessageSquare, Calendar, Building, UserCheck, AlertTriangle, Hash } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

interface RequestFormData {
  name: string;
  blood_group_needed: string;
  location: string;
  contact_details: string;
  message: string;
  patient_age: string;
  hospital_name: string;
  doctor_name: string;
  urgency_level: string;
  units_needed: string;
  required_by_date: string;
  medical_condition: string;
  relation_to_patient: string;
}

const RequestForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<RequestFormData>({
    name: '',
    blood_group_needed: '',
    location: '',
    contact_details: '',
    message: '',
    patient_age: '',
    hospital_name: '',
    doctor_name: '',
    urgency_level: 'normal',
    units_needed: '1',
    required_by_date: '',
    medical_condition: '',
    relation_to_patient: '',
  });

  React.useEffect(() => {
    console.log('RequestForm - Current user:', user);
    if (!user) {
      console.log('RequestForm - No user found, redirecting to auth');
      navigate('/auth');
    }
  }, [user, navigate]);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const urgencyLevels = [
    { value: 'low', label: 'Low' },
    { value: 'normal', label: 'Normal' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      console.error('No user found for request submission');
      toast({
        title: "Error",
        description: "You must be logged in to submit a request",
        variant: "destructive",
      });
      return;
    }

    console.log('=== BLOOD REQUEST SUBMISSION START ===');
    console.log('User object:', JSON.stringify(user, null, 2));
    console.log('User ID:', user.id);
    console.log('Form data:', formData);

    setLoading(true);
    try {
      // Validate required fields
      if (!formData.name.trim() || !formData.blood_group_needed || !formData.location.trim() || !formData.contact_details.trim()) {
        throw new Error('Please fill in all required fields');
      }

      // Prepare request data with all new fields
      const requestData = {
        user_id: user.id,
        name: formData.name.trim(),
        blood_group_needed: formData.blood_group_needed,
        location: formData.location.trim(),
        contact_details: formData.contact_details.trim(),
        message: formData.message.trim() || null,
        patient_age: formData.patient_age ? parseInt(formData.patient_age) : null,
        hospital_name: formData.hospital_name.trim() || null,
        doctor_name: formData.doctor_name.trim() || null,
        urgency_level: formData.urgency_level,
        units_needed: formData.units_needed ? parseInt(formData.units_needed) : 1,
        required_by_date: formData.required_by_date || null,
        medical_condition: formData.medical_condition.trim() || null,
        relation_to_patient: formData.relation_to_patient.trim() || null,
        status: 'active',
      };

      console.log('Final request data to insert:', JSON.stringify(requestData, null, 2));

      const { data, error } = await supabase
        .from('requests')
        .insert(requestData)
        .select();

      console.log('Supabase insert response:', { data, error });

      if (error) {
        console.error('Supabase insertion error:', error);
        throw error;
      }

      if (!data || data.length === 0) {
        console.error('No data returned from insertion');
        throw new Error('No data was returned from the database insertion');
      }

      console.log('Request submitted successfully:', data);
      setSubmitted(true);
      toast({
        title: "Success!",
        description: "Your blood request has been submitted successfully.",
      });
    } catch (error: any) {
      console.error('=== REQUEST SUBMISSION ERROR ===');
      console.error('Error:', error);
      
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit blood request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      console.log('=== BLOOD REQUEST SUBMISSION END ===');
    }
  };

  const handleInputChange = (field: keyof RequestFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <Navbar />
        <div className="relative z-10 pt-20 pb-16 px-4 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-soft-white">Please log in to submit a blood request.</p>
            <Button 
              onClick={() => navigate('/auth')}
              className="mt-4 bg-gradient-to-r from-neon-pink to-electric-cyan text-white"
            >
              Go to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <Navbar />
        <div className="relative z-10 pt-20 pb-16 px-4 flex items-center justify-center">
          <Card className="max-w-md w-full glass-card animate-fade-in">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-r from-neon-pink to-electric-cyan rounded-full flex items-center justify-center mx-auto mb-4 animate-heartbeat">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-soft-white text-center">Request Submitted!</CardTitle>
              <CardDescription className="text-dark-text/70 text-center">
                Your blood request has been submitted. Donors in your area will be notified.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => navigate('/requests')} 
                className="w-full bg-gradient-to-r from-neon-pink to-electric-cyan text-white"
              >
                View All Requests
              </Button>
              <Button 
                onClick={() => navigate('/dashboard')} 
                variant="outline" 
                className="w-full border-electric-cyan/50 text-electric-cyan hover:bg-electric-cyan/10"
              >
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <Navbar />
      
      <div className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-neon-pink to-electric-cyan rounded-full mb-6 animate-heartbeat">
              <Droplets className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-soft-white mb-6">
              Request Blood
            </h1>
            <p className="text-xl text-dark-text/80 max-w-2xl mx-auto">
              Connect with our network of generous donors and get the help you need
            </p>
          </div>

          <Card className="glass-card animate-slide-up">
            <CardHeader>
              <CardTitle className="text-soft-white flex items-center">
                <Droplets className="w-6 h-6 mr-2 text-neon-pink" />
                Blood Request Form
              </CardTitle>
              <CardDescription className="text-dark-text/70">
                Fill out complete information to request blood from our donor network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Patient Information Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-soft-white flex items-center">
                    <User className="w-5 h-5 mr-2 text-neon-pink" />
                    Patient Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-soft-white flex items-center">
                        <User className="w-4 h-4 mr-2 text-neon-pink" />
                        Patient/Contact Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                        placeholder="Enter patient or contact person name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="patient_age" className="text-soft-white flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-neon-pink" />
                        Patient Age
                      </Label>
                      <Input
                        id="patient_age"
                        type="number"
                        min="1"
                        max="120"
                        value={formData.patient_age}
                        onChange={(e) => handleInputChange('patient_age', e.target.value)}
                        className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                        placeholder="Enter patient age"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="relation_to_patient" className="text-soft-white flex items-center">
                        <UserCheck className="w-4 h-4 mr-2 text-neon-pink" />
                        Relation to Patient
                      </Label>
                      <Input
                        id="relation_to_patient"
                        value={formData.relation_to_patient}
                        onChange={(e) => handleInputChange('relation_to_patient', e.target.value)}
                        className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                        placeholder="e.g., Father, Mother, Friend, Self"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact_details" className="text-soft-white flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-neon-pink" />
                        Contact Details *
                      </Label>
                      <Input
                        id="contact_details"
                        value={formData.contact_details}
                        onChange={(e) => handleInputChange('contact_details', e.target.value)}
                        placeholder="Phone number, email, or other contact info"
                        className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Blood Request Details Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-soft-white flex items-center">
                    <Droplets className="w-5 h-5 mr-2 text-neon-pink" />
                    Blood Request Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-soft-white flex items-center">
                        <Droplets className="w-4 h-4 mr-2 text-neon-pink" />
                        Blood Group Needed *
                      </Label>
                      <Select onValueChange={(value) => handleInputChange('blood_group_needed', value)} required>
                        <SelectTrigger className="glass border-electric-cyan/20 text-white">
                          <SelectValue placeholder="Select blood group needed" />
                        </SelectTrigger>
                        <SelectContent>
                          {bloodGroups.map((group) => (
                            <SelectItem key={group} value={group}>
                              {group}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="units_needed" className="text-soft-white flex items-center">
                        <Hash className="w-4 h-4 mr-2 text-neon-pink" />
                        Units Needed
                      </Label>
                      <Input
                        id="units_needed"
                        type="number"
                        min="1"
                        max="10"
                        value={formData.units_needed}
                        onChange={(e) => handleInputChange('units_needed', e.target.value)}
                        className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                        placeholder="Number of units"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-soft-white flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2 text-neon-pink" />
                        Urgency Level
                      </Label>
                      <Select onValueChange={(value) => handleInputChange('urgency_level', value)} defaultValue="normal">
                        <SelectTrigger className="glass border-electric-cyan/20 text-white">
                          <SelectValue placeholder="Select urgency level" />
                        </SelectTrigger>
                        <SelectContent>
                          {urgencyLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="required_by_date" className="text-soft-white flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-neon-pink" />
                        Required By Date
                      </Label>
                      <Input
                        id="required_by_date"
                        type="date"
                        value={formData.required_by_date}
                        onChange={(e) => handleInputChange('required_by_date', e.target.value)}
                        className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Hospital Information Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-soft-white flex items-center">
                    <Building className="w-5 h-5 mr-2 text-neon-pink" />
                    Hospital Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="hospital_name" className="text-soft-white flex items-center">
                        <Building className="w-4 h-4 mr-2 text-neon-pink" />
                        Hospital Name
                      </Label>
                      <Input
                        id="hospital_name"
                        value={formData.hospital_name}
                        onChange={(e) => handleInputChange('hospital_name', e.target.value)}
                        className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                        placeholder="Enter hospital name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="doctor_name" className="text-soft-white flex items-center">
                        <UserCheck className="w-4 h-4 mr-2 text-neon-pink" />
                        Doctor Name
                      </Label>
                      <Input
                        id="doctor_name"
                        value={formData.doctor_name}
                        onChange={(e) => handleInputChange('doctor_name', e.target.value)}
                        className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                        placeholder="Enter doctor's name"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="location" className="text-soft-white flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-neon-pink" />
                        Location (City, State) *
                      </Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder="e.g., New York, NY"
                        className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Medical Information Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-soft-white flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-neon-pink" />
                    Additional Information
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="medical_condition" className="text-soft-white flex items-center">
                        <MessageSquare className="w-4 h-4 mr-2 text-neon-pink" />
                        Medical Condition
                      </Label>
                      <Textarea
                        id="medical_condition"
                        value={formData.medical_condition}
                        onChange={(e) => handleInputChange('medical_condition', e.target.value)}
                        placeholder="Describe the medical condition requiring blood transfusion..."
                        className="glass border-electric-cyan/20 focus:border-electric-cyan text-white min-h-[80px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-soft-white flex items-center">
                        <MessageSquare className="w-4 h-4 mr-2 text-neon-pink" />
                        Additional Message (Optional)
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Any additional details about your request..."
                        className="glass border-electric-cyan/20 focus:border-electric-cyan text-white min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading || !formData.name || !formData.blood_group_needed || !formData.location || !formData.contact_details}
                  className="w-full bg-gradient-to-r from-neon-pink to-electric-cyan hover:from-neon-pink/90 hover:to-electric-cyan/90 text-white py-6 text-lg font-semibold rounded-xl transform hover:scale-105 transition-all duration-300 animate-glow"
                >
                  <Droplets className="w-6 h-6 mr-3" />
                  {loading ? 'Submitting...' : 'Submit Blood Request'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;
