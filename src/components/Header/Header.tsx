import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import SeachBar from "./SeachBar";
import HChat from "./HChat";
import Notification from "./Notification";
import HProfile from "./HProfile";
import HWishList from "./HWishList";
import { Tooltip } from "react-tooltip";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { Button, Spin } from "antd";
import { Link } from "react-router-dom";
import { useGetProfileQuery } from "../../services/user/user.service";
import { MenuOutlined } from "@ant-design/icons";

function Header() {
  const scrollPosition = useScrollPosition();
  const [isAuthen, setIsAuthen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = scrollPosition > 50;
  const token = localStorage.getItem('token');
  const { data: profileData, isLoading, isError } = useGetProfileQuery(undefined, { skip: !token });

  useEffect(() => {
    if (token) {
      setIsAuthen(true);
    } else {
      setIsAuthen(false);
    }
  }, [token]);

  if (isLoading) return <Spin tip="Loading..." className="flex justify-center items-center h-screen" />;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? 'text-[#0ea5e9] text-lg font-bold'
      : 'text-black hover:text-[#0ea5e9]';
  };

  return (
    <div className="relative">
      <header
        className={`flex items-center justify-between px-4 md:px-12 bg-cyan-50 transition-all duration-100 ${
          isScrolled ? "py-5 bg-cyan-100 shadow-2xl rounded-3xl fixed top-0 left-0 right-0 z-50" : "py-3 bg-opacity-100"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center basis-1/6">
          <Logo />
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex basis-1/6 items-center justify-center font-semibold space-x-5">
          <Link to="/" className={getLinkClass('/')}>Home</Link>
          <Link to="/product/" className={getLinkClass('/product/')}>Explore</Link>
          <Link to="/contact/" className={getLinkClass('/contact/')}>Contact</Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:block basis-2/6">
          <SeachBar />
        </div>

        {/* Authentication Buttons and Menu */}
        <div className="flex items-center justify-end space-x-4 md:basis-2/6">
          {isAuthen && !isError ? (
            <>
              <HChat />
              <HWishList />
              <Notification />
              <HProfile
                avatar={
                  profileData
                    ? { 
                        avartar: profileData.data.profileImageUrl || 'https://secure.gravatar.com/avatar/f53779b5676d15e4a7aeeef9c81fa564?s=70&d=wavatar&r=g',
                        name: profileData.data.firstName || profileData.data.user.username
                      }
                    : null
                }
              />
            </>
          ) : (
            <Link to="/auth/login">
              <Button className="px-6 py-3 font-bold" type="primary" danger>Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="flex md:hidden items-center justify-end">
          <button onClick={toggleMenu}>
            <MenuOutlined className="text-2xl" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg p-4 z-50 md:hidden">
          <Link to="/" className={getLinkClass('/')} onClick={toggleMenu}>Home</Link>
          <Link to="/product/" className={getLinkClass('/product/')} onClick={toggleMenu}>Explore</Link>
          <Link to="/contact/" className={getLinkClass('/contact/')} onClick={toggleMenu}>Contact</Link>
          <SeachBar />
        </div>
      )}

      {/* Tooltip */}
      <Tooltip id="my-tooltip" place="bottom" />
    </div>
  );
}

export default Header;
