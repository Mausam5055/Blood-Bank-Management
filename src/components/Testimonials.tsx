import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Regular Donor',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    quote: 'Donating blood through LifeGiver has been incredibly rewarding. The process is smooth, and knowing that I\'ve helped save lives gives me immense satisfaction.',
    donations: 12,
  },
  {
    name: 'Michael Chen',
    role: 'Blood Recipient',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    quote: 'I received blood donations during my surgery, and it saved my life. Now I\'m a regular donor myself, giving back to the community that helped me.',
    donations: 8,
  },
  {
    name: 'Dr. Emily Rodriguez',
    role: 'Medical Director',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face',
    quote: 'LifeGiver has revolutionized our blood donation process. The platform makes it easy to connect with donors and manage our blood bank efficiently.',
    donations: 0,
  },
  {
    name: 'James Wilson',
    role: 'First-Time Donor',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    quote: 'I was nervous about donating blood for the first time, but the team made me feel comfortable. It\'s amazing to know that my donation can help up to 3 people.',
    donations: 1,
  },
];

const Testimonials = () => {
  // Duplicate testimonials for seamless looping
  const marqueeTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-black via-gray-900/50 to-black relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-20 animate-fade-in">
          <div className="inline-flex items-center justify-center p-2 bg-red-500/10 rounded-full mb-4 md:mb-6">
            <Quote className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-red-400 mb-4 md:mb-8 leading-tight">
            Stories from Our
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-neon-pink animate-pulse">
              Heroes
            </span>
          </h2>
          <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-red-500 to-neon-pink mx-auto mb-4 md:mb-8 rounded-full"></div>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed px-4">
            Hear from donors, recipients, and medical professionals about their
            <span className="text-red-400 font-medium"> life-changing experiences</span> with blood donation
          </p>
        </div>

        {/* Marquee Carousel */}
        <div className="relative w-full overflow-x-hidden">
          <div
            className="flex gap-8 md:gap-12 animate-marquee"
            style={{
              width: 'max-content',
              animation: 'marquee 32s linear infinite',
            }}
          >
            {marqueeTestimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="min-w-[320px] max-w-xs md:min-w-[400px] md:max-w-md bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 shadow-2xl p-6 md:p-8 flex flex-col items-center text-center"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-red-500 shadow-lg mb-4"
                />
                <blockquote className="text-lg md:text-xl text-gray-100 leading-relaxed font-light italic mb-4 relative">
                  <span className="text-3xl text-red-500/30 absolute -left-3 -top-2">"</span>
                  {testimonial.quote}
                  <span className="text-3xl text-red-500/30 absolute -right-3 -bottom-2">"</span>
                </blockquote>
                <div className="mt-2">
                  <h4 className="text-xl font-bold text-white mb-1 tracking-wide">{testimonial.name}</h4>
                  <p className="text-base text-red-400 font-medium mb-1">{testimonial.role}</p>
                  {testimonial.donations > 0 && (
                    <p className="text-red-300 text-sm font-medium">
                      {testimonial.donations} life-saving donations
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Marquee Animation Keyframes */}
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Testimonials;
