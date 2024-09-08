import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductDetailResponse, ProductResponse } from '../../types/Product/PostProb';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery : fetchBaseQuery({
        baseUrl : baseUrl,
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
        getAllProductsWithImagesWithSortAndPaging: build.mutation<ProductResponse, { offset: number; pageSize: number; order: string; field: string }>({
            query: (body) => ({
                url: 'products/getAllProductsWithImagesWithSortAndPaging',
                method: 'POST', // Changing the method to POST
                body, // Passing the request body
            }),
        }),
        getProductDetail : build.query<ProductDetailResponse,string> ({
            query : (id) => `products/getProductDetail/${id}`
        })
    }),
});

export const { 
    useGetAllProductsWithImagesWithSortAndPagingMutation,
    useGetProductDetailQuery


} = productApi;
