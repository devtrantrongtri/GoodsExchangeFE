import React from 'react'
import CarouselCustoms from '../../components/Home/Carousel'
import Narbar from '../../components/Narbar/Narbar'
import Products from '../../components/Home/Products/Products'

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
        <div className='mx-2 my-2 sm:mx-4 sm:my-4 md:mx-8 md:my-8 lg:mx-16 lg:my-16 xl:mx-32 xl:my-32'>
        <Narbar/>

        </div>

        <div className='mx-2 my-2 sm:mx-4 sm:my-4 md:mx-8 md:my-8 lg:mx-16 lg:my-16 xl:mx-32 xl:my-32'>
          <Products/>
        </div>

        {/* <div className='mx-96  ' >
        <CarouselCustoms/>
        </div>
        <div className='mx-96  ' >
        <CarouselCustoms/>
        </div> */}
      
    </div>
  )
}

export default HomePage