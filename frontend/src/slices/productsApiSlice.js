import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL, UPLOAD_URL } from "../constants";

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: ({ search, page, limit }) =>
        `${PRODUCTS_URL}/?search=${search}&page=${page}&limit=${limit}`,
      providesTags: ["Product"],
    }),
    getProduct: build.query({
      query: (id) => `${PRODUCTS_URL}/${id}`,
      providesTags: ["Product"],
    }),

    getTopProducts: build.query({
      query: () => `${PRODUCTS_URL}/top`,
    }),

    addNewProduct: build.mutation({
      query: () => ({
        url: `${PRODUCTS_URL}`,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: build.mutation({
      query: ({ id, data }) => ({
        url: `${PRODUCTS_URL}/${id}/edit`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    createReview: build.mutation({
      query: ({ id, data }) => ({
        url: `${PRODUCTS_URL}/${id}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    uploadImage: build.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}/image`,
        method: "POST",
        body: data,
      }),
    }),
    invalidatesTags: ["Product"],
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useAddNewProductMutation,
  useUpdateProductMutation,
  useUploadImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
} = productsApiSlice;
export const { useGetProductQuery } = productsApiSlice;
