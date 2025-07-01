import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, CheckCircle, User, Phone, MapPin, Calendar, Droplets, Mail, Weight, Ruler, Activity } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import Navbar from '../components/Navbar';

interface DonorFormData {
  full_name: string;
  email: string;
  blood_group: string;
  age: string;
  phone_number: string;
  address: string;
  city: string;
  state: string;
  last_donation_date: string;
  medical_conditions: string;
  emergency_contact: string;
  weight: string;
  height: string;
  availability: boolean;
}

const DonateForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<DonorFormData>({
    full_name: '',
    email: '',
    blood_group: '',
    age: '',
    phone_number: '',
    address: '',
    city: '',
    state: '',
    last_donation_date: '',
    medical_conditions: '',
    emergency_contact: '',
    weight: '',
    height: '',
    availability: true,
  });

  React.useEffect(() => {
    console.log('DonateForm - Current user:', user);
    if (!user) {
      console.log('DonateForm - No user found, redirecting to auth');
      navigate('/auth');
    }
  }, [user, navigate]);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const generatePDF = async (donorData: any): Promise<string> => {
    const element = document.createElement('div');
    element.innerHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; background: white; color: #333;">
        <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px solid #e91e63; padding-bottom: 20px;">
          <h1 style="color: #e91e63; font-size: 28px; margin: 0;">LifeGiver Blood Donation</h1>
          <h2 style="color: #666; font-size: 18px; margin: 10px 0 0 0;">Donor Registration Certificate</h2>
          <p style="color: #999; margin: 5px 0 0 0;">Certificate ID: LG${Date.now()}</p>
        </div>
        
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="background: #e91e63; color: white; padding: 20px; border-radius: 10px; display: inline-block;">
            <h2 style="margin: 0; font-size: 24px;">Blood Group: ${donorData.blood_group}</h2>
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
          <div>
            <h3 style="color: #e91e63; border-bottom: 2px solid #e91e63; padding-bottom: 10px; margin-bottom: 20px;">Personal Information</h3>
            <div style="margin-bottom: 15px;">
              <strong>Full Name:</strong> ${donorData.full_name}
            </div>
            <div style="margin-bottom: 15px;">
              <strong>Age:</strong> ${donorData.age} years
            </div>
            <div style="margin-bottom: 15px;">
              <strong>Phone:</strong> ${donorData.phone_number}
            </div>
            <div style="margin-bottom: 15px;">
              <strong>Email:</strong> ${donorData.email}
            </div>
          </div>
          
          <div>
            <h3 style="color: #e91e63; border-bottom: 2px solid #e91e63; padding-bottom: 10px; margin-bottom: 20px;">Location Details</h3>
            <div style="margin-bottom: 15px;">
              <strong>Address:</strong> ${donorData.address}
            </div>
            <div style="margin-bottom: 15px;">
              <strong>City:</strong> ${donorData.city}
            </div>
            <div style="margin-bottom: 15px;">
              <strong>State:</strong> ${donorData.state}
            </div>
            <div style="margin-bottom: 15px;">
              <strong>Available:</strong> ${donorData.availability ? 'Yes' : 'No'}
            </div>
          </div>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
          <h3 style="color: #e91e63; margin-top: 0;">Important Information</h3>
          <p style="margin: 0;">This certificate confirms that ${donorData.full_name} has registered as a blood donor with LifeGiver. Contact them at ${donorData.phone_number} if you need ${donorData.blood_group} blood.</p>
        </div>
        
        <div style="text-align: center; margin-top: 40px; border-top: 1px solid #ddd; padding-top: 20px;">
          <p style="color: #666; margin: 0;">Thank you for being a life-saving hero!</p>
          <p style="color: #999; font-size: 14px; margin: 10px 0 0 0;">Generated on ${new Date().toLocaleDateString()} | www.lifegiver.com</p>
        </div>
      </div>
    `;

    const opt = {
      margin: 1,
      filename: `LifeGiver_Donor_${donorData.full_name.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    try {
      const pdfBlob = await html2pdf().set(opt).from(element).outputPdf('blob');
      
      const fileName = `${user?.id}/${Date.now()}_donor_certificate.pdf`;
      const { data, error } = await supabase.storage
        .from('donor-pdfs')
        .upload(fileName, pdfBlob);

      if (error) {
        console.error('Storage upload error:', error);
        throw error;
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('donor-pdfs')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('PDF generation/upload error:', error);
      return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      console.error('No user found for donor submission');
      toast({
        title: "Error",
        description: "You must be logged in to register as a donor",
        variant: "destructive",
      });
      return;
    }

    console.log('=== DONOR FORM SUBMISSION START ===');
    console.log('User object:', JSON.stringify(user, null, 2));
    console.log('User ID:', user.id);
    console.log('Form data:', formData);

    setLoading(true);
    try {
      // Validate required fields
      if (!formData.full_name.trim() || !formData.blood_group || !formData.age || !formData.phone_number.trim() || !formData.city.trim() || !formData.state.trim()) {
        throw new Error('Please fill in all required fields');
      }

      // Check if age is valid
      const ageNum = parseInt(formData.age);
      if (isNaN(ageNum) || ageNum < 18 || ageNum > 65) {
        throw new Error('Age must be between 18 and 65');
      }

      // Generate and upload PDF (non-blocking)
      let pdfUrl = '';
      try {
        pdfUrl = await generatePDF(formData);
        console.log('PDF generated and uploaded:', pdfUrl);
      } catch (pdfError) {
        console.warn('PDF generation failed, continuing without PDF:', pdfError);
      }

      // Prepare donor data with all new fields
      const donorData = {
        user_id: user.id,
        full_name: formData.full_name.trim(),
        email: formData.email.trim() || null,
        blood_group: formData.blood_group,
        age: ageNum,
        phone_number: formData.phone_number.trim(),
        address: formData.address.trim() || null,
        city: formData.city.trim(),
        state: formData.state.trim(),
        last_donation_date: formData.last_donation_date || null,
        medical_conditions: formData.medical_conditions.trim() || null,
        emergency_contact: formData.emergency_contact.trim() || null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        height: formData.height ? parseFloat(formData.height) : null,
        availability: formData.availability,
        pdf_url: pdfUrl || null,
      };

      console.log('Final donor data to insert:', JSON.stringify(donorData, null, 2));

      const { data, error } = await supabase
        .from('donors')
        .insert(donorData)
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

      console.log('Donor registration successful:', data);
      setSubmitted(true);
      toast({
        title: "Success!",
        description: "You've been registered as a donor successfully.",
      });
    } catch (error: any) {
      console.error('=== DONOR SUBMISSION ERROR ===');
      console.error('Error:', error);
      
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to register as donor. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      console.log('=== DONOR FORM SUBMISSION END ===');
    }
  };

  const handleInputChange = (field: keyof DonorFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <Navbar />
        <div className="relative z-10 pt-20 pb-16 px-4 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-soft-white">Please log in to register as a donor.</p>
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
            src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
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
              <CardTitle className="text-soft-white text-center">Registration Successful!</CardTitle>
              <CardDescription className="text-dark-text/70 text-center">
                You've been registered as a donor. Your certificate has been generated and saved.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => navigate('/donors')} 
                className="w-full bg-gradient-to-r from-neon-pink to-electric-cyan text-white"
              >
                View All Donors
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
          src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
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
              <Heart className="w-10 h-10 text-white" fill="currentColor" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-soft-white mb-6">
              Become a Hero
            </h1>
            <p className="text-xl text-dark-text/80 max-w-2xl mx-auto">
              Join our community of life-saving donors and make a difference in someone's life today
            </p>
          </div>

          <Card className="glass-card animate-slide-up">
            <CardHeader>
              <CardTitle className="text-soft-white flex items-center">
                <Heart className="w-6 h-6 mr-2 text-neon-pink" fill="currentColor" />
                Donor Registration
              </CardTitle>
              <CardDescription className="text-dark-text/70">
                Fill out your complete information to register as a blood donor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-soft-white flex items-center">
                    <User className="w-5 h-5 mr-2 text-neon-pink" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="full_name" className="text-soft-white flex items-center">
                        <User className="w-4 h-4 mr-2 text-neon-pink" />
                        Full Name *
                      </Label>
                      <Input
                        id="full_name"
                        value={formData.full_name}
                        onChange={(e) => handleInputChange('full_name', e.target.value)}
                        className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-soft-white flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-neon-pink" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age" className="text-soft-white flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-neon-pink" />
                        Age *
                      </Label>
                      <Input
                        id="age"
                        type="number"
                        min="18"
                        max="65"
                        value={formData.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                        placeholder="Enter your age"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone_number" className="text-soft-white flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-neon-pink" />
                        Phone Number *
                      </Label>
                      <Input
                        id="phone_number"
                        value={formData.phone_number}
                        onChange={(e) => handleInputChange('phone_number', e.target.value)}
                        className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergency_contact" className="text-soft-white flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-neon-pink" />
                        Emergency Contact
                      </Label>
                      <Input
                        id="emergency_contact"
                        value={formData.emergency_contact}
                        onChange={(e) => handleInputChange('emergency_contact', e.target.value)}
                        className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                        placeholder="Emergency contact number"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-soft-white flex items-center">
                        <Droplets className="w-4 h-4 mr-2 text-neon-pink" />
                        Blood Group *
                      </Label>
                      <Select onValueChange={(value) => handleInputChange('blood_group', value)} required>
                        <SelectTrigger className="glass border-electric-cyan/20 text-white">
                          <SelectValue placeholder="Select blood group" />
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
                  </div>
                </div>

                {/* Physical Information Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-soft-white flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-neon-pink" />
                    Physical Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="weight" className="text-soft-white flex items-center">
                        <Weight className="w-4 h-4 mr-2 text-neon-pink" />
                        Weight (kg)
                      </Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        min="30"
                        max="200"
                        value={formData.weight}
                        onChange={(e) => handleInputChange('weight', e.target.value)}
                        className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                        placeholder="Enter your weight"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="height" className="text-soft-white flex items-center">
                        <Ruler className="w-4 h-4 mr-2 text-neon-pink" />
                        Height (cm)
                      </Label>
                      <Input
                        id="height"
                        type="number"
                        step="0.1"
                        min="100"
                        max="250"
                        value={formData.height}
                        onChange={(e) => handleInputChange('height', e.target.value)}
                        className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                        placeholder="Enter your height"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="last_donation_date" className="text-soft-white flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-neon-pink" />
                        Last Donation Date
                      </Label>
                      <Input
                        id="last_donation_date"
                        type="date"
                        value={formData.last_donation_date}
                        onChange={(e) => handleInputChange('last_donation_date', e.target.value)}
                        className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Information Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-soft-white flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-neon-pink" />
                    Address Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address" className="text-soft-white flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-neon-pink" />
                        Street Address
                      </Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                        placeholder="Enter your street address"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-soft-white flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-neon-pink" />
                        City *
                      </Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                        placeholder="Enter your city"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-soft-white flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-neon-pink" />
                        State *
                      </Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                        placeholder="Enter your state"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Medical Information Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-soft-white flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-neon-pink" />
                    Medical Information
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="medical_conditions" className="text-soft-white flex items-center">
                      <Activity className="w-4 h-4 mr-2 text-neon-pink" />
                      Medical Conditions (Optional)
                    </Label>
                    <Textarea
                      id="medical_conditions"
                      value={formData.medical_conditions}
                      onChange={(e) => handleInputChange('medical_conditions', e.target.value)}
                      className="glass border-electric-cyan/20 focus:border-electric-cyan text-white min-h-[100px]"
                      placeholder="List any medical conditions or medications..."
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading || !formData.full_name || !formData.blood_group || !formData.age || !formData.phone_number || !formData.city || !formData.state}
                  className="w-full bg-gradient-to-r from-neon-pink to-electric-cyan hover:from-neon-pink/90 hover:to-electric-cyan/90 text-white py-6 text-lg font-semibold rounded-xl transform hover:scale-105 transition-all duration-300 animate-glow"
                >
                  <Heart className="w-6 h-6 mr-3" fill="currentColor" />
                  {loading ? 'Registering...' : 'Register as Hero Donor'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DonateForm;
