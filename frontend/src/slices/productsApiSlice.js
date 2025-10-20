import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL } from "../constants";

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => PRODUCTS_URL,
    }),
    getProduct: build.query({
      query: (id) => `${PRODUCTS_URL}/${id}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery } = productsApiSlice;
export const { useGetProductQuery } = productsApiSlice;
