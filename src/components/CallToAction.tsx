
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Droplets, Users, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const navigate = useNavigate();

  const handleBecomeDonor = () => {
    navigate('/donate-form');
  };

  const handleRequestBlood = () => {
    navigate('/request-form');
  };

  const handleFindDonors = () => {
    navigate('/donors');
  };

  const handleFindEvents = () => {
    navigate('/events');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-neon-pink/10 to-electric-cyan/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-neon-pink/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-electric-cyan/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Save Lives?
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Join our community of heroes. Every donation matters, every life counts.
            Take action today and be part of something bigger than yourself.
          </p>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Button
            size="lg"
            onClick={handleBecomeDonor}
            className="bg-gradient-to-r from-neon-pink to-neon-pink/80 hover:from-neon-pink/90 hover:to-neon-pink/70 text-white p-6 h-auto flex-col space-y-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-neon-pink/25 cursor-pointer"
          >
            <Heart className="w-8 h-8" fill="currentColor" />
            <span className="text-lg font-semibold">Become a Donor</span>
            <span className="text-sm opacity-90">Register to donate blood</span>
          </Button>

          <Button
            size="lg"
            onClick={handleRequestBlood}
            className="bg-gradient-to-r from-electric-cyan to-electric-cyan/80 hover:from-electric-cyan/90 hover:to-electric-cyan/70 text-white p-6 h-auto flex-col space-y-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-electric-cyan/25 cursor-pointer"
          >
            <Droplets className="w-8 h-8" />
            <span className="text-lg font-semibold">Request Blood</span>
            <span className="text-sm opacity-90">Find blood donors nearby</span>
          </Button>

          <Button
            size="lg"
            onClick={handleFindDonors}
            className="bg-gradient-to-r from-purple-500 to-purple-400 hover:from-purple-600 hover:to-purple-500 text-white p-6 h-auto flex-col space-y-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 cursor-pointer"
          >
            <Users className="w-8 h-8" />
            <span className="text-lg font-semibold">Find Donors</span>
            <span className="text-sm opacity-90">Browse donor directory</span>
          </Button>

          <Button
            size="lg"
            onClick={handleFindEvents}
            className="bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white p-6 h-auto flex-col space-y-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25 cursor-pointer"
          >
            <Calendar className="w-8 h-8" />
            <span className="text-lg font-semibold">Find Events</span>
            <span className="text-sm opacity-90">Join donation events</span>
          </Button>
        </div>

        {/* Main CTA Section */}
        <div className="bg-gradient-to-r from-neon-pink/20 to-electric-cyan/20 rounded-2xl p-8 md:p-12 backdrop-blur-sm border border-white/10">
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Every Drop Counts
            </h3>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              One blood donation can save up to three lives. Join thousands of heroes
              who have already made a difference in their communities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleBecomeDonor}
                className="bg-neon-pink hover:bg-neon-pink/90 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 shadow-lg transform hover:scale-105 cursor-pointer"
              >
                <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                Start Donating Today
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={handleRequestBlood}
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 backdrop-blur-sm transform hover:scale-105 cursor-pointer"
              >
                <Droplets className="w-5 h-5 mr-2" />
                Request Blood Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
