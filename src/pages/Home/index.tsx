import React from 'react'
import CarouselCustoms from '../../components/Home/Carousel'
import Narbar from '../../components/Narbar/Narbar'

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
        <div className='mx-96 my-10 bg-slate-50 h-40 rounded-2xl'>
        <Narbar/>

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