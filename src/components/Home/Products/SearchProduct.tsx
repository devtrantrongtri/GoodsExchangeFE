import React from 'react'
import { ProductType } from '../../../types/Product/PostProb'
import { getRelativeTime } from '../../Util/getTimeCustom'

function SearchProduct({children}:{children : ProductType}) {
  return (
    <div className='p-3 flex'>
        <img className='rounded-full w-12' src={children.imageUrls[0]} alt="alt" />
        <div>
            <h2>{children.title}</h2>
            <p>{children.price}<span>Posted : {getRelativeTime(children.create_at)}</span> </p>
        </div>
    </div>
  )
}

export default SearchProduct