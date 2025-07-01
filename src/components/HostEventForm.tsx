
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Clock, Users, Mail, Phone, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface HostEventFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const HostEventForm = ({ isOpen, onClose }: HostEventFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    address: '',
    organizer: '',
    expected_donors: 50,
    contact_email: user?.email || '',
    contact_phone: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'expected_donors' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to host an event",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_events')
        .insert([
          {
            ...formData,
            user_id: user.id,
          }
        ]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your event has been submitted for review. We'll contact you soon!",
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        address: '',
        organizer: '',
        expected_donors: 50,
        contact_email: user?.email || '',
        contact_phone: '',
      });
      
      onClose();
    } catch (error: any) {
      console.error('Error submitting event:', error);
      toast({
        title: "Error",
        description: "Failed to submit event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900/95 border-white/10 text-white">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-4 top-4 text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </Button>
          <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-electric-cyan">
            Host a Blood Donation Event
          </CardTitle>
          <CardDescription className="text-gray-300">
            Fill out the form below to submit your event for review
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">Event Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="bg-black/30 border-white/20 text-white"
                placeholder="e.g., Community Blood Drive - Downtown"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="bg-black/30 border-white/20 text-white"
                placeholder="Brief description of your event..."
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-white flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Event Date *
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="bg-black/30 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time" className="text-white flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Event Time *
                </Label>
                <Input
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="bg-black/30 border-white/20 text-white"
                  placeholder="e.g., 9:00 AM - 5:00 PM"
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-white flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Location Name *
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="bg-black/30 border-white/20 text-white"
                placeholder="e.g., Community Center, Hospital Name"
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="text-white">Full Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="bg-black/30 border-white/20 text-white"
                placeholder="Complete address with city and state"
              />
            </div>

            {/* Organizer */}
            <div className="space-y-2">
              <Label htmlFor="organizer" className="text-white">Organizer/Organization *</Label>
              <Input
                id="organizer"
                name="organizer"
                value={formData.organizer}
                onChange={handleInputChange}
                required
                className="bg-black/30 border-white/20 text-white"
                placeholder="Your name or organization name"
              />
            </div>

            {/* Expected Donors */}
            <div className="space-y-2">
              <Label htmlFor="expected_donors" className="text-white flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Expected Donors
              </Label>
              <Input
                id="expected_donors"
                name="expected_donors"
                type="number"
                value={formData.expected_donors}
                onChange={handleInputChange}
                min="1"
                className="bg-black/30 border-white/20 text-white"
              />
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact_email" className="text-white flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Email *
                </Label>
                <Input
                  id="contact_email"
                  name="contact_email"
                  type="email"
                  value={formData.contact_email}
                  onChange={handleInputChange}
                  required
                  className="bg-black/30 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_phone" className="text-white flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Phone
                </Label>
                <Input
                  id="contact_phone"
                  name="contact_phone"
                  type="tel"
                  value={formData.contact_phone}
                  onChange={handleInputChange}
                  className="bg-black/30 border-white/20 text-white"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-neon-pink to-electric-cyan text-white hover:opacity-90"
              >
                {loading ? 'Submitting...' : 'Submit Event'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default HostEventForm;
