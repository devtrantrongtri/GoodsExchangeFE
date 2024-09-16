import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { WishListResponse } from '../../types/wishList';
import { GlobalResponse } from '../../types/GlobalReponse';
// import { UpdateProfileRequest, wishList, wishListProfileResponse, wishListSentListResponseType } from '../../types/user'
const baseUrl = import.meta.env.VITE_BASE_URL
// create API by using RTK query
export const wishListApi = createApi({
    reducerPath : 'wishListApi', // field name of Redux State
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
    // get post put delete : query, mutation
    endpoints : build => ({
        getWishList: build.query<WishListResponse,void>({
            query: () => '/wishlist/getTheirWishList', // Gọi đến API lấy wishList
        }),
         // Định nghĩa mutation để thêm sản phẩm vào wishList
        addProductToWishList: build.mutation<GlobalResponse<any>,any>({
            query: (body) => ({
              url: '/wishlist/addWishlist',
              method: 'POST',
              body: body, // Dữ liệu gửi đi trong request body
            }),
          }),
      deleteProductFromWishList: build.mutation<GlobalResponse<any>,number>({
        query: (productId) => ({
          url: `/wishlist/deleteWishListByProduct/${productId}`,
          method: 'DELETE',
        }),
      }),
    })
})

// useGetProfileQuey dc RTK auto generate =))
export const {useGetWishListQuery,useAddProductToWishListMutation,useDeleteProductFromWishListMutation} = wishListApi