import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";
const login = "login";
const logout = "logout";
const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${login}`,
        method: "POST",
        body: data,
      }),
    }),
    register: build.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: `${USERS_URL}/${logout}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  usersApiSlice;
