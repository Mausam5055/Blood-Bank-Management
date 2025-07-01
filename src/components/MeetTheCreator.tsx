
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Github, Linkedin, Mail, Heart, Code, Coffee, Star } from 'lucide-react';

const MeetTheCreator = () => {
  return (
    <section className="py-20 px-4 bg-black min-h-screen flex items-center">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Meet the <span className="text-red-500">Creator</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            The passionate developer behind LifeGiver who believes in the power of technology to save lives
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Creator Photo Section */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Modern rectangular photo container */}
              <div className="w-80 h-96 bg-gradient-to-br from-red-500/20 to-red-600/20 p-1 rounded-2xl overflow-hidden shadow-2xl">
                <div className="w-full h-full rounded-xl overflow-hidden border border-red-500/30 bg-gray-900">
                  <img
                    src="/lovable-uploads/8ddba743-7775-41bb-8421-21504d01c737.png"
                    alt="Mausam Kar - App Creator"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center animate-pulse">
                <Heart className="w-8 h-8 text-white" fill="currentColor" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center animate-bounce">
                <Code className="w-6 h-6 text-white" />
              </div>
              
              <div className="absolute top-1/2 -left-6 w-10 h-10 bg-gradient-to-r from-red-500/80 to-red-600/80 rounded-full flex items-center justify-center animate-pulse delay-75">
                <Coffee className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Creator Info Section */}
          <div className="space-y-8 lg:pl-8">
            <div>
              <h3 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                Mausam Kar
              </h3>
              <p className="text-xl text-red-400 font-semibold mb-2">
                Computer Science Engineering Student
              </p>
              <p className="text-lg text-gray-300 mb-6">
                VIT University • Assam, India
              </p>
              
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
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
                
                <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 p-6 rounded-xl border border-red-500/20">
                  <p className="text-red-400 font-medium text-xl italic">
                    "Together, we can build a community where no one has to search desperately for life-saving blood."
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
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
    </section>
  );
};

export default MeetTheCreator;
