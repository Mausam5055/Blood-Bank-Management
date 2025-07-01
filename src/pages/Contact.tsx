import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Zap, CheckCircle, User } from 'lucide-react';
import Navbar from '../components/Navbar';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    priority: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        priority: '',
      });
    }, 3000);
  };

  const subjects = [
    'General Inquiry',
    'Donation Appointment',
    'Blood Request',
    'Technical Support',
    'Partnership Inquiry',
    'Emergency Request'
  ];

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
            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1920&q=80"
            alt="Contact hero background"
            className="w-full h-full object-cover object-center opacity-60"
          />
          {/* Gradient overlay for smooth blend */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/95" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-neon-pink to-electric-cyan rounded-full mb-6 animate-heartbeat shadow-lg">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-neon-pink to-electric-cyan mb-6 md:mb-8 tracking-tight leading-tight">
              Get in Touch
            </h1>
            <p className="hidden md:block text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed md:leading-9 mb-2 md:mb-4">
              Have questions about blood donation? We're here to help you save lives.
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Main Content - Single Row Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Contact Info - Compact Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Emergency Contact */}
              <Card className="glass-card border-red-500/20 bg-gradient-to-r from-red-500/10 to-red-600/10 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-red-400 mb-1">Emergency Line</h3>
                      <p className="text-red-300 font-semibold">1-800-EMERGENCY</p>
                      <p className="text-red-300/70 text-sm">24/7 Urgent Support</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Phone Support */}
              <Card className="glass-card border-white/10 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-neon-pink to-electric-cyan rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">Phone Support</h3>
                      <p className="text-neon-pink font-semibold">1-800-LIFEBLOOD</p>
                      <p className="text-gray-400 text-sm">General Inquiries</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email Support */}
              <Card className="glass-card border-white/10 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-electric-cyan to-neon-pink rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">Email Support</h3>
                      <p className="text-electric-cyan font-semibold">support@lifegiver.org</p>
                      <p className="text-gray-400 text-sm">Response within 2 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card className="glass-card border-white/10 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">Visit Us</h3>
                      <p className="text-green-400 font-semibold">123 Life Avenue</p>
                      <p className="text-gray-400 text-sm">Health District, NY 10001</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Hours */}
              <Card className="glass-card border-white/10 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">Hours</h3>
                      <p className="text-purple-400 font-semibold">Mon-Fri: 8AM-8PM</p>
                      <p className="text-gray-400 text-sm">Weekends: 9AM-6PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form - Clean Right Column */}
            <div className="lg:col-span-3">
              <Card className="glass-card border-white/10 shadow-xl animate-slide-up">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold text-white mb-2 flex items-center">
                    <Send className="w-6 h-6 mr-3 text-neon-pink" />
                    Send us a Message
                  </CardTitle>
                  <p className="text-gray-300">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </CardHeader>
                <CardContent className="pb-6">
                  {isSubmitted ? (
                    <div className="text-center py-8 animate-fade-in">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-heartbeat">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-green-400 mb-2">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-gray-300">
                        Thank you for reaching out. We'll respond within 2 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name and Email Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-white font-medium flex items-center">
                            <User className="w-4 h-4 mr-2 text-neon-pink" />
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="glass border-electric-cyan/20 focus:border-electric-cyan text-white h-11 rounded-lg transition-all duration-300"
                            placeholder="Enter your full name"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-white font-medium flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-neon-pink" />
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="glass border-electric-cyan/20 focus:border-electric-cyan text-white h-11 rounded-lg transition-all duration-300"
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                      </div>

                      {/* Phone and Priority Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-white font-medium flex items-center">
                            <Phone className="w-4 h-4 mr-2 text-neon-pink" />
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="glass border-electric-cyan/20 focus:border-electric-cyan text-white h-11 rounded-lg transition-all duration-300"
                            placeholder="Enter your phone"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-white font-medium flex items-center">
                            <Zap className="w-4 h-4 mr-2 text-neon-pink" />
                            Priority Level
                          </Label>
                          <Select onValueChange={(value) => setFormData({...formData, priority: value})}>
                            <SelectTrigger className="glass border-electric-cyan/20 text-white h-11 rounded-lg">
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low Priority</SelectItem>
                              <SelectItem value="medium">Medium Priority</SelectItem>
                              <SelectItem value="high">High Priority</SelectItem>
                              <SelectItem value="urgent">Urgent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Subject */}
                      <div className="space-y-2">
                        <Label className="text-white font-medium">
                          Subject *
                        </Label>
                        <Select onValueChange={(value) => setFormData({...formData, subject: value})}>
                          <SelectTrigger className="glass border-electric-cyan/20 text-white h-11 rounded-lg">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            {subjects.map((subject) => (
                              <SelectItem key={subject} value={subject}>
                                {subject}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-white font-medium">
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="glass border-electric-cyan/20 focus:border-electric-cyan text-white min-h-[120px] rounded-lg resize-none transition-all duration-300"
                          placeholder="Please describe your inquiry in detail..."
                          required
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-4">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-neon-pink to-electric-cyan hover:from-neon-pink/90 hover:to-electric-cyan/90 text-white py-3 text-lg font-semibold rounded-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5 mr-2" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
