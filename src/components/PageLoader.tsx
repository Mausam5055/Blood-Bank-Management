
import React from 'react';
import { Loader } from 'lucide-react';

const PageLoader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-space-navy to-electric-cyan/10 flex items-center justify-center">
      <div className="text-center">
        <Loader className="w-12 h-12 text-electric-cyan animate-spin mx-auto mb-4" />
        <p className="text-soft-white text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;
