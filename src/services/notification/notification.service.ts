import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GlobalResponse } from "../../types/GlobalReponse";
// import { UpdateProfileRequest, notification, notificationProfileResponse, notificationSentListResponseType } from '../../types/user'
const baseUrl = import.meta.env.VITE_BASE_URL;
// create API by using RTK query
export const notificationApi = createApi({
  reducerPath: "notificationApi", // field name of Redux State
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      // Lấy token từ Redux state hoặc từ localStorage || mai mot se config to more productive
      const token = localStorage.getItem("token"); // Hoặc từ state nếu lưu trong Redux
      // token = "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6InRyaSIsInN1YiI6InRyaSIsImlhdCI6MTcyNTY4MzYzOSwiZXhwIjoxNzI1Njg1NDM5fQ.bxhFL9xPNG_iB1xWNaOHV0VGv6obcjmag5ljwi5ZMrD1ONZP6qaipeDTyWojVMda5Lx5C2nG97vDcZP1L--82Q";
      // Nếu có token, thêm nó vào header
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  // get post put delete : query, mutation
  endpoints: (build) => ({
    // Lấy tất cả notifications
    getAllNotifications: build.query<GlobalResponse<any>, void>({
      query: () => "/notifications",
    }),

    // Lấy notification theo ID
    getNotificationById: build.query<GlobalResponse<any>, number>({
      query: (id) => `/notifications/${id}`,
    }),

    // Lấy notifications theo User ID
    getNotificationsByUser: build.query<GlobalResponse<any>, number>({
      query: (userId) => `/notifications/user/${userId}`,
    }),

    // Lấy notifications theo Username
    getNotificationsByUsername: build.query<GlobalResponse<any>, string>({
      query: (username) => `/notifications/username/${username}`,
    }),

    // Tạo notification mới
    createNotification: build.mutation<
      GlobalResponse<any>,
      { message: string; userId: number }
    >({
      query: (notificationData) => ({
        url: "/notifications",
        method: "POST",
        body: notificationData,
      }),
    }),

    // Cập nhật notification
    updateNotification: build.mutation<
      GlobalResponse<any>,
      { id: number; message: string; userId: number }
    >({
      query: ({ id, ...rest }) => ({
        url: `/notifications/update/${id}`,
        method: "PUT",
        body: rest,
      }),
    }),

    // Xóa notification theo ID
    deleteNotification: build.mutation<GlobalResponse<any>, number>({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "DELETE",
      }),
    }),

    // Đánh dấu notification là đã đọc
    markReadNotification: build.mutation<GlobalResponse<any>, number>({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "PUT",
      }),
    }),

    // Lấy các notifications có sắp xếp
    getNotificationsWithSort: build.query<
      GlobalResponse<any>,
      { field: string; order: string }
    >({
      query: ({ field, order }) => `/notifications/sort/${field}/${order}`,
    }),

    // Lấy các notifications với phân trang
    getNotificationsWithPage: build.query<
      GlobalResponse<any>,
      { offset: number; size: number }
    >({
      query: ({ offset, size }) => `/notifications/page/${offset}/${size}`,
    }),

    // Lấy notifications với phân trang và sắp xếp
    getNotificationsWithSortAndPage: build.query<
      GlobalResponse<any>,
      { offset: number; pageSize: number; field: string; order: string }
    >({
      query: ({ offset, pageSize, field, order }) => ({
        url: "/notifications/sortAndPage",
        method: "GET",
        params: { offset, pageSize, field, order },
      }),
    }),
  }),
});

// Auto-generated hooks từ RTK Query
export const {
  useGetAllNotificationsQuery,
  useGetNotificationByIdQuery,
  useGetNotificationsByUserQuery,
  useGetNotificationsByUsernameQuery,
  useCreateNotificationMutation,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
  useMarkReadNotificationMutation,
  useGetNotificationsWithSortQuery,
  useGetNotificationsWithPageQuery,
  useGetNotificationsWithSortAndPageQuery,
} = notificationApi;
