import React from 'react'
import { Carousel } from 'antd';





function CarouselCustoms() {
    const imageUrl = 'https://scontent-hkg4-2.xx.fbcdn.net/v/t39.30808-6/453190954_793744252938409_5067379551177299228_n.jpg?stp=dst-jpg_s960x960&_nc_cat=111&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=W_dnyHhABNUQ7kNvgGPWsW-&_nc_ht=scontent-hkg4-2.xx&_nc_gid=Ax6CAd_XPtWcB0cb1v4Is10&oh=00_AYDk_EINfG2nzbzzTC4LO--Mnzz9bKuMpmb4WoPRGk2HdA&oe=66DB3074';
  return (
    <div className='pt-10'>
<Carousel 
  arrows={true}
  autoplay={true}
  autoplaySpeed={3000} // Thay đổi tốc độ tùy ý
  infinite={true} 
  className='flex justify-center overflow-hidden rounded-3xl'>
  <div className='flex justify-center items-center'>
    <img src={imageUrl} alt="image1" className='w-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105' />
  </div>
  <div className='flex justify-center items-center'>
    <img src={imageUrl} alt="image2" className='w-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105' />
  </div>
  <div className='flex justify-center items-center'>
    <img src={imageUrl} alt="image3" className='w-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105' />
  </div>
  <div className='flex justify-center items-center'>
    <img src={imageUrl} alt="image4" className='w-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105' />
  </div>
</Carousel>
  </div>

  )
}

export default CarouselCustoms
