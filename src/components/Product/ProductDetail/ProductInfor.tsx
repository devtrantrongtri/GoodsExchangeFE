import { HeartOutlined, WechatOutlined, FacebookOutlined, MessageOutlined } from '@ant-design/icons';
import { Badge, Rate } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductDetailResponse, ProductType } from '../../../types/Product/PostProb';
 // Import kiểu ProductDetailResponse

// Giả sử prop `productDetail` sẽ được truyền vào component này
const ProductInfor: React.FC<{ productDetail: ProductType }> = ({ productDetail }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = (platform: string) => {
    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank');
    } else if (platform === 'message') {
      alert('Chia sẻ qua message chưa được tích hợp.');
    }
  };

  const { title, description, price, status, create_at, category } = productDetail;

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); // Chuyển đổi timestamp sang định dạng ngày
  };

  return (
      <Badge.Ribbon text={status} color="green">
    <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      {/* Product Name */}
      
   
      <h1 className="text-xl font-bold text-gray-800">{title}</h1>

      {/* Category */}
      <p className="text-sm text-gray-600">Loại: {category.name}</p>

      {/* Rating */}
      <div className="flex items-center mt-2">
        <Rate className="text-cyan-800" disabled allowHalf defaultValue={2.5} />
        <span className="ml-2 text-sm text-gray-600">2.5 / 5</span>
      </div>

      {/* Price */}
      <h2 className="mt-4 text-lg text-red-500 font-semibold">Giá: {price.toLocaleString()} VND</h2>

      {/* Product Status */}
      <p className="text-sm text-gray-600">Trạng thái: <Badge count={status} showZero color="green" /></p>
      
      {/* Created At */}
      <p className="text-sm text-gray-600">Ngày đăng: {formatDate(create_at)}</p>

    

      {/* Wishlist Button */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handleAddToWishlist}
          className={`flex items-center gap-2 py-2 px-4 rounded-md text-white ${isWishlisted ? 'bg-red-500' : 'bg-gray-500'} hover:bg-red-600`}
        >
          <HeartOutlined />
          {isWishlisted ? 'Đã thêm vào danh sách yêu thích' : 'Thêm vào danh sách yêu thích'}
        </button>

        {/* Contact Button */}
        <Link to="/chat/user/">
          <button className="flex items-center gap-2 py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600">
            <MessageOutlined /> 
            Chat với người bán
          </button>
        </Link>
      </div>

      {/* Share Section */}
      <div className="flex items-center justify-between mt-4">
        <h3 className="text-sm text-gray-600">Chia sẻ sản phẩm:</h3>
        <div className="flex space-x-4">
          <button onClick={() => handleShare('facebook')} className="text-blue-600">
            <FacebookOutlined style={{ fontSize: '24px' }} />
          </button>
          <button onClick={() => handleShare('message')} className="text-green-600">
            <MessageOutlined style={{ fontSize: '24px' }} />
          </button>
        </div>
      </div>

            {/* Product Description */}
            <h1 className='font-bold text-black'>
              Description :
            </h1>
            <p className="mt-2 text-gray-600 h-40 overflow-auto">Giải thích:
Fake Data: Dữ liệu sản phẩm sản phẩm có được thêm sản p.</p>
    </div>
</Badge.Ribbon>
  );
};

export default ProductInfor;
