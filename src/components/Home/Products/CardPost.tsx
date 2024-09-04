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

  return (
    <div>
        
      
        <Card
          hoverable
          style={{ width: 300, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
          cover={
            <div className="relative flex items-center justify-center overflow-hidden" style={{ height: 200 }}>
              <img
                alt={product.title}
                src={product.imageUrls[currentImageIndex]}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
              <div className="absolute inset-0 flex justify-between items-center p-2 opacity-0 hover:opacity-100">
                <Button
                  type="default"
                  onClick={handlePrevious}
                  style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', zIndex: 10 }}
                >
                  Previous
                </Button>
                <Button
                  type="default"
                  onClick={handleNext}
                  style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', zIndex: 10 }}
                >
                  Next
                </Button>
              </div>
            </div>
          }
        >
          <Link to={'/product/' + product.productId}>
          <Meta
          data-tooltip-id="my-tooltip"
            data-tooltip-content="click to see more"
            className="font-semibold text-lg hover:shadow-md rounded-3xl p-2"
            title={<div className="text-center">{product.title}</div>}
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
        </Card>
        <Tooltip id="my-tooltip" place="bottom" /> 
    </div>
  );
}

export default CardPost;
