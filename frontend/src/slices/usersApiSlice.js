import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";
const login = "login";
const logout = "logout";
const profile = "profile";
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
    updateProfile: build.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${profile}`,
        method: "PUT",
        body: data,
      }),
    }),
    removeUser: build.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    getUsers: build.query({
      query: ({ page, limit }) => `${USERS_URL}/?page=${page}&limit=${limit}`,
      providesTags: ["User"],
    }),
    getUser: build.query({
      query: (id) => `${USERS_URL}/${id}`,
      providesTags: ["User"],
    }),
    updateUser: build.mutation({
      query: ({ id, data }) => ({
        url: `${USERS_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateProfileMutation,
  useGetUsersQuery,
  useRemoveUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} = usersApiSlice;
