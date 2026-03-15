import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "../redux/features/favorites/favoriteSlice";
import { useGetUserDetailsQuery } from "../redux/api/usersApiSlice";

/**
 * Custom hook to load and manage user favorites
 * Loads favorites from the server when user is logged in
 */
export const useFavorites = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const favorites = useSelector((state) => state.favorites);

  // Fetch user details including favorites
  const { data: user, isLoading } = useGetUserDetailsQuery(userInfo?._id, {
    skip: !userInfo?._id, // Skip if no user ID
  });

  useEffect(() => {
    if (user?.favorites && userInfo) {
      // Load favorites from server
      dispatch(setFavorites(user.favorites));
    }
  }, [user, userInfo, dispatch]);

  return { favorites, isLoading };
};
