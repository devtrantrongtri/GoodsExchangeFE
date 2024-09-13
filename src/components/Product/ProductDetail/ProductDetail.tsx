import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetProductDetailQuery } from '../../../services/product/product.service';
import ImageGallery from './ImageGallery';
import SellerInfor from './SellerInfor';
import ProductInfor from './ProductInfor';
import ProductDeletedOrHiddenPage from '../../Util/ProductDeletedOrHiddenPage';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading } = useGetProductDetailQuery(id || '');
  if (error || !data || data.code !== 200) {
    return <ProductDeletedOrHiddenPage />;
  }

  // Dữ liệu sản phẩm
  const productDetail = data.data;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4">
        <Breadcrumb
          items={[
            {
              title: (
                <Link to="/">
                  <HomeOutlined className="mr-1" />
                  Home
                </Link>
              ),
            },
            {
              title: (
                <Link to={`/product?category=${productDetail.category.name}`}>
                  {productDetail.category.name}
                </Link>
              ),
            },
            {
              title: productDetail.title,
            },
          ]}
          separator=">"
          className="text-gray-600"
        />
      </div>

      {/* Responsive layout: 1 column on small screens, 2 columns on medium and larger */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white w-full">
          <ImageGallery imgs={productDetail && productDetail.imageUrls} />
        </div>

        <div className="flex justify-center w-full">
          <ProductInfor productDetail={productDetail} />
        </div>

        <div className="col-span-1 md:col-span-2">
          <SellerInfor seller={productDetail.seller} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
