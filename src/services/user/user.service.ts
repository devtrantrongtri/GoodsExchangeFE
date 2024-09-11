import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { UpdateProfileRequest, User, UserProfileResponse, UserSentListResponseType } from '../../types/user'
const baseUrl = import.meta.env.VITE_BASE_URL
// create API by using RTK query
export const userApi = createApi({
    reducerPath : 'userApi', // field name of Redux State
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
        // genType : type and arguments || reponse type : UserProfileResponse =))
        getProfile : build.query<UserProfileResponse,void>({
            query : () => 'userProfiles/userProfile' // http:localhost:8080/api/userProfiles/userProfile
        }),
        updateProfile : build.mutation<UserProfileResponse,UpdateProfileRequest> ({
            query(body)  {
                return {
                    url : 'userProfiles/update',
                    method : 'PUT',
                    body
                }
            }
        }),
        getSellerProfile : build.query<UserProfileResponse,number>({
            query : (id) => `userProfiles/${id}` // http:localhost:8080/api/userProfiles/1
        }),
        getUserSent : build.query<UserSentListResponseType,void>({
            query : () => `user/usersProfile/sent-messages` // http:localhost:8080/api/user/usersProfile/sent-messages
        }),
    })
})

// useGetProfileQuey dc RTK auto generate =))
export const {useGetProfileQuery,useUpdateProfileMutation,useGetSellerProfileQuery,useGetUserSentQuery} = userApi