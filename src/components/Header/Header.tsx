import React, { useState } from "react";
import Logo from "./Logo";
import SeachBar from "./SeachBar";
import HChat from "./HChat";
import Notification from "./Notification";
import HProfile from "./HProfile";
import HWishList from "./HWishList";
import { Tooltip } from "react-tooltip";
// import { tippy } from "@tippyjs/react";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import {  Button, Dropdown, Menu, MenuProps } from "antd";
import {  MoreOutlined,  } from "@ant-design/icons";
import { Link } from "react-router-dom";

function Header() {
  const scrollPosition = useScrollPosition();
  const [isAuthen, setIsOverlayActive] = useState(true);
  const isScrolled = scrollPosition > 200;

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

          { isAuthen ? (<>
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
            <HProfile />
          </div>
          </>) : (<>
              <Button className=" overflow-hidden px-10 py-5 font-bold" type="primary" danger>
              {/* <span><Avatar className="" shape="square" size={64} icon={<UserOutlined />} /></span> */}
                Login
              </Button>
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


// Define menu items for dropdown
const dropdownMenu: MenuProps = {
  items: [
    {
      key: '1',
      label: <Link className="block px-4 py-2 text-gray-700 hover:bg-gray-100" to="/about">About</Link>,
    },
    {
      key: '2',
      label: <Link className="block px-4 py-2 text-gray-700 hover:bg-gray-100" to="/contact">Contact</Link>,
    },
    {
      key: '3',
      label: <Link className="block px-4 py-2 text-gray-700 hover:bg-gray-100" to="/support">Support</Link>,
    },
  ],

};