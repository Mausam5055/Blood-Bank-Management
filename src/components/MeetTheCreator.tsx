import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Github, Linkedin, Mail, Heart, Code, Coffee, Star } from 'lucide-react';

const MeetTheCreator = () => {
  return (
    <section className="py-20 px-4 bg-black min-h-screen flex items-center relative overflow-hidden">
      {/* Minimal, soft background gradient */}
      <div className="absolute inset-0 z-0">
        {/* SVG grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-20 mix-blend-overlay pointer-events-none" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#fff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" style={{ animationDelay: '2s' }} />
      </div>
      <div className="w-full max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Meet the <span className="text-red-500">Creator</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            The passionate developer behind LifeGiver who believes in the power of technology to save lives
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-center animate-fade-in">
          {/* Creator Photo Section */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-56 h-72 md:w-72 md:h-96 bg-gradient-to-br from-gray-900/80 to-black/80 p-1 rounded-2xl overflow-hidden shadow-2xl border-2 border-red-500/20">
                <div className="w-full h-full rounded-xl overflow-hidden border border-red-500/10 bg-gray-900">
                  <img
                    src="/lovable-uploads/8ddba743-7775-41bb-8421-21504d01c737.png"
                    alt="Mausam Kar - App Creator"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Creator Info Section */}
          <div className="space-y-8 lg:pl-8 text-center lg:text-left">
            <div>
              <h3 className="text-4xl lg:text-5xl font-bold text-white mb-2 animate-fade-in">
                Mausam Kar
              </h3>
              <p className="text-xl text-red-500 font-semibold mb-2 animate-fade-in">
                Computer Science Engineering Student
              </p>
              <div className="flex justify-center lg:justify-start mb-4">
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-red-500 to-cyan-400 text-white font-semibold rounded-full shadow-md hover:from-red-600 hover:to-cyan-500 transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
                  Download Resume
                </a>
              </div>
              <p className="text-lg text-gray-300 mb-6 animate-fade-in">
                VIT University • Assam, India
              </p>
              
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed animate-fade-in">
                <p className="relative">
                  <span className="absolute -left-4 top-0 text-red-500 text-2xl">"</span>
                  I created LifeGiver after witnessing firsthand how difficult it can be to find blood donors during emergencies. 
                  Technology should bridge the gap between those who need help and those willing to help.
                  <span className="absolute -right-1 bottom-0 text-red-500 text-2xl">"</span>
                </p>
                
                <p>
                  As a Computer Science student at VIT, I believe every line of code in this application was written with the hope that it might save a life. 
                  Blood donation is one of the most selfless acts of humanity, and I wanted to make it more accessible through technology.
                </p>
                
                <div className="bg-gradient-to-r from-red-500/10 to-cyan-400/10 p-6 rounded-xl border border-red-500/10">
                  <p className="text-red-400 font-medium text-xl italic">
                    "Together, we can build a community where no one has to search desperately for life-saving blood."
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start space-x-4 animate-fade-in">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 rounded-xl bg-gray-900/80 border border-red-500/20 text-white hover:border-red-500/50 transition-all duration-300 hover:scale-105"
              >
                <Github className="w-6 h-6 group-hover:text-red-500 transition-colors" />
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-red-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
              
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 rounded-xl bg-gray-900/80 border border-red-500/20 text-white hover:border-red-500/50 transition-all duration-300 hover:scale-105"
              >
                <Linkedin className="w-6 h-6 group-hover:text-red-500 transition-colors" />
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-red-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
              
              <a
                href="mailto:mausam@lifegiver.com"
                className="group relative p-4 rounded-xl bg-gray-900/80 border border-red-500/20 text-white hover:border-red-500/50 transition-all duration-300 hover:scale-105"
              >
                <Mail className="w-6 h-6 group-hover:text-red-500 transition-colors" />
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-red-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-20">
          <Card className="bg-gray-900/50 border-red-500/20 hover:border-red-500/40 transition-all duration-300 group backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="text-4xl font-bold text-red-500 mb-2 group-hover:scale-110 transition-transform">3+</div>
              <div className="text-gray-300 text-lg">Years of Experience</div>
              <Star className="w-6 h-6 text-red-500/50 mx-auto mt-4" />
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-red-500/20 hover:border-red-500/40 transition-all duration-300 group backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="text-4xl font-bold text-red-500 mb-2 group-hover:scale-110 transition-transform">25+</div>
              <div className="text-gray-300 text-lg">Projects Completed</div>
              <Code className="w-6 h-6 text-red-500/50 mx-auto mt-4" />
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-red-500/20 hover:border-red-500/40 transition-all duration-300 group backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="text-4xl font-bold text-red-500 mb-2 group-hover:scale-110 transition-transform">B+</div>
              <div className="text-gray-300 text-lg">Blood Type</div>
              <Heart className="w-6 h-6 text-red-500/50 mx-auto mt-4" fill="currentColor" />
            </CardContent>
          </Card>
        </div>
      </div>
      <style>{`
        .animate-glow {
          animation: glow 2.5s ease-in-out infinite alternate;
        }
        @keyframes glow {
          0% { box-shadow: 0 0 8px #ff4d8b, 0 0 16px #ff4d8b33; }
          100% { box-shadow: 0 0 32px #ff4d8b, 0 0 64px #ff4d8b33; }
        }
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

export default MeetTheCreator;
