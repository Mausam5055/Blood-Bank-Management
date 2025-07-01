import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Lock, Eye, FileText, AlertTriangle, CheckCircle, Users, Database, Mail } from 'lucide-react';
import Navbar from '../components/Navbar';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black relative">
      {/* Full-screen background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Privacy background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/85" />
      </div>

      <Navbar />
      
      <div className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <div className="mb-8 animate-fade-in">
            <Link to="/">
              <Button variant="outline" className="border-blue-500/20 text-blue-500 hover:border-blue-500/20 hover:text-blue-500 hover:bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Header - Full Width */}
          <div className="glass-card p-6 sm:p-8 lg:p-12 rounded-2xl mb-8 animate-slide-up bg-gray-900/60 border-blue-500/20 backdrop-blur-md">
            <div className="flex items-center mb-6">
              <Shield className="w-10 h-10 lg:w-12 lg:h-12 text-blue-500 mr-4" />
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white">
                Privacy Policy
              </h1>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 leading-relaxed">
              We are committed to protecting your privacy and ensuring the security of your personal information. This policy explains how we collect, use, and safeguard your data.
            </p>
            <div className="mt-6 flex items-center text-sm lg:text-base text-gray-300">
              <AlertTriangle className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
              <span>Last updated: January 15, 2024</span>
            </div>
          </div>

          {/* Content - Two Column Layout on Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="glass-card p-6 sm:p-8 lg:p-10 rounded-2xl animate-slide-up bg-gray-900/60 border-red-500/20 backdrop-blur-md">
                <div className="flex items-center mb-4">
                  <Eye className="w-6 h-6 lg:w-8 lg:h-8 text-red-500 mr-3" />
                  <h2 className="text-2xl lg:text-3xl font-bold text-white">Information We Collect</h2>
                </div>
                <p className="mb-4 text-gray-200 text-base lg:text-lg">We collect information necessary to provide safe and effective blood donation services:</p>
                
                <h3 className="text-xl lg:text-2xl font-semibold text-red-400 mt-6 mb-3">Personal Information</h3>
                <ul className="enhanced-list text-gray-200 text-base lg:text-lg">
                  <li>Full name and contact information</li>
                  <li>Date of birth and government-issued ID</li>
                  <li>Address and emergency contact details</li>
                  <li>Blood type and medical history</li>
                  <li>Donation history and eligibility status</li>
                </ul>

                <h3 className="text-xl lg:text-2xl font-semibold text-red-400 mt-6 mb-3">Health Information</h3>
                <ul className="enhanced-list text-gray-200 text-base lg:text-lg">
                  <li>Pre-donation health screening results</li>
                  <li>Blood test results and vital signs</li>
                  <li>Medical conditions affecting donation eligibility</li>
                  <li>Medications and recent travel history</li>
                  <li>Previous adverse reactions to donation</li>
                </ul>

                <h3 className="text-xl lg:text-2xl font-semibold text-red-400 mt-6 mb-3">Technical Information</h3>
                <ul className="enhanced-list text-gray-200 text-base lg:text-lg">
                  <li>Website usage data and cookies</li>
                  <li>IP address and browser information</li>
                  <li>Device type and operating system</li>
                  <li>Pages visited and time spent on site</li>
                </ul>
              </div>

              <div className="glass-card p-6 sm:p-8 lg:p-10 rounded-2xl animate-slide-up bg-gray-900/60 border-red-500/20 backdrop-blur-md">
                <div className="flex items-center mb-4">
                  <Lock className="w-6 h-6 lg:w-8 lg:h-8 text-red-500 mr-3" />
                  <h2 className="text-2xl lg:text-3xl font-bold text-white">How We Protect Your Information</h2>
                </div>

                <div className="grid grid-cols-1 gap-6 mb-6">
                  <div className="security-item bg-gray-800/60 border border-red-500/20 p-6 lg:p-8 rounded-xl">
                    <h4 className="text-lg lg:text-xl font-semibold text-red-400 mb-2">Technical Safeguards</h4>
                    <p className="text-gray-200 text-sm lg:text-base">We use industry-standard encryption, secure servers, and regular security audits to protect your data.</p>
                  </div>
                  <div className="security-item bg-gray-800/60 border border-red-500/20 p-6 lg:p-8 rounded-xl">
                    <h4 className="text-lg lg:text-xl font-semibold text-red-400 mb-2">Physical Security</h4>
                    <p className="text-gray-200 text-sm lg:text-base">Our facilities have restricted access, surveillance systems, and secure storage for physical records.</p>
                  </div>
                  <div className="security-item bg-gray-800/60 border border-red-500/20 p-6 lg:p-8 rounded-xl">
                    <h4 className="text-lg lg:text-xl font-semibold text-red-400 mb-2">Administrative Controls</h4>
                    <p className="text-gray-200 text-sm lg:text-base">Staff receive privacy training and access is limited to authorized personnel only.</p>
                  </div>
                </div>

                <h3 className="text-xl lg:text-2xl font-semibold text-red-400 mt-6 mb-3">Data Retention</h3>
                <p className="text-gray-200 mb-4 text-base lg:text-lg">We retain your information for the following periods:</p>
                <ul className="enhanced-list text-gray-200 text-base lg:text-lg">
                  <li><strong>Active donors:</strong> As long as you remain an active donor</li>
                  <li><strong>Inactive donors:</strong> 10 years after last donation</li>
                  <li><strong>Medical records:</strong> As required by law (typically 10-25 years)</li>
                  <li><strong>Website data:</strong> 2 years or as permitted by law</li>
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div className="glass-card p-6 sm:p-8 lg:p-10 rounded-2xl animate-slide-up bg-gray-900/60 border-red-500/20 backdrop-blur-md">
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 lg:w-8 lg:h-8 text-red-500 mr-3" />
                  <h2 className="text-2xl lg:text-3xl font-bold text-white">How We Use Your Information</h2>
                </div>
                
                <div className="info-box bg-red-500/20 border border-red-500/30 p-6 lg:p-8 rounded-xl mb-6">
                  <h4 className="text-lg lg:text-xl font-semibold text-red-400 mb-2">Primary Purposes</h4>
                  <p className="text-gray-200 text-base lg:text-lg">Your information is primarily used to ensure safe blood donation and transfusion processes.</p>
                </div>

                <h3 className="text-xl lg:text-2xl font-semibold text-red-400 mt-6 mb-3">Donation Services</h3>
                <ul className="enhanced-list text-gray-200 text-base lg:text-lg">
                  <li>Determine donation eligibility and safety</li>
                  <li>Process and track blood donations</li>
                  <li>Maintain accurate donation records</li>
                  <li>Contact you for follow-up if needed</li>
                  <li>Schedule future appointments</li>
                </ul>

                <h3 className="text-xl lg:text-2xl font-semibold text-red-400 mt-6 mb-3">Communication</h3>
                <ul className="enhanced-list text-gray-200 text-base lg:text-lg">
                  <li>Send appointment reminders and confirmations</li>
                  <li>Notify you of blood drives and events</li>
                  <li>Share donation impact stories and updates</li>
                  <li>Provide test results when required</li>
                  <li>Emergency notifications if necessary</li>
                </ul>

                <h3 className="text-xl lg:text-2xl font-semibold text-red-400 mt-6 mb-3">Quality and Safety</h3>
                <ul className="enhanced-list text-gray-200 text-base lg:text-lg">
                  <li>Monitor blood safety and quality standards</li>
                  <li>Conduct research to improve donation processes</li>
                  <li>Comply with regulatory requirements</li>
                  <li>Investigate and prevent fraud</li>
                </ul>
              </div>

              <div className="glass-card p-6 sm:p-8 lg:p-10 rounded-2xl animate-slide-up bg-gray-900/60 border-red-500/20 backdrop-blur-md">
                <div className="flex items-center mb-4">
                  <Mail className="w-6 h-6 lg:w-8 lg:h-8 text-red-500 mr-3" />
                  <h2 className="text-2xl lg:text-3xl font-bold text-white">Contact Us</h2>
                </div>
                <p className="text-gray-200 mb-6 text-base lg:text-lg">If you have questions about this privacy policy or our privacy practices, please contact us:</p>
                
                <div className="grid grid-cols-1 gap-6">
                  <div className="contact-item bg-gray-800/60 border border-red-500/20 p-6 lg:p-8 rounded-xl">
                    <h4 className="text-lg lg:text-xl font-semibold text-red-400 mb-2">Privacy Officer</h4>
                    <p className="text-gray-200 text-sm lg:text-base">Email: privacy@lifelineblood.org</p>
                    <p className="text-gray-200 text-sm lg:text-base">Phone: (555) 123-4567</p>
                  </div>
                  <div className="contact-item bg-gray-800/60 border border-red-500/20 p-6 lg:p-8 rounded-xl">
                    <h4 className="text-lg lg:text-xl font-semibold text-red-400 mb-2">Mailing Address</h4>
                    <p className="text-gray-200 text-sm lg:text-base">Lifeline Blood Services<br/>
                    Attn: Privacy Officer<br/>
                    123 Health Center Drive<br/>
                    Medical City, MC 12345</p>
                  </div>
                </div>

                <div className="final-note bg-red-500/20 border border-red-500/30 p-6 lg:p-8 rounded-xl mt-8 text-center">
                  <h4 className="text-lg lg:text-xl font-semibold text-red-400 mb-2">Your Rights</h4>
                  <p className="text-gray-200 text-base lg:text-lg">You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .privacy-content {
          color: #E5E7EB;
          line-height: 1.7;
        }
        
        .enhanced-list {
          list-style: none;
          padding-left: 0;
          margin: 1rem 0;
        }
        
        .enhanced-list li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.5rem;
        }
        
        .enhanced-list li:before {
          content: "▸";
          position: absolute;
          left: 0;
          color: #EF4444;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicy;
