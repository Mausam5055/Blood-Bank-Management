import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Scale, AlertTriangle, CheckCircle, XCircle, Shield, Users } from 'lucide-react';
import Navbar from '../components/Navbar';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-black relative">
      {/* Full-screen background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Terms background"
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
              <Button variant="outline" className="border-red-500/20 text-red-500 hover:border-red-500/20 hover:text-red-500 hover:bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Header - Full Width */}
          <div className="glass-card p-6 sm:p-8 lg:p-12 rounded-2xl mb-8 animate-slide-up bg-gray-900/60 border-red-500/20 backdrop-blur-md">
            <div className="flex items-center mb-6">
              <FileText className="w-10 h-10 lg:w-12 lg:h-12 text-red-500 mr-4" />
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white">
                Terms of Service
              </h1>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 leading-relaxed">
              These terms govern your use of our blood donation services. By using our services, you agree to these terms and conditions.
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
                  <Scale className="w-6 h-6 lg:w-8 lg:h-8 text-red-500 mr-3" />
                  <h2 className="text-2xl lg:text-3xl font-bold text-white">Acceptance of Terms</h2>
                </div>
                <p className="text-gray-200 mb-6 text-base lg:text-lg">By accessing or using Lifeline Blood Services ("we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
                
                <div className="important-box bg-red-500/20 border border-red-500/30 p-6 lg:p-8 rounded-xl">
                  <h4 className="text-lg lg:text-xl font-semibold text-red-400 mb-2">Legal Agreement</h4>
                  <p className="text-gray-200 text-base lg:text-lg">These terms constitute a legally binding agreement between you and Lifeline Blood Services.</p>
                </div>
              </div>

              <div className="glass-card p-6 sm:p-8 lg:p-10 rounded-2xl animate-slide-up bg-gray-900/60 border-red-500/20 backdrop-blur-md">
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 border-b border-red-500/20 pb-2">Eligibility Requirements</h2>
                
                <p className="text-gray-200 mb-4 text-base lg:text-lg">To donate blood through our services, you must:</p>
                <ul className="enhanced-list text-gray-200 text-base lg:text-lg">
                  <li>Be at least 16 years old (17 in some states)</li>
                  <li>Weigh at least 110 pounds</li>
                  <li>Be in generally good health</li>
                  <li>Meet all FDA and local health authority requirements</li>
                  <li>Provide valid identification</li>
                  <li>Complete our health screening questionnaire truthfully</li>
                </ul>

                <div className="important-box bg-blue-500/20 border border-blue-500/30 p-6 lg:p-8 rounded-xl mt-6">
                  <h4 className="text-lg lg:text-xl font-semibold text-blue-400 mb-2">Age Requirements</h4>
                  <p className="text-gray-200 text-base lg:text-lg">Minors must have parental consent and meet additional requirements as specified by state law.</p>
                </div>
              </div>

              <div className="glass-card p-6 sm:p-8 lg:p-10 rounded-2xl animate-slide-up bg-gray-900/60 border-red-500/20 backdrop-blur-md">
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 border-b border-red-500/20 pb-2">User Responsibilities</h2>
                
                <h3 className="text-xl lg:text-2xl font-semibold text-red-400 mt-6 mb-3">Truthful Information</h3>
                <ul className="enhanced-list text-gray-200 text-base lg:text-lg">
                  <li>Provide accurate personal and medical information</li>
                  <li>Update information when circumstances change</li>
                  <li>Report any adverse reactions promptly</li>
                  <li>Follow all pre and post-donation instructions</li>
                </ul>

                <h3 className="text-xl lg:text-2xl font-semibold text-red-400 mt-6 mb-3">Compliance</h3>
                <ul className="enhanced-list text-gray-200 text-base lg:text-lg">
                  <li>Follow all facility rules and regulations</li>
                  <li>Respect staff and other donors</li>
                  <li>Maintain appropriate behavior at all times</li>
                  <li>Report any concerns or incidents immediately</li>
                </ul>
              </div>

              {/* New Section with Image */}
              <div className="glass-card p-6 sm:p-8 lg:p-10 rounded-2xl animate-slide-up bg-gray-900/60 border-red-500/20 backdrop-blur-md">
                <div className="flex items-center mb-4">
                  <Shield className="w-6 h-6 lg:w-8 lg:h-8 text-red-500 mr-3" />
                  <h2 className="text-2xl lg:text-3xl font-bold text-white">Donor Safety and Protection</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                      alt="Medical safety equipment"
                      className="w-full h-64 object-cover rounded-xl"
                    />
                  </div>
                  <div>
                    <p className="text-gray-200 mb-4 text-base lg:text-lg">
                      Your safety is our top priority. We maintain the highest standards of medical care and follow strict protocols to ensure every donation is safe and comfortable.
                    </p>
                    <ul className="enhanced-list text-gray-200 text-base lg:text-lg">
                      <li>Sterile, single-use equipment for every donation</li>
                      <li>Trained medical professionals oversee all procedures</li>
                      <li>Comprehensive pre-donation health screening</li>
                      <li>Post-donation monitoring and care</li>
                      <li>Emergency medical support available on-site</li>
                    </ul>
                  </div>
                </div>

                <div className="important-box bg-green-500/20 border border-green-500/30 p-6 lg:p-8 rounded-xl mt-6">
                  <div className="flex items-center mb-2">
                    <Users className="w-5 h-5 text-green-400 mr-2" />
                    <h4 className="text-lg lg:text-xl font-semibold text-green-400">Community Impact</h4>
                  </div>
                  <p className="text-gray-200 text-base lg:text-lg">Every donation can save up to 3 lives. By donating blood, you become part of a life-saving community that helps ensure adequate blood supply for emergencies, surgeries, and chronic conditions.</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div className="glass-card p-6 sm:p-8 lg:p-10 rounded-2xl animate-slide-up bg-gray-900/60 border-red-500/20 backdrop-blur-md">
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 border-b border-red-500/20 pb-2">Health and Safety Requirements</h2>
                
                <div className="grid grid-cols-1 gap-6 mt-6">
                  <div className="safety-item bg-green-500/20 border border-green-500/30 p-6 lg:p-8 rounded-xl">
                    <CheckCircle className="w-6 h-6 lg:w-7 lg:h-7 text-green-400 mb-2" />
                    <h4 className="text-lg lg:text-xl font-semibold text-green-400 mb-3">You May Donate If:</h4>
                    <ul className="text-gray-200 text-sm lg:text-base space-y-1">
                      <li>• You feel well and healthy</li>
                      <li>• Your last donation was over 56 days ago</li>
                      <li>• You meet weight and age requirements</li>
                      <li>• Your iron levels are adequate</li>
                      <li>• You have no recent illness or fever</li>
                    </ul>
                  </div>
                  <div className="safety-item bg-red-500/20 border border-red-500/30 p-6 lg:p-8 rounded-xl">
                    <XCircle className="w-6 h-6 lg:w-7 lg:h-7 text-red-400 mb-2" />
                    <h4 className="text-lg lg:text-xl font-semibold text-red-400 mb-3">You Cannot Donate If:</h4>
                    <ul className="text-gray-200 text-sm lg:text-base space-y-1">
                      <li>• You have cold or flu symptoms</li>
                      <li>• You've taken antibiotics in the last 24 hours</li>
                      <li>• You've had recent tattoos or piercings</li>
                      <li>• You have certain medical conditions</li>
                      <li>• You've traveled to certain countries recently</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 sm:p-8 lg:p-10 rounded-2xl animate-slide-up bg-gray-900/60 border-red-500/20 backdrop-blur-md">
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 border-b border-red-500/20 pb-2">Privacy and Data</h2>
                
                <p className="text-gray-200 mb-4 text-base lg:text-lg">We are committed to protecting your privacy and personal information:</p>
                
                <ul className="enhanced-list text-gray-200 text-base lg:text-lg">
                  <li>Your personal information is kept confidential</li>
                  <li>Medical records are stored securely</li>
                  <li>Information is shared only as required by law</li>
                  <li>You have rights regarding your personal data</li>
                  <li>We comply with all applicable privacy regulations</li>
                </ul>

                <div className="important-box bg-purple-500/20 border border-purple-500/30 p-6 lg:p-8 rounded-xl mt-6">
                  <h4 className="text-lg lg:text-xl font-semibold text-purple-400 mb-2">HIPAA Compliance</h4>
                  <p className="text-gray-200 text-base lg:text-lg">We are fully compliant with HIPAA regulations and protect your health information accordingly.</p>
                </div>
              </div>

              <div className="glass-card p-6 sm:p-8 lg:p-10 rounded-2xl animate-slide-up bg-gray-900/60 border-red-500/20 backdrop-blur-md">
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 border-b border-red-500/20 pb-2">Contact Information</h2>
                
                <p className="text-gray-200 mb-6 text-base lg:text-lg">For questions about these terms or our services, please contact us:</p>
                
                <div className="grid grid-cols-1 gap-6">
                  <div className="contact-item bg-gray-800/60 border border-red-500/20 p-6 lg:p-8 rounded-xl">
                    <h4 className="text-lg lg:text-xl font-semibold text-red-400 mb-2">General Information</h4>
                    <p className="text-gray-200 text-sm lg:text-base">Email: info@lifelineblood.org</p>
                    <p className="text-gray-200 text-sm lg:text-base">Phone: (555) 123-4567</p>
                    <p className="text-gray-200 text-sm lg:text-base">Hours: Monday-Friday, 8AM-6PM</p>
                  </div>
                  <div className="contact-item bg-gray-800/60 border border-red-500/20 p-6 lg:p-8 rounded-xl">
                    <h4 className="text-lg lg:text-xl font-semibold text-red-400 mb-2">Legal Department</h4>
                    <p className="text-gray-200 text-sm lg:text-base">Email: legal@lifelineblood.org</p>
                    <p className="text-gray-200 text-sm lg:text-base">Phone: (555) 123-4570</p>
                    <p className="text-gray-200 text-sm lg:text-base">Hours: Monday-Friday, 9AM-5PM</p>
                  </div>
                  <div className="contact-item bg-gray-800/60 border border-red-500/20 p-6 lg:p-8 rounded-xl">
                    <h4 className="text-lg lg:text-xl font-semibold text-red-400 mb-2">Mailing Address</h4>
                    <p className="text-gray-200 text-sm lg:text-base">Lifeline Blood Services<br/>
                    123 Health Center Drive<br/>
                    Medical City, MC 12345</p>
                  </div>
                </div>

                <div className="final-note bg-red-500/20 border border-red-500/30 p-6 lg:p-8 rounded-xl mt-8 text-center">
                  <h4 className="text-lg lg:text-xl font-semibold text-red-400 mb-2">Thank You</h4>
                  <p className="text-gray-200 text-base lg:text-lg">Thank you for choosing Lifeline Blood Services. Your commitment to blood donation helps save lives in our community every day.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .terms-content {
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

export default TermsOfService;
