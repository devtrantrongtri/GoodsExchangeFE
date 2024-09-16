import React from 'react';
// import { useGetWishListQuery } from '../path/to/api/wishListApi'; // Cập nhật đường dẫn chính xác
import { Badge, Dropdown, List, Spin, Typography } from 'antd'; // Import Ant Design components
import { useNavigate } from 'react-router-dom'; // Import useNavigate từ React Router
import { useGetWishListQuery } from '../../services/WishList/wishList.service';

const { Text } = Typography;

const HWishList = () => {
  const navigate = useNavigate(); // Hook điều hướng

  // Gọi API để lấy danh sách wishList từ RTK Query
  const { data: wishList, error, isLoading } = useGetWishListQuery();

  // Tính tổng số sản phẩm trong wishList
  const wishListCount = wishList ? wishList.length : 0;

  // Nội dung của danh sách sản phẩm khi hover
  const wishlistContent = (
    <div className="wishlist-content p-2 border border-cyan-500 border-spacing-1 rounded opacity-80 bg-slate-50 h-96 overflow-auto" style={{ width: '300px' }}>
      {isLoading ? (
        <Spin /> // Hiển thị loading nếu API đang tải
      ) : error ? (
        <p>Error loading wishlist!</p> // Hiển thị lỗi nếu có
      ) : wishList && wishList.length > 0 ? (
        <List
          dataSource={wishList} // Dữ liệu từ API
          renderItem={item => (
            <List.Item
            key={item.id}
            onClick={() => navigate(`/product/productDetail/${item.product.product_id}`)} // Điều hướng đến trang chi tiết sản phẩm
            style={{ cursor: 'pointer', transition: 'background-color 0.3s ease' }} // Thêm transition để mượt mà
            className="hover:bg-cyan-100 hover:font-bold hover:text-lg" // Thêm hiệu ứng hover
          >
              <List.Item.Meta
              className='p-3'
                title={item.product.title} // Tiêu đề sản phẩm
                description={
                  <>
                    <Text>Giá: {item.product.price.toLocaleString()} VND</Text>
                    <br />
                    <Text>Người bán: {item.product.seller.username}</Text>
                  </>
                }
              />
            </List.Item>
          )}
        />
      ) : (
        <p>Chưa có sản phẩm trong danh sách yêu thích.</p> // Hiển thị nếu không có sản phẩm
      )}
    </div>
  );

  return (
    <Dropdown overlay={wishlistContent} trigger={['hover']}>
      <div className="relative p-2 cursor-pointer flex items-center">
        {/* SVG Icon */}
        <Badge count={wishListCount} showZero offset={[10, 0]}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-gray-600 hover:text-cyan-700"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="currentColor"
            />
          </svg>
        </Badge>
      </div>
    </Dropdown>
  );
};

export default HWishList;
