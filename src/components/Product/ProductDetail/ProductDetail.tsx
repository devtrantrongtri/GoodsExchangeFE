import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetProductDetailQuery } from '../../../services/product/product.service';
import ImageGallery from './ImageGallery';
import SellerInfor from './SellerInfor';
import ProductInfor from './ProductInfor';
import ProductDeletedOrHiddenPage from '../../Util/ProductDeletedOrHiddenPage';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

function ProductDetail() {
    const { id } = useParams<{ id: string }>();

    const { data, error, isLoading } = useGetProductDetailQuery(id || '')
    console.log(data)
    if (error || !data || data.code !== 200) {
      return <ProductDeletedOrHiddenPage />;
  }

  // Dữ liệu sản phẩm
  const productDetail = data.data;

  return (
    <div className='grid grid-cols-2 px-40 '>
      {/* Breadcrumb */}
     <div className='col-span-2'>
     <Breadcrumb
        items={[
          {
            title: <Link to="/"><HomeOutlined className="mr-1"/>Home</Link>,
          },
          {
            title: <Link to={`/category/${productDetail.category.categoryID}`}>{productDetail.category.name}</Link>,
          },
          {
            title: productDetail.title,
          },
        ]}
        separator=">"
        className="mb-4 text-gray-600"
      />
     </div>
      <div className='bg-white '>
    <ImageGallery imgs = {productDetail && productDetail.imageUrls}/>
      </div>

      <div className='bg-white flex justify-center'>
        <ProductInfor productDetail = {productDetail} />
      </div>

      <div className='bg-black col-span-2'>
      <SellerInfor/>
      </div>

    </div>
  )
}

export default ProductDetail