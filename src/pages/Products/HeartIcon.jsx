import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";

import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../Utils/localStorage";
import PropTypes from "prop-types";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorite = favorites.some((p) => p._id === product._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, [dispatch]);

  const toggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      addFavoriteToLocalStorage(product);
    }
  };

  return (
    <button
      onClick={toggleFavorites}
      className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 bg-opacity-80 backdrop-blur-sm border border-gray-700 cursor-pointer transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:border-pink-500 group"
      aria-label="Toggle favorite"
    >
      {isFavorite ? (
        <FaHeart className="text-pink-500 text-lg drop-shadow-lg" />
      ) : (
        <FaRegHeart className="text-white text-lg group-hover:text-pink-400 transition-colors duration-300" />
      )}
    </button>
  );
};

HeartIcon.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default HeartIcon;