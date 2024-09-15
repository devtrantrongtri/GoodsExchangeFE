import React from "react";
import { Link } from "react-router-dom";

const HPost = () => {
  return (
    <div className="relative p-2 cursor-pointer flex items-center">
      <Link to="/post" className="relative p-2 cursor-pointer">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-gray-600"
        >
          <path
            d="M14.69 2.29c.39-.39 1.02-.39 1.41 0l2.5 2.5c.39.39.39 1.02 0 1.41l-2 2-3.91-3.91 2-2Zm-3.26 3.26 3.91 3.91L5 19h-4v-4l9.43-9.43ZM21 19v2H5v-2h16Z"
            fill="currentColor"
          />
        </svg>
      </Link>
    </div>
  );
};

export default HPost;
