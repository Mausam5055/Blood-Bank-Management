
import React, { useState } from 'react';
import { Loader } from 'lucide-react';

interface ImageLoaderProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageLoader = ({ src, alt, className = "" }: ImageLoaderProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-space-navy/50 rounded-lg">
          <Loader className="w-8 h-8 text-electric-cyan animate-spin" />
        </div>
      )}
      {error ? (
        <div className="w-full h-full bg-space-navy/50 rounded-lg flex items-center justify-center">
          <span className="text-dark-text/60">Failed to load image</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`${className} ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default ImageLoader;
