import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Droplets, User, Phone, Mail, MapPin, Calendar as CalendarIcon, Clock, AlertTriangle, Download } from 'lucide-react';
import { format } from 'date-fns';
import html2pdf from 'html2pdf.js';
import Navbar from '../components/Navbar';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const BloodRequest = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    contactPerson: '',
    email: '',
    phone: '',
    bloodGroup: '',
    unitsNeeded: '',
    hospital: '',
    address: '',
    requiredDate: null as Date | null,
    urgency: '',
    medicalCondition: '',
    doctorName: '',
    additionalNotes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  React.useEffect(() => {
    console.log('BloodRequest - Current user:', user);
    if (!user) {
      console.log('BloodRequest - No user found, redirecting to auth');
      navigate('/auth');
    }
  }, [user, navigate]);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const urgencyLevels = ['Critical', 'Urgent', 'Normal'];

  const generatePDF = () => {
    const urgencyColor = formData.urgency === 'Critical' ? '#dc2626' : formData.urgency === 'Urgent' ? '#ea580c' : '#16a34a';
    
    const element = document.createElement('div');
    element.innerHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; background: white; color: #333;">
        <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px solid #e91e63; padding-bottom: 20px;">
          <h1 style="color: #e91e63; font-size: 28px; margin: 0;">LifeGiver Blood Donation</h1>
          <h2 style="color: #666; font-size: 18px; margin: 10px 0 0 0;">Emergency Blood Request</h2>
          <p style="color: #999; margin: 5px 0 0 0;">Request ID: LG${Date.now()}</p>
          <div style="background: ${urgencyColor}; color: white; padding: 10px 20px; border-radius: 25px; display: inline-block; margin-top: 15px; font-weight: bold;">
            ${formData.urgency.toUpperCase()} PRIORITY
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
          <div>
            <h3 style="color: #e91e63; border-bottom: 2px solid #e91e63; padding-bottom: 10px; margin-bottom: 20px;">Patient Information</h3>
            <div style="margin-bottom: 15px;">
              <strong>Patient Name:</strong> ${formData.patientName}
            </div>
            <div style="margin-bottom: 15px;">
              <strong>Contact Person:</strong> ${formData.contactPerson}
            </div>
            <div style="margin-bottom: 15px;">
              <strong>Email:</strong> ${formData.email}
            </div>
            <div style="margin-bottom: 15px;">
              <strong>Phone:</strong> ${formData.phone}
            </div>
            <div style="margin-bottom: 15px;">
              <strong>Medical Condition:</strong> ${formData.medicalCondition || 'Not specified'}
            </div>
          </div>
          
          <div>
            <h3 style="color: #e91e63; border-bottom: 2px solid #e91e63; padding-bottom: 10px; margin-bottom: 20px;">Blood Requirements</h3>
            <div style="margin-bottom: 15px;">
              <strong>Blood Group Needed:</strong> <span style="background: #e91e63; color: white; padding: 5px 10px; border-radius: 5px; font-weight: bold;">${formData.bloodGroup}</span>
            </div>
            <div style="margin-bottom: 15px;">
              <strong>Units Required:</strong> ${formData.unitsNeeded} units
            </div>
            <div style="margin-bottom: 15px;">
              <strong>Required Date:</strong> ${formData.requiredDate ? format(formData.requiredDate, "PPP") : 'ASAP'}
            </div>
            <div style="margin-bottom: 15px;">
              <strong>Urgency:</strong> <span style="color: ${urgencyColor}; font-weight: bold;">${formData.urgency}</span>
            </div>
          </div>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="color: #e91e63; border-bottom: 2px solid #e91e63; padding-bottom: 10px; margin-bottom: 20px;">Hospital Information</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
              <div style="margin-bottom: 15px;">
                <strong>Hospital:</strong> ${formData.hospital}
              </div>
              <div style="margin-bottom: 15px;">
                <strong>Doctor:</strong> ${formData.doctorName}
              </div>
            </div>
            <div>
              <div style="margin-bottom: 15px;">
                <strong>Address:</strong> ${formData.address}
              </div>
            </div>
          </div>
        </div>
        
        ${formData.additionalNotes ? `
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
          <h3 style="color: #e91e63; margin-top: 0;">Additional Notes</h3>
          <p style="margin: 0;">${formData.additionalNotes}</p>
        </div>
        ` : ''}
        
        <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
          <h3 style="color: #856404; margin-top: 0;">Emergency Contact Information</h3>
          <p style="margin: 0; color: #856404;">If you can donate ${formData.bloodGroup} blood, please contact ${formData.contactPerson} immediately at ${formData.phone}</p>
        </div>
        
        <div style="text-align: center; margin-top: 40px; border-top: 1px solid #ddd; padding-top: 20px;">
          <p style="color: #666; margin: 0;">Thank you for helping save a life!</p>
          <p style="color: #999; font-size: 14px; margin: 10px 0 0 0;">Generated on ${new Date().toLocaleDateString()} | www.lifegiver.com</p>
        </div>
      </div>
    `;

    const opt = {
      margin: 1,
      filename: `LifeGiver_Blood_Request_${formData.patientName.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

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
    console.log('Form data:', formData);

    setLoading(true);
    try {
      // Validate required fields
      if (!formData.patientName.trim() || !formData.bloodGroup || !formData.contactPerson.trim() || !formData.phone.trim() || !formData.hospital.trim()) {
        throw new Error('Please fill in all required fields');
      }

      // Prepare request data
      const requestData = {
        user_id: user.id,
        name: formData.patientName.trim(),
        blood_group_needed: formData.bloodGroup,
        location: `${formData.address} - ${formData.hospital}`.trim(),
        contact_details: `${formData.contactPerson} - ${formData.phone} - ${formData.email}`.trim(),
        message: `Medical Condition: ${formData.medicalCondition || 'Not specified'}\nUnits Needed: ${formData.unitsNeeded}\nUrgency: ${formData.urgency}\nDoctor: ${formData.doctorName}\nRequired Date: ${formData.requiredDate ? format(formData.requiredDate, "PPP") : 'ASAP'}\nAdditional Notes: ${formData.additionalNotes}`.trim(),
        status: 'active',
      };

      console.log('Final request data to insert:', JSON.stringify(requestData, null, 2));

      const { data, error } = await supabase
        .from('requests')
        .insert(requestData)
        .select();

      if (error) {
        console.error('Supabase insertion error:', error);
        throw error;
      }

      if (!data || data.length === 0) {
        console.error('No data returned from insertion');
        throw new Error('No data was returned from the database insertion');
      }

      console.log('Request submitted successfully:', data);
      setIsSubmitted(true);
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

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 pb-16 px-4 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-white">Please log in to submit a blood request.</p>
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
              <Droplets className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-soft-white mb-6">
              Request Blood
            </h1>
            <p className="text-xl text-dark-text/80 max-w-2xl mx-auto">
              Submit your blood request and connect with verified donors in your area
            </p>
          </div>

          {isSubmitted ? (
            <div className="glass-card p-8 rounded-2xl text-center animate-fade-in">
              <div className="w-20 h-20 bg-gradient-to-r from-neon-pink to-electric-cyan rounded-full flex items-center justify-center mx-auto mb-6">
                <Droplets className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-soft-white mb-4">Request Submitted!</h2>
              <p className="text-dark-text/80 mb-8">Your blood request has been submitted and saved to the database. We will notify nearby donors immediately.</p>
              <div className="space-y-4">
                <Button
                  onClick={generatePDF}
                  className="bg-gradient-to-r from-neon-pink to-electric-cyan hover:from-neon-pink/90 hover:to-electric-cyan/90 text-white px-8 py-3 rounded-full"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Request PDF
                </Button>
                <div className="flex space-x-4 justify-center">
                  <Button 
                    onClick={() => navigate('/requests')} 
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    View All Requests
                  </Button>
                  <Button 
                    onClick={() => navigate('/dashboard')} 
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl animate-slide-up">
              {/* Patient Information */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-soft-white mb-6 flex items-center">
                  <User className="w-6 h-6 mr-3 text-neon-pink" />
                  Patient Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="patientName" className="text-soft-white">
                      Patient Name *
                    </Label>
                    <Input
                      id="patientName"
                      value={formData.patientName}
                      onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                      className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPerson" className="text-soft-white">
                      Contact Person *
                    </Label>
                    <Input
                      id="contactPerson"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                      className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-soft-white flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-neon-pink" />
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                      required
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
                </div>
              </div>

              {/* Blood Requirements */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-soft-white mb-6 flex items-center">
                  <Droplets className="w-6 h-6 mr-3 text-neon-pink" />
                  Blood Requirements
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-soft-white">
                      Blood Group Needed *
                    </Label>
                    <Select onValueChange={(value) => setFormData({...formData, bloodGroup: value})}>
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
                    <Label htmlFor="unitsNeeded" className="text-soft-white">
                      Units Needed *
                    </Label>
                    <Input
                      id="unitsNeeded"
                      type="number"
                      min="1"
                      value={formData.unitsNeeded}
                      onChange={(e) => setFormData({...formData, unitsNeeded: e.target.value})}
                      className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-soft-white flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2 text-neon-pink" />
                      Urgency Level *
                    </Label>
                    <Select onValueChange={(value) => setFormData({...formData, urgency: value})}>
                      <SelectTrigger className="glass border-electric-cyan/20 text-white">
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        {urgencyLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            <span className={level === 'Critical' ? 'text-red-500' : level === 'Urgent' ? 'text-orange-500' : 'text-green-500'}>
                              {level}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Hospital and Location */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-soft-white mb-6 flex items-center">
                  <MapPin className="w-6 h-6 mr-3 text-neon-pink" />
                  Hospital Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="hospital" className="text-soft-white">
                      Hospital Name *
                    </Label>
                    <Input
                      id="hospital"
                      value={formData.hospital}
                      onChange={(e) => setFormData({...formData, hospital: e.target.value})}
                      className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doctorName" className="text-soft-white">
                      Doctor Name
                    </Label>
                    <Input
                      id="doctorName"
                      value={formData.doctorName}
                      onChange={(e) => setFormData({...formData, doctorName: e.target.value})}
                      className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="address" className="text-soft-white">
                      Hospital Address *
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
                    <Label className="text-soft-white flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-2 text-neon-pink" />
                      Required Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="glass border-electric-cyan/20 w-full justify-start text-left font-normal text-white"
                        >
                          {formData.requiredDate ? (
                            format(formData.requiredDate, "PPP")
                          ) : (
                            <span>When is blood needed?</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.requiredDate}
                          onSelect={(date) => setFormData({...formData, requiredDate: date})}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medicalCondition" className="text-soft-white">
                      Medical Condition
                    </Label>
                    <Input
                      id="medicalCondition"
                      value={formData.medicalCondition}
                      onChange={(e) => setFormData({...formData, medicalCondition: e.target.value})}
                      className="glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="mb-8">
                <Label htmlFor="additionalNotes" className="text-soft-white mb-3 block">
                  Additional Notes
                </Label>
                <Textarea
                  id="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                  className="glass border-electric-cyan/20 focus:border-electric-cyan text-white min-h-[120px]"
                  placeholder="Any additional information that might help donors..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading || !formData.patientName || !formData.bloodGroup || !formData.contactPerson || !formData.phone || !formData.hospital}
                  className="bg-gradient-to-r from-neon-pink to-electric-cyan hover:from-neon-pink/90 hover:to-electric-cyan/90 text-white px-16 py-4 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300 animate-glow"
                >
                  <Clock className="w-6 h-6 mr-3" />
                  {loading ? 'Submitting...' : 'Submit Blood Request'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BloodRequest;
