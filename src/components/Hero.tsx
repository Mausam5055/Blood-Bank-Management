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
          src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Blood donation hero background"
          className="w-full h-full object-cover"
        />
        {/* SVG grid overlay for subtle texture */}
        <svg className="absolute inset-0 w-full h-full opacity-10 mix-blend-overlay pointer-events-none" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#fff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/95" />
      </div>

      <Navbar />
      
      {/* Hero Content - Fixed padding to account for navbar */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 pt-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-neon-pink to-electric-cyan drop-shadow-[0_4px_32px_rgba(0,0,0,0.7)]">
            Be a Hero in
            <span className="block mt-2">Real Life</span>
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
              className="bg-gradient-to-r from-neon-pink to-electric-cyan hover:from-electric-cyan hover:to-neon-pink text-white px-10 py-4 text-lg font-semibold rounded-full transition-all duration-300 shadow-xl transform hover:scale-105 cursor-pointer border-0 focus:ring-4 focus:ring-electric-cyan/30"
            >
              <Droplets className="w-5 h-5 mr-2" />
              Become a Donor
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleRequestBlood}
              className="border-2 border-white/30 text-white hover:bg-white hover:text-space-navy px-10 py-4 text-lg font-semibold rounded-full transition-all duration-300 backdrop-blur-sm transform hover:scale-105 cursor-pointer focus:ring-4 focus:ring-neon-pink/30"
            >
              <Droplets className="w-5 h-5 mr-2" />
              Request Blood
            </Button>
          </div>

          {/* Simple Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20 shadow-lg">
              <div className="text-3xl font-bold text-white mb-2">25,000+</div>
              <div className="text-white/80">Lives Saved</div>
            </div>
            <div className="text-center backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20 shadow-lg">
              <div className="text-3xl font-bold text-white mb-2">15,000+</div>
              <div className="text-white/80">Active Donors</div>
            </div>
            <div className="text-center backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20 shadow-lg">
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
