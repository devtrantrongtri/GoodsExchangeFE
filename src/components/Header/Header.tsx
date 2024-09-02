import React, { useState } from "react";
import Logo from "./Logo";
import SeachBar from "./SeachBar";
import HChat from "./HChat";
import Notification from "./Notification";
import HProfile from "./HProfile";
import HWishList from "./HWishList";
import { Tooltip } from "react-tooltip";
import { tippy } from "@tippyjs/react";
import { useScrollPosition } from "../../hooks/useScrollPosition";

function Header() {
  const scrollPosition = useScrollPosition();
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  // Adjust these thresholds and styles as needed
  const isScrolled = scrollPosition > 200;

  return (
    <div className="relative">
      {isOverlayActive && (
        <div
          className="fixed inset-0 bg-gray-900 opacity-50 z-40"
          onClick={() => setIsOverlayActive(false)}
          aria-hidden="true"
        />
      )}
      <header
        className={`fixed top-0 left-0 right-0 flex flex-row px-12 bg-white border-b-2  transition-all duration-300 ${
          isScrolled ? " py-3 bg-opacity-90 shadow-2xl" : "py-10 bg-opacity-100"
        } z-50 hover:py-12  hover:bg-opacity-100`}
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
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Nhap tu khoa de tim kiem"
          onFocus={() => setIsOverlayActive(true)}
          onBlur={() => setIsOverlayActive(false)}
          onClick={() => setIsOverlayActive(true)}
        >
          <SeachBar />
        </div>

        <div className="flex justify-end items-center space-x-4 basis-2/6 my-auto">
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
        </div>
        <Tooltip id="my-tooltip" place="bottom" />
      </header>
    </div>
  );
}

export default Header;
