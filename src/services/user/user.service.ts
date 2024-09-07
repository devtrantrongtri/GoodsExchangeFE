import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { UpdateProfileRequest, UserProfileResponse } from '../../types/user'
const baseUrl = import.meta.env.VITE_BASE_URL
// create API by using RTK query
export const userApi = createApi({
    reducerPath : 'userApi', // field name of Redux State
    baseQuery : fetchBaseQuery({
        baseUrl : baseUrl,
        prepareHeaders: (headers) => {
            // Lấy token từ Redux state hoặc từ localStorage || mai mot se config to more productive
            let token = localStorage.getItem('token'); // Hoặc từ state nếu lưu trong Redux
            token = "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6InRyaSIsInN1YiI6InRyaSIsImlhdCI6MTcyNTY4MTAzMywiZXhwIjoxNzI1NjgyODMzfQ.Tb46MTPIDqW-O-at76NIk-n19gU0h8IU62yvlPPdHcG24pP29Ai8Z5Rs2jI363_3GpKVhseROLd-qUYzr7c5Wg";
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
        })
    })
})

// useGetProfileQuey dc RTK auto generate =))
export const {useGetProfileQuery,useUpdateProfileMutation} = userApi