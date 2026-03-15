import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";
import PropTypes from "prop-types"; // 👈 Add this

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="group bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:border-pink-500 h-full flex flex-col">
      {/* Image Container */}
      <div className="relative h-48 bg-gray-900 overflow-hidden">
        <Link to={`/product/${p._id}`}>
          <img
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            src={p.image}
            alt={p.name}
          />
        </Link>

        {/* Dark Overlay on Hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />

        {/* Brand Badge */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-600 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          {p?.brand}
        </div>

        {/* Heart Icon */}
        <HeartIcon product={p} />
      </div>

      {/* Content Container */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        {/* Product Info */}
        <div className="mb-3">
          <h5 className="text-white font-semibold text-base group-hover:text-pink-400 transition-colors duration-300 line-clamp-2 mb-2">
            {p?.name}
          </h5>
          <p className="text-gray-400 text-sm line-clamp-2 mb-3">
            {p?.description?.substring(0, 50)}...
          </p>
        </div>

        {/* Price and Actions */}
        <div>
          <div className="flex items-center justify-between mb-4 pb-4 border-t border-gray-700 pt-4">
            <span className="text-pink-400 font-bold text-lg">
              {p?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
            <button
              onClick={() => addToCartHandler(p, 1)}
              className="p-2.5 rounded-full bg-gray-700 hover:bg-gradient-to-r hover:from-pink-600 hover:to-pink-500 text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              title="Add to Cart"
            >
              <AiOutlineShoppingCart size={20} />
            </button>
          </div>

          {/* View Details Button */}
          <Link
            to={`/product/${p._id}`}
            className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 rounded-lg transition-all duration-300 transform hover:shadow-lg group/btn"
          >
            View Details
            <svg
              className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

// 🔻 Add PropTypes validation
ProductCard.propTypes = {
  p: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    brand: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
