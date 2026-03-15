import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";
//Why no headers in RTK Query?
//Because auth is handled via HttpOnly cookies, sent automatically by the browser
export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: `${CATEGORY_URL}`,
        method: "POST",
        body: newCategory,
      }),
      // Step 2: "Burn" the Category tag to force a refresh
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation({
      query: ({ categoryId, updatedCategory }) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "PUT",
        body: updatedCategory,
      }),
      // Step 2: "Burn" the tag if we rename a category
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "DELETE",
      }),
      // Step 2: "Burn" the tag so the deleted item disappears immediately
      invalidatesTags: ["Category"],
    }),

    fetchCategories: builder.query({
      query: () => `${CATEGORY_URL}/categories`,
      // Step 1: Label this data with the "Category" tag
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} = categoryApiSlice;
