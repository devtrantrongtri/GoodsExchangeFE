import { Dropdown, MenuProps } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface AvatarProps {
  avartar: string; // Changed to non-nullable string
  name: string;    // Changed to non-nullable string
}

const HProfile = ({ avatar }: { avatar: AvatarProps | null }) => {
  const defaultAvatar = 'https://via.placeholder.com/150';
  const avatarSrc = avatar ? avatar.avartar : defaultAvatar;
  const userName = avatar ? avatar.name : 'User Name';
  const navigate = useNavigate();




  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
  
    // Navigate to the login page
    navigate('/auth/login');
  };
  const dropdownMenu: MenuProps = {
    items: [
      {
        key: '1',
        label: <Link className="block px-4 py-2 text-gray-700 hover:bg-gray-100" to="/profile">Yout profile</Link>,
      },
      {
        key: '2',
        label: <Link className="block px-4 py-2 text-gray-700 hover:bg-gray-100" to="/contact">Contact</Link>,
      },
      {
        key: '3',
        label: <Link className="block px-4 py-2 text-gray-700 hover:bg-gray-100" to="/support">Support</Link>,
      },
      {
        key: '4',
        label: <button
          onClick={handleLogout}
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
        >
          Logout
        </button>,
      },
    ],
  
  };



  
  return (
    <Dropdown menu={dropdownMenu} placement="bottom"  trigger={['hover']}>
          
    <Link to='/profile' className='flex items-center space-x-2 cursor-pointer my-auto'>
      <img
        className='w-12 h-12 rounded-full border-2 border-gray-300'
        src={avatarSrc}
        alt='Profile'
      />
      <span className='text-gray-700 font-medium'>{userName}</span>
    </Link>
    {/* <MoreOutlined  className="overflow-hidden text-3xl   font-bold" type="default"/> */}
        </Dropdown>
  );
};

export default HProfile;
