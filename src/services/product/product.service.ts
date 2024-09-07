import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductResponse } from '../../types/Product/PostProb';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
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
    }),
});

export const { useGetAllProductsWithImagesWithSortAndPagingMutation } = productApi;
