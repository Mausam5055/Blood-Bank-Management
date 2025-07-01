
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const ProfileAvatar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const displayName = user.user_metadata?.full_name || user.email || 'User';
  const initials = displayName
    .split(' ')
    .map((name: string) => name[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const handleClick = () => {
    navigate('/dashboard');
  };

  return (
    <Avatar 
      className="w-8 h-8 cursor-pointer hover:ring-2 hover:ring-neon-pink transition-all"
      onClick={handleClick}
    >
      <AvatarImage src={user.user_metadata?.avatar_url} alt={displayName} />
      <AvatarFallback className="bg-gradient-to-r from-neon-pink to-electric-cyan text-white text-sm">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
