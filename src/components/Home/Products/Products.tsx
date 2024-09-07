import React, { useEffect } from 'react';
import CardPost from './CardPost';
import { PaginatedProductsResponse, ProductResponse, ProductType } from '../../../types/Product/PostProb';
import useAxios from '../../../hooks/useAxios';
import { Link } from 'react-router-dom';
import NoItemsMessage from '../../Util/NoItemsMessage';
import ErrorPopup from '../../Util/ErrorPopup';
import LoadingPopup from '../../Util/LoadingPopup';
import SkeletonPost from './SkeletonPost';

function Products() {
    const { response, error, loading, fetchData } = useAxios<PaginatedProductsResponse>();

    useEffect(() => {
        
        const loadData = async () => {
            await fetchData({
                url: 'products/getAllProductsWithImagesWithSortAndPaging',
                method: 'POST',
                data: {
                    offset: 0,
                    pageSize: 15,
                    order: 'desc',
                    field: 'createdAt'
                }
            });
        };

        loadData(); 
    }, []); 

    console.log(response)

    return (
        <div>
             {error && <ErrorPopup message={error} />}
            <h1 className='font-bold text-2xl pt-6 mb-10'>
                Tin đăng mới nhất
            </h1>
             {loading && <LoadingPopup/>}
            <div className='grid grid-cols-4 gap-8 min-h-96'>
                {response && response.data.content.length > 0 ? (
                    response.data.content.map((product) => (
                        <CardPost key={product.productId} product={product} />
                    ))
                ) : (
                    Array.from({ length: 16 }).map((_, index) => (
                        <SkeletonPost key={index} />
                    ))
                )}
            </div>
            <div className="flex justify-end mt-7">
                <Link to="product/" className="text-red-600 hover:text-gray-700">
                    Xem nhiều hơn...
                </Link>
            </div>
        </div>
    );
}

export default Products;
