import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetProductDetailQuery } from '../../../services/product/product.service';
import ImageGallery from './ImageGallery';
import SellerInfor from './SellerInfor';
import ProductInfor from './ProductInfor';
import ProductDeletedOrHiddenPage from '../../Util/ProductDeletedOrHiddenPage';

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
      
      <div className='bg-white '>
    <ImageGallery imgs = {productDetail && productDetail.imageUrls}/>
      </div>

      <div className='bg-white'>
        <ProductInfor/>
      </div>

      <div className='bg-black col-span-2'>
      <SellerInfor/>
      </div>

    </div>
  )
}

export default ProductDetail