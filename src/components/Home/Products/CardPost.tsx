import React, { useState } from 'react';
import { Card, Button, } from 'antd';
import { getRelativeTime } from '../../Util/getTimeCustom';
import { ProductType } from '../../../types/Product/PostProb';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

const { Meta } = Card;

function CardPost({ product }: { product: ProductType }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : product.imageUrls.length - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex < product.imageUrls.length - 1 ? prevIndex + 1 : 0
    );
  };
  const showNavigationButtons = product.imageUrls.length > 1;

  return (
    <div className='my-3'>
        
      
        <Card
          hoverable
          className="h-full flex flex-col"
          cover={
            <div className="relative group">
          <img
              alt={product.title}
              src={product.imageUrls[currentImageIndex]}
              className="w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 object-contain"
            />
            {showNavigationButtons && (
              <div className="absolute  inset-0 flex justify-between items-center p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  type="default"
                  onClick={handlePrevious}
                  className="bg-black bg-opacity-50 text-white"
                >
                  Previous
                </Button>
                <Button
                  type="default"
                  onClick={handleNext}
                  className="bg-black bg-opacity-50 text-white"
                >
                  Next
                </Button>
              </div>
            )}
          </div>

          }
        >
      <Link to={`/product/productDetail/${product.productId}`}>
      <Meta
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Click to see more"
        className="font-semibold text-lg hover:shadow-md rounded-3xl p-2"
        title={<div className="text-center text-base sm:text-lg md:text-xl lg:text-2xl">
          {product.title}
        </div>}
        description={
          <div className="flex justify-between items-center">
            <span className="text-red-500 font-bold">
              {product.price} VND
            </span>
            <span className="text-gray-500 text-sm">
              Date: {getRelativeTime(product.create_at)}
            </span>
          </div>
        }
      />
    </Link>
    <Tooltip id="my-tooltip" place="bottom" />
  </Card>
</div>
  );
}

export default CardPost;
