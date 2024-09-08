import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetProductDetailQuery } from '../../../services/product/product.service';

function ProductDetail() {
    const { id } = useParams<{ id: string }>();

    const { data, error, isLoading } = useGetProductDetailQuery(id || '')
    console.log(data)


  return (
    <div>ProductDetail of {id}</div>
  )
}

export default ProductDetail