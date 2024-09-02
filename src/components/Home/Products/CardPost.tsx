import React from 'react'
import { Card } from 'antd';
import { getRelativeTime } from '../../Util/getTimeCustom';
import { CardPostProps } from '../../../types/Product/PostProb';
const { Meta } = Card;



function CardPost({ product }: {product : CardPostProps}) {
  return (
    <div>
        <Card
            // className='w-96'
            hoverable
            style={{ width: 300, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
            cover={<img alt={product.name} src={product.img} />}
          >
           <Meta
                className="font-semibold text-lg"
                title={<div className="text-center">{product.name}</div>}
                description={
                  <div className="flex justify-between items-center">
                    <span className="text-red-500 font-bold">
                      {product.price} VND
                    </span>
                    <span className="text-gray-500 text-sm">
                      Date: {getRelativeTime(product.datePost)}
                    </span>
                  </div>
                }
              />
          </Card>
    </div>
  )
}

export default CardPost