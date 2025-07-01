import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus, Calendar, Heart, Award, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HowItWorks = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/donate-form');
  };

  const handleScheduleAppointment = () => {
    navigate('/events');
  };

  const steps = [
    {
      icon: UserPlus,
      title: 'Register as Donor',
      description: 'Sign up with your basic information and blood type. Quick and easy registration process.',
      action: 'Register Now',
      onClick: () => navigate('/donate-form')
    },
    {
      icon: Calendar,
      title: 'Schedule Appointment',
      description: 'Choose a convenient time and location for your blood donation appointment.',
      action: 'Find Events',
      onClick: () => navigate('/events')
    },
    {
      icon: Heart,
      title: 'Donate Blood',
      description: 'Complete the donation process with our trained medical professionals.',
      action: 'Learn More',
      onClick: () => navigate('/contact')
    },
    {
      icon: Award,
      title: 'Save Lives',
      description: 'Your donation can save up to 3 lives. Join our community of heroes.',
      action: 'View Impact',
      onClick: () => navigate('/dashboard')
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-space-navy to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-neon-pink/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-electric-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            How It Works
          </h2>
          <p className="italic text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Donating blood is simple and safe. Follow these easy steps to become a life-saving hero.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="group relative">
              {/* Step Card */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-neon-pink/30 transition-all duration-300 hover:transform hover:scale-105 h-full">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-neon-pink to-electric-cyan rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-r from-neon-pink/20 to-electric-cyan/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-neon-pink" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-4">
                  {step.title}
                </h3>
                <p className="italic text-white/70 mb-6 leading-relaxed">
                  {step.description}
                </p>

                {/* Action Button */}
                <Button
                  onClick={step.onClick}
                  className="w-full bg-gradient-to-r from-neon-pink/20 to-electric-cyan/20 hover:from-neon-pink/30 hover:to-electric-cyan/30 text-white border border-neon-pink/30 hover:border-neon-pink/50 transition-all duration-300 cursor-pointer"
                  variant="outline"
                >
                  {step.action}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Connector Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-neon-pink/50" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-neon-pink/10 to-electric-cyan/10 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="italic text-white/70 mb-8 max-w-2xl mx-auto">
              Join thousands of heroes who are making a difference. Your journey to save lives starts here.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-neon-pink to-electric-cyan hover:from-neon-pink/90 hover:to-electric-cyan/90 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 shadow-lg transform hover:scale-105 cursor-pointer"
              >
                <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                Get Started Now
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={handleScheduleAppointment}
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 backdrop-blur-sm transform hover:scale-105 cursor-pointer"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Appointment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
