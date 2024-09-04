import React from 'react'
import { ProductType } from '../../../types/Product/PostProb'
import { getRelativeTime } from '../../Util/getTimeCustom'
import { Link } from 'react-router-dom'
import Tippy from '@tippyjs/react'

function SearchProduct({children}:{children : ProductType}) {
  return (
    <Link to={'/product/' + children.productId}>
        <Tippy
            content='s'
        >
            <div className='p-3 w-full flex hover:bg-slate-300'>
                <img className='rounded-full w-14 h-14 bg-slate-50' src={children.imageUrls[0]} alt="alt" />
                <div className='ml-4'>
                    <h2 className='font-bold'>{children.title}</h2>
                    <p>Price : <span className='text-red-600 font-bold m-3'>{children.price}</span>Posted :<span className='text-slate-600'>{getRelativeTime(children.create_at)}</span> </p>
                </div>
            </div>
        </Tippy>
    </Link>
  )
}

export default SearchProduct