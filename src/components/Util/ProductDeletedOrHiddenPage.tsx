import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const ProductDeletedOrHiddenPage: React.FC = () => {
    const status = 'deleted'; // Có thể là 'deleted' hoặc 'hidden'

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg text-center">
                {status === 'deleted' ? (
                    <>
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Product Deleted</h1>
                        <p className="text-gray-700 mb-4">
                            The product you are looking for has been permanently deleted and is no longer available.
                        </p>
                        <Link className='' to='/'><Button type="primary" danger>GO HOME</Button></Link>
                    </>
                ) : (
                    <>
                        <h1 className="text-2xl font-bold text-yellow-500 mb-4">Product Hidden</h1>
                        <p className="text-gray-700 mb-4">
                            The product you are trying to view is currently hidden and is not visible to the public.
                        </p>
                        <Link className='' to='/'><Button type="primary" danger>GO HOME</Button></Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductDeletedOrHiddenPage;
