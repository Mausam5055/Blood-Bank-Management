
import React from 'react';
import { usePageTransition } from '../hooks/usePageTransition';
import PageLoader from './PageLoader';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const { isLoading } = usePageTransition();

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="animate-fade-in">
      {children}
    </div>
  );
};

export default PageTransition;
