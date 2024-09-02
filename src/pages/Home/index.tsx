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
        <div className='mx-96 my-20 bg-slate-50 h-40 rounded-2xl '>
        <Narbar/>

        </div>

        <div className='mx-80   my-40 ' >
        <Products/>
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