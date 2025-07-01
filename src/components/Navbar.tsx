
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X, User, LogIn, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import ProfileAvatar from './ProfileAvatar';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Donors', href: '/donors' },
    { name: 'Events', href: '/events' },
    { name: 'Blog', href: '/blog' },
    { name: 'Hospitals', href: '/hospitals' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'glass border-b border-neon-pink/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <Heart className="w-8 h-8 text-neon-pink animate-heartbeat" fill="currentColor" />
            <span className="text-xl font-bold text-soft-white">LifeGiver</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.href)}
                className="text-dark-text/70 hover:text-neon-pink transition-colors duration-200 font-medium"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Desktop Auth Buttons or Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  onClick={handleSignOut}
                  className="text-dark-text/70 hover:text-neon-pink hover:bg-transparent"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
                <ProfileAvatar />
              </div>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/auth?mode=login')}
                  className="text-dark-text/70 hover:text-neon-pink hover:bg-transparent"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button 
                  onClick={() => navigate('/auth?mode=signup')}
                  className="bg-gradient-to-r from-neon-pink to-neon-pink/80 hover:from-neon-pink/90 hover:to-neon-pink text-white"
                >
                  <User className="w-4 h-4 mr-2" />
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-soft-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 glass-card border-t border-neon-pink/20">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-dark-text/70 hover:text-neon-pink transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
              <div className="flex flex-col space-y-2 px-3 pt-4">
                {user ? (
                  <>
                    <div className="flex items-center space-x-3 py-2">
                      <ProfileAvatar />
                      <span className="text-soft-white text-sm">
                        {user.user_metadata?.full_name || user.email}
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      onClick={handleSignOut}
                      className="text-dark-text/70 hover:text-neon-pink hover:bg-transparent justify-start"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="ghost" 
                      onClick={() => {
                        navigate('/auth?mode=login');
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-dark-text/70 hover:text-neon-pink hover:bg-transparent justify-start"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                    <Button 
                      onClick={() => {
                        navigate('/auth?mode=signup');
                        setIsMobileMenuOpen(false);
                      }}
                      className="bg-gradient-to-r from-neon-pink to-neon-pink/80 text-white justify-start"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Register
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
