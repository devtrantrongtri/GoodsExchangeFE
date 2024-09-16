import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { PaginatedProductsResponse, ProductDetailResponse, ProductFormData, ProductResponse, ProductSellerResponse } from '../../types/Product/PostProb';

// import { PaginatedProductsResponse, ProductDetailResponse, ProductResponse, ProductSellerResponse } from '../../types/Product/PostProb';


const baseUrl = import.meta.env.VITE_BASE_URL;

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers) => {
            // Lấy token từ Redux state hoặc từ localStorage || mai mot se config to more productive
            const token = localStorage.getItem('token'); // Hoặc từ state nếu lưu trong Redux
            // token = "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6InRyaSIsInN1YiI6InRyaSIsImlhdCI6MTcyNTY4MzYzOSwiZXhwIjoxNzI1Njg1NDM5fQ.bxhFL9xPNG_iB1xWNaOHV0VGv6obcjmag5ljwi5ZMrD1ONZP6qaipeDTyWojVMda5Lx5C2nG97vDcZP1L--82Q";
            // Nếu có token, thêm nó vào header
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: (build) => ({

        getAllProductsWithSortAndPaging: build.mutation<PaginatedProductsResponse, { offset: number, pageSize: number, order: string, field: string }>({
            query: (body) => ({
                url: 'products/getAllProductsWithImagesWithSortAndPaging',
                method: 'POST',
                body
            })
        }),
        getProductDetail: build.query<ProductDetailResponse, string>({
            query: (id) => `products/getProductDetail/${id}`
        }),
        getAllPosted: build.query<ProductSellerResponse, string>({
            query: (username) => `products/getAllProductByUsername/${username}`
        }),
        getAllProductsWithImages: build.query<ProductResponse, void>({
            query: () => 'products/with-images',
        }),
        changeInfoProduct: build.mutation<string, { id: number; productData: ProductFormData }>({
            query: ({ id, productData }) => ({
                url: `products/update_product/${id}`,
                method: 'PUT',
                body: productData,
            }),
        }),
        changeProductStatus: build.mutation<string, { id: number; status: string }>({
            query: ({ id, status }) => ({
                url: `products/${id}/status`,
                method: 'PUT',
                params: { status },
            }),
        }),
        deleteProduct: build.mutation<string, number>({
            query: (id) => ({
                url: `products/delete_product/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetAllProductsWithSortAndPagingMutation,
    useGetProductDetailQuery,
    useGetAllPostedQuery,
    useGetAllProductsWithImagesQuery,
    useChangeInfoProductMutation,
    useChangeProductStatusMutation,
    useDeleteProductMutation,
} = productApi;
