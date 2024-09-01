import React from 'react'
import Logo from './Logo'
import SeachBar from './SeachBar'
import HChat from './HChat'
import Notification from './Notification'
import HProfile from './HProfile'
import HWishList from './HWishList'
import { Tooltip } from 'react-tooltip';


function Header() {
  return (
   <header className='flex flex-row px-12 py-10 border-b-2 shadow-2xl mb-4 '>


      <div className='basis-1/6 my-auto mx-1'
        data-tooltip-id="my-tooltip"
        data-tooltip-content="UTH pro"
      >
        <Logo/>
      </div>


      <div className='basis-3/6  w-full my-auto'
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Nhap tu khoa de tim kiem"
      >
        <SeachBar/>
      </div>


      <div className='flex justify-end items-center space-x-4 basis-2/6 my-auto'>
      <div className=''
        data-tooltip-id="my-tooltip"
        data-tooltip-content="you want to chat ?"
      >
        <HChat/>
      </div>
      <div className=''
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Wish List "
      >
      <HWishList/>
      </div>
      <div className=''
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Notification ! "
      >
        <Notification/>
      </div>
      <div className=''
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Your profile "
      >
      <HProfile/>
      </div>


      </div>
      <Tooltip id="my-tooltip" place="bottom" />
   </header>
  )
}

export default Header