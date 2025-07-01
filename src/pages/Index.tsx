
import React from 'react';
import Hero from '../components/Hero';
import DonorStats from '../components/DonorStats';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import MeetTheCreator from '../components/MeetTheCreator';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-space-navy to-electric-cyan/10">
      <div className="animate-fade-in">
        <Hero />
        <HowItWorks />
        <DonorStats />
        <Testimonials />
        <CallToAction />
        <MeetTheCreator />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
