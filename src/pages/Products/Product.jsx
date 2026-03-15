import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import { FaShoppingCart } from "react-icons/fa";
import PropTypes from "prop-types";

const Product = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <div className="group bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:border-pink-500 cursor-pointer h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-64 bg-gray-900 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
          
          {/* Quick View Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <FaShoppingCart className="text-sm" />
              Quick View
            </button>
          </div>
          
          {/* Heart Icon */}
          <HeartIcon product={product} />
        </div>

        {/* Content Container */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          {/* Product Name */}
          <div>
            <h3 className="text-white font-semibold text-base group-hover:text-pink-400 transition-colors duration-300 line-clamp-2 mb-2">
              {product.name}
            </h3>
          </div>

          {/* Price Badge */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-700">
            <span className="bg-gradient-to-r from-pink-600 to-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
              ${product.price}
            </span>
            <div className="text-xs text-gray-400 font-medium">
              {product.quantity > 0 ? (
                <span className="text-green-400">In Stock</span>
              ) : (
                <span className="text-red-400">Out of Stock</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
// 🔻 Add PropTypes validation
Product.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};
export default Product;
