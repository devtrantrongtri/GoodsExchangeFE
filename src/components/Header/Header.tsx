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
// import {  MoreOutlined,  } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "../../services/user/user.service";
import HPost from "./HPost";

function Header() {
  const scrollPosition = useScrollPosition();
  const [isAuthen, setIsAuthen] = useState(false);
  const isScrolled = scrollPosition > 50;
  const token = localStorage.getItem('token')
  const { data: profileData, isLoading, isError,refetch } = useGetProfileQuery(undefined,{skip: !token, });
  // const { isError, isFetching, data,refetch } = useGetProfileQuery(undefined, {
  //    // Skip query if no token
  // });

  
  useEffect(() => {
    if ( token) {
      setIsAuthen(true);
    }else{
      setIsAuthen(false)
    }
  }, [token]);


  if (isLoading) return <Spin tip="Loading..." className="flex justify-center items-center h-screen" />;
  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? 'text-[#0ea5e9] text-lg font-bold'
      : 'text-black hover:text-[#0ea5e9]';
  };
  return (
    <div className="">
      <header
        className={`flex flex-row px-12 bg-cyan-50  transition-all duration-100 ${
          isScrolled
            ? " py-5 bg-cyan-100 shadow-2xl rounded-3xl fixed top-0 left-0 right-0"
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
        <div className="basis-1/6 flex items-center justify-center font-semibold space-x-5">
          <Link to="/" className={getLinkClass('/')}>
            Home
          </Link>
          <Link to="/product/" className={getLinkClass('/product/')}>
            Explore
          </Link>
          <Link to="/contact/" className={getLinkClass('/contact/')}>
            Contact
          </Link>
          {/* <a
            href="https://github.com/devtrantrongtri"
            className={location.pathname === 'https://github.com/devtrantrongtri' ? 'text-[#1e6668] font-semibold' : 'text-gray-600 hover:text-[#1e6668]'}
          >
            Contact
          </a> */}
        </div>
        <div
          className="basis-2/6  w-full my-auto"
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
          data-tooltip-content="Post?">
            <HPost/>
          </div>
          
          <div
            className=""
            // data-tooltip-id="my-tooltip"
            // data-tooltip-content="Your profile "
          >
         <HProfile
            avatar={
              profileData
                ? { 
                    avartar: profileData.data.profileImageUrl || 'https://secure.gravatar.com/avatar/f53779b5676d15e4a7aeeef9c81fa564?s=70&d=wavatar&r=g', // Provide default image URL
                    name: profileData.data.firstName || profileData.data.user.username // Provide default name
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
        </div>
        {/* xuw lys tool tip cho elements */}
        <Tooltip id="my-tooltip" place="bottom" />
      </header>
    </div>
  );
}

export default Header;


