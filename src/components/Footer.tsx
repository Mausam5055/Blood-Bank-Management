
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Phone, BookOpen, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-red-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Heart className="w-8 h-8 text-red-500 mr-3" fill="currentColor" />
              <h3 className="text-2xl font-bold text-white">LifeGiver</h3>
            </div>
            <p className="text-gray-300 text-lg mb-6 max-w-md">
              Connecting donors with those in need. Every drop counts, every donation saves lives.
            </p>
            <div className="flex items-center text-gray-400 mb-2">
              <Phone className="w-4 h-4 mr-2 text-red-500" />
              <span>1-800-LIFEBLOOD</span>
            </div>
            <div className="flex items-center text-gray-400">
              <Mail className="w-4 h-4 mr-2 text-red-500" />
              <span>contact@lifegiver.org</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <div className="space-y-3">
              <Link 
                to="/donate-form" 
                className="flex items-center text-gray-300 hover:text-red-400 transition-colors duration-300 group"
              >
                <Heart className="w-4 h-4 mr-2 text-red-500 group-hover:text-red-400" />
                Donate Blood
              </Link>
              <Link 
                to="/request-form" 
                className="flex items-center text-gray-300 hover:text-red-400 transition-colors duration-300 group"
              >
                <MapPin className="w-4 h-4 mr-2 text-red-500 group-hover:text-red-400" />
                Request Blood
              </Link>
              <Link 
                to="/donors" 
                className="flex items-center text-gray-300 hover:text-red-400 transition-colors duration-300 group"
              >
                <Phone className="w-4 h-4 mr-2 text-red-500 group-hover:text-red-400" />
                Find Donors
              </Link>
              <Link 
                to="/events" 
                className="flex items-center text-gray-300 hover:text-red-400 transition-colors duration-300 group"
              >
                <BookOpen className="w-4 h-4 mr-2 text-red-500 group-hover:text-red-400" />
                Events
              </Link>
            </div>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <div className="space-y-3">
              <Link 
                to="/privacy-policy" 
                className="flex items-center text-gray-300 hover:text-red-400 transition-colors duration-300 group"
              >
                <Shield className="w-4 h-4 mr-2 text-red-500 group-hover:text-red-400" />
                Privacy Policy
              </Link>
              <Link 
                to="/terms-of-service" 
                className="flex items-center text-gray-300 hover:text-red-400 transition-colors duration-300 group"
              >
                <BookOpen className="w-4 h-4 mr-2 text-red-500 group-hover:text-red-400" />
                Terms of Service
              </Link>
              <Link 
                to="/contact" 
                className="flex items-center text-gray-300 hover:text-red-400 transition-colors duration-300 group"
              >
                <Mail className="w-4 h-4 mr-2 text-red-500 group-hover:text-red-400" />
                Contact Us
              </Link>
              <Link 
                to="/blog" 
                className="flex items-center text-gray-300 hover:text-red-400 transition-colors duration-300 group"
              >
                <BookOpen className="w-4 h-4 mr-2 text-red-500 group-hover:text-red-400" />
                Blog
              </Link>
            </div>
          </div>
        </div>

        {/* Emergency Banner */}
        <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/30 rounded-lg p-4 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Heart className="w-6 h-6 text-red-500 mr-3 animate-pulse" fill="currentColor" />
              <div>
                <h4 className="text-white font-semibold">Emergency Blood Request?</h4>
                <p className="text-gray-300 text-sm">Available 24/7 for urgent requirements</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="tel:+1-800-LIFEBLOOD" 
                className="text-red-500 hover:text-red-400 font-bold text-lg transition-colors"
              >
                1-800-LIFEBLOOD
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-red-500/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 LifeGiver. All rights reserved. Saving lives, one donation at a time.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-400 text-sm">
                <Heart className="w-4 h-4 text-red-500 mr-1" fill="currentColor" />
                <span>Made with love for humanity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
