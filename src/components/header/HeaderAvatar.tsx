
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/lib/types';

interface HeaderAvatarProps {
  user: User;
}

export const HeaderAvatar: React.FC<HeaderAvatarProps> = ({ user }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="hidden md:block text-right">
        <div className="text-sm font-medium">{user.name}</div>
        <div className="text-xs text-muted-foreground">{user.role}</div>
      </div>
      <Avatar className="h-8 w-8">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
    </div>
  );
};
