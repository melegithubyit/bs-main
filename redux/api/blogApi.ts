import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bole.weytech.et:5002",
    // credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", `application/json`);
      return headers;
    },
  }),

  tagTypes: [],
  endpoints: (builder) => ({
    //  get all blogs
    getAllBlogs: builder.query<any, void>({
      query: () => ({
        url: "/blogs",
        method: "GET",
      }),
    }),

    // get blog by id
    getBlogById: builder.query<any, string>({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "GET",
      }),
    }),

    // like a blog post
    likeBlog: builder.mutation<any, string>({
      query: (id) => ({
        url: `/blogs/${id}/like`,
        method: "PATCH",
      }),
    }),

    // dislike a blog post
    dislikeBlog: builder.mutation<any, string>({
      query: (id) => ({
        url: `/blogs/${id}/dislike`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useLikeBlogMutation,
  useDislikeBlogMutation,
} = blogApi;
