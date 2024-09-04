import React, { useEffect } from 'react';
import CardPost from './CardPost';
import { ProductType } from '../../../types/Product/PostProb';
import useAxios from '../../../hooks/useAxios';
import { Link } from 'react-router-dom';
import NoItemsMessage from '../../Util/NoItemsMessage';
import ErrorPopup from '../../Util/ErrorPopup';
import LoadingPopup from '../../Util/LoadingPopup';

function Products() {
    const { response, error, loading, fetchData } = useAxios<ProductType[]>();

    useEffect(() => {
        
        const loadData = async () => {
            await fetchData({
                url: 'products/with-images',
                method: 'GET',
            });
        };

        loadData(); 
    }, []); 



    return (
        <div>
             {error && <ErrorPopup message={error} />}
            <h1 className='font-bold text-2xl pt-6 mb-10'>
                Tin đăng mới nhất
            </h1>
             {loading && <LoadingPopup />}
            <div className='grid grid-cols-4 gap-8 min-h-60'>
                {response && response.length > 0 ? (
                    response.map((product) => (
                        <CardPost key={product.productId} product={product} />
                    ))
                ) : (
                    <NoItemsMessage/>
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
