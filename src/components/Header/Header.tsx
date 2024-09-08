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

function Header() {
  const scrollPosition = useScrollPosition();
  const [isAuthen, setIsAuthen] = useState(false);
  const isScrolled = scrollPosition > 200;
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
  // if (isError) return <Alert message="Something went wrong." type="error" showIcon className="my-4" />;
  // Define menu items for dropdown

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
        <div className="basis-1/6 flex items-center justify-center font-bold space-x-5">
        <Link to='/'>Home</Link>
        <Link to='product/'>Explore</Link>
        <Link to='https://github.com/devtrantrongtri'>Contact</Link>
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
            // data-tooltip-id="my-tooltip"
            // data-tooltip-content="Your profile "
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
        </div>
        {/* xuw lys tool tip cho elements */}
        <Tooltip id="my-tooltip" place="bottom" />
      </header>
    </div>
  );
}

export default Header;


