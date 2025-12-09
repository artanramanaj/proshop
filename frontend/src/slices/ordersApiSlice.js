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
    getMyOrders: build.query({
      query: ({ perPage, limit }) =>
        `${ORDERS_URL}/mine/?page=${perPage}&limit=${limit}`,
    }),
    getOrders: build.query({
      query: ({ perPage, limit }) =>
        `${ORDERS_URL}/?page=${perPage}&limit=${limit}`,
    }),
    markDeliver: build.mutation({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}/deliver`,
        method: "PUT",
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useAddOrderMutation,
  useMarkDeliverMutation,
  useGetOrderQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
} = ordersApiSlice;
