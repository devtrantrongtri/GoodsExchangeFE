import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CommentRequest, CommentResponse } from '../../types/Product/PostProb';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const commentApi = createApi({
    reducerPath: 'commentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (build) => ({
        getCommentsByPostId: build.query<CommentResponse, number>({
            query: (postId) => `comments/post/${postId}`,
        }),
        addComment: build.mutation<CommentResponse, CommentRequest>({
            query: (body) => ({
                url: 'comments',
                method: 'POST',
                body,
            }),
        }),
        updateComment: build.mutation<CommentResponse, { id: number; body: CommentRequest }>({
            query: ({ id, body }) => ({
                url: `comments/updateComment/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        deleteComment: build.mutation<void, number>({
            query: (id) => ({
                url: `comments/deleteComment/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetCommentsByPostIdQuery,
    useAddCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
} = commentApi;
