import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-500 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <FaHeart className="text-4xl text-white" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">Favorite Products</h1>
          </div>
          <p className="text-pink-100 mt-2">Your collection of loved items</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {favorites && favorites.length > 0 ? (
          <div>
            {/* Favorites Summary */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-3xl font-bold text-white">
                  {favorites.length}
                  <span className="text-pink-500 ml-2">
                    {favorites.length === 1 ? "Item" : "Items"}
                  </span>
                </h2>
                <div className="text-gray-400 text-sm">
                  Added to your favorites
                </div>
              </div>
            </div>

            {/* Favorites Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {favorites.map((product) => (
                <div
                  key={product._id}
                  className="transform transition-all duration-300 hover:scale-105"
                >
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-center">
              <FaHeart className="text-7xl text-gray-500 mx-auto mb-6 opacity-50" />
              <h2 className="text-3xl font-bold text-white mb-2">No Favorites Yet</h2>
              <p className="text-gray-400 text-lg mb-8">
                Start adding your favorite products to see them here!
              </p>
              <Link
                to="/shop"
                className="inline-block bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explore Products
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
