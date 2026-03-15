import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
      // Refresh the admin's user list when a new person joins
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
      // Invalidate specific user tag if you want details to update
      invalidatesTags: ["User"],
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
      // Step: Make the user disappear from the list immediately
      invalidatesTags: ["User"],
    }),
    getUserDetails: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      // Step: Refresh both the specific user details and the general list
      invalidatesTags: (result, error, { userId }) => [
        { type: "User" },
        { type: "User", id: userId },
      ],
    }),
    // ADD THIS NEW MUTATION HERE
    syncFavorites: builder.mutation({
      query: (favorites) => ({
        url: `${USERS_URL}/sync-favorites`,
        method: "POST",
        body: { favorites }, // Sending the array of IDs from LocalStorage
      }),
      // We invalidate "User" because the user's favorite list has changed
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserDetailsQuery,
  useSyncFavoritesMutation,
} = userApiSlice;
