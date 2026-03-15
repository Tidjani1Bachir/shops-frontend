import { FaBox, FaExclamationTriangle, FaSpinner } from "react-icons/fa";
import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12">
        <div className="flex items-center justify-center">
          <FaSpinner className="text-pink-500 text-5xl animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12">
        <div className="flex flex-col items-center justify-center gap-4">
          <FaExclamationTriangle className="text-red-500 text-5xl" />
          <h2 className="text-2xl font-semibold text-white">Something went wrong</h2>
          <p className="text-gray-400">Failed to load featured products. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-pink-500/20 rounded-lg">
            <FaBox className="text-pink-500 text-2xl" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Featured Products</h2>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Product Grid (Hidden on mobile/tablet) */}
          <div className="hidden lg:block w-full lg:w-1/3">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Latest Arrivals</h3>
              <div className="grid grid-cols-2 gap-4">
                {data.map((product) => (
                  <div key={product._id} className="hover:opacity-80 transition-opacity duration-300">
                    <SmallProduct product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Carousel (Full width on mobile) */}
          <div className="w-full lg:w-2/3">
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
              <ProductCarousel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
