
import React, { useRef, useEffect, useState } from 'react';
import { Heart, Users, Calendar, Award } from 'lucide-react';

const DonorStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    lives: 0,
    donors: 0,
    donations: 0,
    awards: 0,
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  const targetCounts = {
    lives: 25000,
    donors: 15000,
    donations: 8500,
    awards: 50,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounts({
        lives: Math.floor(targetCounts.lives * easeOut),
        donors: Math.floor(targetCounts.donors * easeOut),
        donations: Math.floor(targetCounts.donations * easeOut),
        awards: Math.floor(targetCounts.awards * easeOut),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts(targetCounts);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible]);

  const stats = [
    {
      icon: Heart,
      label: 'Lives Saved',
      value: counts.lives.toLocaleString(),
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
    },
    {
      icon: Users,
      label: 'Active Donors',
      value: counts.donors.toLocaleString(),
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: Calendar,
      label: 'Total Donations',
      value: counts.donations.toLocaleString(),
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: Award,
      label: 'Partner Hospitals',
      value: counts.awards.toString(),
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-12 md:py-20 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Our Impact in Numbers
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Together, we're making a difference. See how our community of heroes 
            is saving lives every day.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center p-4 md:p-8 backdrop-blur-sm bg-white/5 rounded-xl md:rounded-2xl border border-white/10 transform transition-all duration-500 hover:scale-105 hover:bg-white/10 ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full ${stat.bgColor} mb-3 md:mb-6`}>
                <stat.icon className={`w-6 h-6 md:w-8 md:h-8 ${stat.color}`} />
              </div>
              <div className={`text-2xl md:text-4xl font-bold ${stat.color} mb-1 md:mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-300 font-medium text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-16 text-center">
          <div className="inline-flex items-center space-x-2 md:space-x-4 p-4 md:p-6 backdrop-blur-sm bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl md:rounded-2xl border border-red-500/20">
            <Heart className="w-6 h-6 md:w-8 md:h-8 text-red-500 animate-pulse" fill="currentColor" />
            <span className="text-lg md:text-xl text-white font-semibold">
              Every 2 seconds, someone needs blood
            </span>
            <Heart className="w-6 h-6 md:w-8 md:h-8 text-red-500 animate-pulse" fill="currentColor" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonorStats;
