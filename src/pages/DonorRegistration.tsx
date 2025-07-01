
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Heart, User, Phone, Mail, MapPin, Calendar as CalendarIcon, Droplets, Upload, FileText, Camera, Download } from 'lucide-react';
import { format } from 'date-fns';
import html2pdf from 'html2pdf.js';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const DonorRegistration = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bloodGroup: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    lastDonation: null as Date | null,
    medicalConditions: '',
  });

  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [medicalDoc, setMedicalDoc] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

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
              <strong>Email:</strong> ${donorData.email}
            </div>
            <div style="margin-bottom: 15px;">
              <strong>Phone:</strong> ${donorData.phone_number}
            </div>
          </div>
          
          <div>
            <h3 style="color: #e91e63; border-bottom: 2px solid #e91e63; padding-bottom: 10px; margin-bottom: 20px;">Location Details</h3>
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
      
      // Upload to Supabase Storage
      const fileName = `${user?.id}/${Date.now()}_donor_certificate.pdf`;
      const { data, error } = await supabase.storage
        .from('donor-pdfs')
        .upload(fileName, pdfBlob);

      if (error) {
        console.error('Storage upload error:', error);
        throw error;
      }
      
      // Get public URL
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
      toast({
        title: "Error",
        description: "You must be logged in to register as a donor",
        variant: "destructive",
      });
      return;
    }

    console.log('=== DONOR REGISTRATION SUBMISSION START ===');
    console.log('User:', user);
    console.log('Form data:', formData);

    setLoading(true);
    try {
      // Validate required fields
      if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.bloodGroup || !formData.phone.trim() || !formData.city.trim() || !formData.state.trim()) {
        throw new Error('Please fill in all required fields');
      }

      // Estimate age from last donation or set default
      const estimatedAge = 25; // Default age if not provided

      // Generate and upload PDF (non-blocking)
      let pdfUrl = '';
      const donorData = {
        full_name: `${formData.firstName} ${formData.lastName}`,
        blood_group: formData.bloodGroup,
        phone_number: formData.phone,
        city: formData.city,
        state: formData.state,
        availability: true,
        email: formData.email
      };

      try {
        pdfUrl = await generatePDF(donorData);
        console.log('PDF generated and uploaded:', pdfUrl);
      } catch (pdfError) {
        console.warn('PDF generation failed, continuing without PDF:', pdfError);
      }

      // Prepare donor data for database
      const finalDonorData = {
        user_id: user.id,
        full_name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        blood_group: formData.bloodGroup,
        age: estimatedAge,
        phone_number: formData.phone.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        availability: true,
        pdf_url: pdfUrl || null,
      };

      console.log('Final donor data to insert:', finalDonorData);

      // Insert donor data into database
      const { data, error } = await supabase
        .from('donors')
        .insert(finalDonorData)
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

      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "You've been registered as a donor successfully.",
      });
    } catch (error: any) {
      console.error('=== DONOR REGISTRATION ERROR ===');
      console.error('Error:', error);
      
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to register as donor. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      console.log('=== DONOR REGISTRATION SUBMISSION END ===');
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePhoto(e.target.files[0]);
    }
  };

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMedicalDoc(e.target.files[0]);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 pb-16 px-4 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-white">Please log in to register as a donor.</p>
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

          {isSubmitted ? (
            <div className="glass-card p-8 rounded-2xl text-center animate-fade-in">
              <div className="w-20 h-20 bg-gradient-to-r from-neon-pink to-electric-cyan rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-white" fill="currentColor" />
              </div>
              <h2 className="text-3xl font-bold text-soft-white mb-4">Registration Successful!</h2>
              <p className="text-dark-text/80 mb-8">Thank you for registering as a blood donor. Your registration has been submitted successfully and saved to our database.</p>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => navigate('/donors')}
                  className="bg-gradient-to-r from-neon-pink to-electric-cyan hover:from-neon-pink/90 hover:to-electric-cyan/90 text-white px-8 py-3 rounded-full"
                >
                  View All Donors
                </Button>
                <Button
                  onClick={() => navigate('/dashboard')}
                  variant="outline"
                  className="border-electric-cyan/50 text-electric-cyan hover:bg-electric-cyan/10 px-8 py-3 rounded-full"
                >
                  Go to Dashboard
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl animate-slide-up">
              {/* Photo Upload Section */}
              <div className="mb-8 text-center">
                <h3 className="text-2xl font-semibold text-soft-white mb-6 flex items-center justify-center">
                  <Camera className="w-6 h-6 mr-3 text-neon-pink" />
                  Profile Information
                </h3>
                
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-32 h-32 bg-gradient-to-r from-neon-pink/20 to-electric-cyan/20 rounded-full flex items-center justify-center border-2 border-dashed border-neon-pink/50">
                    {profilePhoto ? (
                      <img 
                        src={URL.createObjectURL(profilePhoto)} 
                        alt="Profile" 
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <Camera className="w-12 h-12 text-neon-pink/70" />
                    )}
                  </div>
                  
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <Button type="button" variant="outline" className="border-electric-cyan/50 text-electric-cyan hover:bg-electric-cyan/10">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </Button>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-soft-white flex items-center">
                    <User className="w-4 h-4 mr-2 text-neon-pink" />
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-soft-white">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-soft-white flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-neon-pink" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-soft-white flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-neon-pink" />
                    Phone *
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-soft-white flex items-center">
                    <Droplets className="w-4 h-4 mr-2 text-neon-pink" />
                    Blood Group *
                  </Label>
                  <Select onValueChange={(value) => setFormData({...formData, bloodGroup: value})} required>
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

                <div className="space-y-2">
                  <Label className="text-soft-white flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-2 text-neon-pink" />
                    Last Donation Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="glass border-electric-cyan/20 w-full justify-start text-left font-normal text-white"
                      >
                        {formData.lastDonation ? (
                          format(formData.lastDonation, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.lastDonation}
                        onSelect={(date) => setFormData({...formData, lastDonation: date})}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Address Section */}
              <div className="mt-8 space-y-6">
                <h3 className="text-xl font-semibold text-soft-white flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-neon-pink" />
                  Address Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="address" className="text-soft-white">
                      Street Address
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-soft-white">
                      City *
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-soft-white">
                      State *
                    </Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                      className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Medical Document Upload */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-soft-white mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-neon-pink" />
                  Medical Documents
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-soft-white mb-2 block">
                      Upload Medical Certificate (PDF)
                    </Label>
                    <label className="cursor-pointer block">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleDocUpload}
                        className="hidden"
                      />
                      <div className="glass border-2 border-dashed border-electric-cyan/50 rounded-lg p-6 text-center hover:border-electric-cyan transition-colors">
                        <Upload className="w-8 h-8 text-electric-cyan mx-auto mb-2" />
                        <p className="text-dark-text">
                          {medicalDoc ? medicalDoc.name : 'Click to upload PDF document'}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-12 flex justify-center">
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading || !formData.firstName || !formData.lastName || !formData.bloodGroup || !formData.phone || !formData.city || !formData.state}
                  className="bg-gradient-to-r from-neon-pink to-electric-cyan hover:from-neon-pink/90 hover:to-electric-cyan/90 text-white px-16 py-4 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300 animate-glow"
                >
                  <Heart className="w-6 h-6 mr-3" fill="currentColor" />
                  {loading ? 'Registering...' : 'Register as Hero Donor'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorRegistration;
