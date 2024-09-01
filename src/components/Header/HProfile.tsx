// src/components/Profile.js
import React from 'react';

const HProfile = () => {
  return (
    <div className='flex items-center space-x-2 cursor-pointer my-auto'>
      <img
        className='w-12 h-12 rounded-full border-2 border-gray-300'
        src='https://via.placeholder.com/150'
        alt='Profile'
      />
      <span className='text-gray-700 font-medium'>User Name</span>
    </div>
  );
};

export default HProfile;
