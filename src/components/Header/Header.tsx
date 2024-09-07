import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import SeachBar from "./SeachBar";
import HChat from "./HChat";
import Notification from "./Notification";
import HProfile from "./HProfile";
import HWishList from "./HWishList";
import { Tooltip } from "react-tooltip";
// import { tippy } from "@tippyjs/react";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import {  Alert, Button, Dropdown, Menu, MenuProps, Spin } from "antd";
import {  MoreOutlined,  } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "../../services/user/user.service";

function Header() {
  const scrollPosition = useScrollPosition();
  const [isAuthen, setIsAuthen] = useState(false);
  const isScrolled = scrollPosition > 200;
  const { data: profileData, isLoading, isError,refetch } = useGetProfileQuery();
  const token = localStorage.getItem('token')
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');

    // Navigate to the login page
    navigate('/auth/login');
  };
  useEffect(() => {
    if ( token) {
      setIsAuthen(true);
    }else{
      setIsAuthen(false)
    }
  }, [token]);


  if (isLoading) return <Spin tip="Loading..." className="flex justify-center items-center h-screen" />;
  // if (isError) return <Alert message="Something went wrong." type="error" showIcon className="my-4" />;
  // Define menu items for dropdown
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
    <div className="relative">
      <header
        className={`fixed top-0 left-0 right-0 flex flex-row px-12 bg-cyan-50  transition-all duration-100 ${
          isScrolled
            ? " py-5 bg-cyan-100 shadow-2xl rounded-3xl"
            : "py-3 bg-opacity-100"
        } z-50 `}
      >
        <div
          className="basis-1/6 my-auto mx-1"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="UTH pro"
        >
          <Logo />
        </div>

        <div
          className="basis-3/6  w-full my-auto"
          data-tooltip-content="Nhap tu khoa de tim kiem"
        >
          <SeachBar />
        </div>

        <div className="flex justify-end items-center space-x-4 basis-2/6 my-auto">

          { isAuthen &&  !isError ? (<>
            <div
            className=""
            data-tooltip-id="my-tooltip"
            data-tooltip-content="you want to chat ?"
          >
            <HChat />
          </div>
          <div
            className=""
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Wish List "
          >
            <HWishList />
          </div>
          <div
            className=""
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Notification ! "
          >
            <Notification />
          </div>
          <div
            className=""
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Your profile "
          >
         <HProfile
            avatar={
              profileData
                ? { 
                    avartar: profileData.data.profileImageUrl || 'https://via.placeholder.com/150', // Provide default image URL
                    name: profileData.data.firstName || 'NO user name' // Provide default name
                  }
                : null
            }
      />

          </div>
          </>) : (<>
              <Link to='/auth/login'>
                <Button className=" overflow-hidden px-10 py-5 font-bold" type="primary" danger>
                {/* <span><Avatar className="" shape="square" size={64} icon={<UserOutlined />} /></span> */}
                  Login
                </Button>
              </Link>
          </>)}
          <Dropdown menu={dropdownMenu} placement="bottom"  trigger={['hover']}>
          <MoreOutlined  className="overflow-hidden text-3xl   py-5 font-bold" type="default"/>
        </Dropdown>
        </div>
        {/* xuw lys tool tip cho elements */}
        <Tooltip id="my-tooltip" place="bottom" />
      </header>
    </div>
  );
}

export default Header;


