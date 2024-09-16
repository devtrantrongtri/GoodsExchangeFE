import React, { useEffect, useState } from 'react';
import CardPost from './CardPost';
import { PaginatedProductsResponse, ProductResponse, ProductType } from '../../../types/Product/PostProb';
import { Link } from 'react-router-dom';
import ErrorPopup from '../../Util/ErrorPopup';
import SkeletonPost from './SkeletonPost';
import { Button, Pagination } from 'antd'; // Import Pagination từ Ant Design
import { useGetAllProductsWithSortAndPagingMutation } from '../../../services/product/product.service';
// import { useGetAllProductsWithSortAndPagingMutation } from '../../../services/productApi';

function Products() {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalItems, setTotalItems] = useState(0); // Quản lý tổng số sản phẩm
    const [getAllProductsWithSortAndPaging, { data: response, error, isLoading }] = useGetAllProductsWithSortAndPagingMutation();

    useEffect(() => {
        const loadData = async () => {
            const result = await getAllProductsWithSortAndPaging({
                offset: currentPage,
                pageSize: 15,
                order: 'desc',
                field: 'createdAt'
            });

            // Sau khi nhận được kết quả, set tổng số sản phẩm nếu có
            if (result?.data) {
                if (result.data.data.content) {
                    const { totalElements, content } = result.data.data;
                setTotalItems(totalElements || 0); // Set tổng số sản phẩm
                    // setTotalItems(result.data.data.totalElements); // Set tổng số sản phẩm
                } else {
                    console.warn("No products found");
                }
            } else {
                console.error("Invalid response data");
            }
        };

        loadData();
    }, [currentPage, getAllProductsWithSortAndPaging]);

    const handlePageChange = (page: number) => {
        console.log("currentPage : ",currentPage)
        setCurrentPage(page);
    };
console.log("data :",response)
    return (
        <div>
            {error && <ErrorPopup message={ 'Error occurred!'} />}
            <h1 className='font-bold text-2xl pt-6 mb-10'>
                Tin đăng mới nhất
            </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 min-h-96'>
                {isLoading ? (
                    Array.from({ length: 16 }).map((_, index) => (
                        <SkeletonPost key={index} />
                    ))
                ) : (
                    response && response?.data?.content?.length > 0 ? ( // Sử dụng optional chaining để tránh lỗi
                        response.data.content.map((product: ProductType) => (
                            <CardPost key={product.productId} product={product} />
                        ))
                    ) : (
                        <div>Không có sản phẩm nào!</div>
                    )
                )}
            </div>
            <div className="flex justify-center mt-7">
                {/* Pagination từ Ant Design */}
                <Pagination
                    current={currentPage }
                    total={totalItems -1} // Tổng số sản phẩm
                    pageSize={15} // Kích thước trang là 15
                    onChange={(handlePageChange)} // Hàm xử lý khi thay đổi trang
                    showSizeChanger={false} // Ẩn tùy chọn thay đổi kích thước trang
                />
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
