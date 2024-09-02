import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Import CSS for Tippy.js

function DropdownMenu() {
  return (
    <div className="relative">
      <Tippy
        content={
          <div className="bg-white border rounded-lg p-4 shadow-lg">
            <ul>
              <li>
                <a href="#">Option 1</a>
              </li>
              <li>
                <a href="#">Option 2</a>
                <Tippy
                  content={
                    <div className="bg-white border rounded-lg p-4 shadow-lg">
                      <ul>
                        <li><a href="#">Sub-option 1</a></li>
                        <li><a href="#">Sub-option 2</a></li>
                      </ul>
                    </div>
                  }
                  interactive
                >
                  <a href="#">Submenu</a>
                </Tippy>
              </li>
              <li>
                <a href="#">Option 3</a>
              </li>
            </ul>
          </div>
        }
        interactive
        placement="bottom-start"
        trigger="click"
      >
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Open Menu
        </button>
      </Tippy>
    </div>
  );
}

export default DropdownMenu;
