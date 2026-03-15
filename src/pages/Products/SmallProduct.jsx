import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <div className="group bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:border-pink-500 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-48 bg-gray-900 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />

          {/* Heart Icon */}
          <HeartIcon product={product} />

          {/* View Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
            <button className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300 text-sm">
              View
              <FaArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          {/* Product Name */}
          <h3 className="text-white font-semibold text-sm group-hover:text-pink-400 transition-colors duration-300 line-clamp-2 mb-3">
            {product.name}
          </h3>

          {/* Price Badge */}
          <div className="inline-flex items-center">
            <span className="bg-gradient-to-r from-pink-600 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
              ${product.price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SmallProduct;
