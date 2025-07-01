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
    <section className="py-20 bg-gradient-to-b from-black via-gray-900/90 to-black relative overflow-hidden">
      {/* Subtle background elements for AMOLED look */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-red-500/10 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-cyan-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-lg animate-fade-in">
            Ready to <span className="text-red-500">Save Lives?</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            Join our community of heroes. Every donation matters, every life counts. Take action today and be part of something bigger than yourself.
          </p>
        </div>
        {/* Action Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fade-in">
          <Button
            size="lg"
            onClick={handleBecomeDonor}
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-black hover:from-red-700 hover:to-gray-900 text-white p-6 h-auto flex-col space-y-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg border border-red-500/30 hover:border-red-500/60 cursor-pointer"
          >
            <Heart className="w-8 h-8 text-red-500" fill="currentColor" />
            <span className="text-lg font-semibold">Become a Donor</span>
            <span className="text-sm opacity-90">Register to donate blood</span>
          </Button>
          <Button
            size="lg"
            onClick={handleRequestBlood}
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-black hover:from-cyan-700 hover:to-gray-900 text-white p-6 h-auto flex-col space-y-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg border border-cyan-400/30 hover:border-cyan-400/60 cursor-pointer"
          >
            <Droplets className="w-8 h-8 text-cyan-400" />
            <span className="text-lg font-semibold">Request Blood</span>
            <span className="text-sm opacity-90">Find blood donors nearby</span>
          </Button>
          <Button
            size="lg"
            onClick={handleFindDonors}
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-black hover:from-purple-700 hover:to-gray-900 text-white p-6 h-auto flex-col space-y-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg border border-purple-400/30 hover:border-purple-400/60 cursor-pointer"
          >
            <Users className="w-8 h-8 text-purple-400" />
            <span className="text-lg font-semibold">Find Donors</span>
            <span className="text-sm opacity-90">Browse donor directory</span>
          </Button>
          <Button
            size="lg"
            onClick={handleFindEvents}
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-black hover:from-green-700 hover:to-gray-900 text-white p-6 h-auto flex-col space-y-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg border border-green-400/30 hover:border-green-400/60 cursor-pointer"
          >
            <Calendar className="w-8 h-8 text-green-400" />
            <span className="text-lg font-semibold">Find Events</span>
            <span className="text-sm opacity-90">Join donation events</span>
          </Button>
        </div>
        {/* Main CTA Section */}
        <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-black/90 rounded-2xl p-8 md:p-12 backdrop-blur-sm border border-white/10 shadow-xl relative animate-fade-in">
          <div className="text-center relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
              <span className="text-red-500">Every Drop Counts</span>
            </h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in">
              One blood donation can save up to three lives. Join thousands of heroes who have already made a difference in their communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleBecomeDonor}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 shadow-lg transform hover:scale-105 cursor-pointer border border-red-500/60"
              >
                <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                Start Donating Today
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleRequestBlood}
                className="border-2 border-gray-700 text-white hover:bg-gray-800 hover:text-red-400 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 backdrop-blur-sm transform hover:scale-105 cursor-pointer"
              >
                <Droplets className="w-5 h-5 mr-2 text-cyan-400" />
                Request Blood Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .animate-float {
          animation: float 6s ease-in-out infinite alternate;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-16px); }
        }
      `}</style>
    </section>
  );
};

export default CallToAction;
