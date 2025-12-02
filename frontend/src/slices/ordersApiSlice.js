import { ORDERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    addOrder: build.mutation({
      query: (order) => ({
        url: `${ORDERS_URL}`,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrder: build.query({
      query: (id) => `${ORDERS_URL}/${id}`,
    }),
  }),
  overrideExisting: false,
});

export const { useAddOrderMutation, useGetOrderQuery } = ordersApiSlice;
