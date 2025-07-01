
import React from 'react';
import { Button } from '@/components/ui/button';
import { Droplets } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Hero = () => {
  const navigate = useNavigate();

  const handleBecomeDonor = () => {
    navigate('/donate-form');
  };

  const handleRequestBlood = () => {
    navigate('/request-form');
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fullscreen Image Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
          alt="Blood donation hero background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <Navbar />
      
      {/* Hero Content - Fixed padding to account for navbar */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 pt-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
            Be a Hero in
            <span className="block text-neon-pink mt-2">Real Life</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Every drop counts. Every donation saves lives. Join thousands of heroes 
            making a difference through blood donation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button 
              size="lg" 
              onClick={handleBecomeDonor}
              className="bg-neon-pink hover:bg-neon-pink/90 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 shadow-lg transform hover:scale-105 cursor-pointer"
            >
              <Droplets className="w-5 h-5 mr-2" />
              Become a Donor
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleRequestBlood}
              className="border-2 border-white text-white hover:bg-white hover:text-space-navy px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 backdrop-blur-sm transform hover:scale-105 cursor-pointer"
            >
              <Droplets className="w-5 h-5 mr-2" />
              Request Blood
            </Button>
          </div>

          {/* Simple Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center backdrop-blur-sm bg-white/10 p-6 rounded-xl border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">25,000+</div>
              <div className="text-white/80">Lives Saved</div>
            </div>
            <div className="text-center backdrop-blur-sm bg-white/10 p-6 rounded-xl border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">15,000+</div>
              <div className="text-white/80">Active Donors</div>
            </div>
            <div className="text-center backdrop-blur-sm bg-white/10 p-6 rounded-xl border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-white/80">Partner Hospitals</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
