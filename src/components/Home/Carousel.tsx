import React from 'react'
import { Carousel } from 'antd';





function CarouselCustoms() {
    const imageUrl1 = '../../../assets/test.jpg';
    const imageUrl2 = '../../../assets/2.jpg';
    const imageUrl3 = '../../../assets/image.png';
  return (
    <div className='pt-10'>
<Carousel 
  arrows={true}
  autoplay={true}
  autoplaySpeed={3000} // Thay đổi tốc độ tùy ý
  infinite={true} 
  className='flex justify-center overflow-hidden rounded-3xl'>
  <div className='flex justify-center items-center'>
    <img src={imageUrl1} alt="image1" className='w-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105' />
  </div>
  <div className='flex justify-center items-center'>
    <img src={imageUrl2} alt="image2" className='w-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105' />
  </div>
  <div className='flex justify-center items-center'>
    <img src={imageUrl1} alt="image3" className='w-full object-fill transition-transform duration-500 ease-in-out transform hover:scale-105' />
  </div>
  {/* <div className='flex justify-center items-center'>
    <img src={imageUrl} alt="image4" className='w-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105' />
  </div> */}
</Carousel>
  </div>

  )
}

export default CarouselCustoms
