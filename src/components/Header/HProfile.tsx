import React from 'react';
import { Link } from 'react-router-dom';

interface AvatarProps {
  avartar: string; // Changed to non-nullable string
  name: string;    // Changed to non-nullable string
}

const HProfile = ({ avatar }: { avatar: AvatarProps | null }) => {
  const defaultAvatar = 'https://via.placeholder.com/150';
  const avatarSrc = avatar ? avatar.avartar : defaultAvatar;
  const userName = avatar ? avatar.name : 'User Name';

  return (
    <Link to='/profile' className='flex items-center space-x-2 cursor-pointer my-auto'>
      <img
        className='w-12 h-12 rounded-full border-2 border-gray-300'
        src={avatarSrc}
        alt='Profile'
      />
      <span className='text-gray-700 font-medium'>{userName}</span>
    </Link>
  );
};

export default HProfile;
