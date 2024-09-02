import React from 'react'
import CarouselCustoms from '../../components/Home/Carousel'

function HomePage() {
  return (
    <div>
      {/* 
        carousel 
        category
        product

      
      */}

        <div className='mx-96  ' >
        <CarouselCustoms/>
        </div>
        <div className='mx-96  ' >
        <CarouselCustoms/>
        </div>
        <div className='mx-96  ' >
        <CarouselCustoms/>
        </div>
        <div className='mx-96  ' >
        <CarouselCustoms/>
        </div>
      
    </div>
  )
}

export default HomePage