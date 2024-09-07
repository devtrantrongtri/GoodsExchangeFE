import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { UserProfileResponse } from '../../types/user'
const baseUrl = import.meta.env.VITE_BASE_URL
// create API by using RTK query
export const userApi = createApi({
    reducerPath : 'userApi', // field name of Redux State
    baseQuery : fetchBaseQuery({
        baseUrl : baseUrl,
        prepareHeaders: (headers) => {
            // Lấy token từ Redux state hoặc từ localStorage || mai mot se config to more productive
            let token = localStorage.getItem('token'); // Hoặc từ state nếu lưu trong Redux
            token = "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6InRyaTEyMyIsInN1YiI6InRyaTEyMyIsImlhdCI6MTcyNTYzOTk5NCwiZXhwIjoxNzI1NjQxNzk0fQ.qqyIGb5qHdfruSnpWWdMjZ6IW34vWof3MzEfDeG3S4oD58bCxKY0m6UiMfs0-bn6y8kobsso-WVfuCfh8ME2IA";
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
        })
    })
})

// useGetProfileQuey dc RTK auto generate =))
export const {useGetProfileQuery} = userApi