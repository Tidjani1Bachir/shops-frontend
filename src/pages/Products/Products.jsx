import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Rating from "./Rating";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { addToCart } from "../../redux/features/cart/cartSlice";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
  FaArrowLeft,
} from "react-icons/fa";
import moment from "moment";
import ProductTabs from "./Tabs";
import HeartIcon from "./HeartIcon";

const Product = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        {/* Back Button */}
        <div className="pt-4 px-4 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 font-semibold transition-colors duration-300"
          >
            <FaArrowLeft size={16} />
            Back to Products
          </Link>
        </div>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            <div className="container mx-auto px-4 lg:px-8 py-8">
              {/* Main Product Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Image Section */}
                <div className="flex flex-col items-center justify-center">
                  <div className="relative group w-full max-w-md">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-96 rounded-lg object-cover shadow-2xl transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <HeartIcon product={product} />
                  </div>
                </div>

                {/* Details Section */}
                <div className="flex flex-col justify-between space-y-6">
                  {/* Title and Description */}
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                      {product.name}
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed mb-6">
                      {product.description}
                    </p>
                  </div>

                  {/* Price Section */}
                  <div className="bg-gradient-to-r from-pink-600 to-pink-500 rounded-lg p-6 shadow-xl">
                    <span className="text-gray-200 text-sm font-semibold">
                      Price
                    </span>
                    <p className="text-5xl font-bold text-white">
                      ${product.price}
                    </p>
                  </div>

                  {/* Info Cards Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Brand */}
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-pink-500 transition-colors duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <FaStore className="text-pink-400" />
                        <span className="text-gray-400 text-sm font-semibold">
                          Brand
                        </span>
                      </div>
                      <p className="text-white font-bold">{product.brand}</p>
                    </div>

                    {/* Reviews */}
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-pink-500 transition-colors duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <FaStar className="text-yellow-400" />
                        <span className="text-gray-400 text-sm font-semibold">
                          Reviews
                        </span>
                      </div>
                      <p className="text-white font-bold">
                        {product.numReviews}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-pink-500 transition-colors duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <FaBox className="text-blue-400" />
                        <span className="text-gray-400 text-sm font-semibold">
                          Qty
                        </span>
                      </div>
                      <p className="text-white font-bold">
                        {product.quantity}
                      </p>
                    </div>

                    {/* In Stock */}
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-pink-500 transition-colors duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <FaBox className="text-green-400" />
                        <span className="text-gray-400 text-sm font-semibold">
                          Stock
                        </span>
                      </div>
                      <p className="text-white font-bold">
                        {product.countInStock}
                      </p>
                    </div>

                    {/* Added */}
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-pink-500 transition-colors duration-300 col-span-2">
                      <div className="flex items-center gap-2 mb-2">
                        <FaClock className="text-orange-400" />
                        <span className="text-gray-400 text-sm font-semibold">
                          Added
                        </span>
                      </div>
                      <p className="text-white font-bold">
                        {moment(product.createdAt).fromNow()}
                      </p>
                    </div>
                  </div>

                  {/* Rating and Actions */}
                  <div className="space-y-4">
                    {/* Rating Component */}
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    </div>

                    {/* Quantity and Add to Cart */}
                    <div className="flex gap-4">
                      {product.countInStock > 0 && (
                        <select
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                          className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:outline-none w-24 transition-colors duration-300"
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      )}

                      <button
                        onClick={addToCartHandler}
                        disabled={product.countInStock === 0}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-bold text-white transition-all duration-300 transform ${
                          product.countInStock === 0
                            ? "bg-gray-600 cursor-not-allowed opacity-50"
                            : "bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 hover:shadow-lg hover:scale-105"
                        }`}
                      >
                        <FaShoppingCart />
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Tabs Section */}
              <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-xl p-8">
                <ProductTabs
                  loadingProductReview={loadingProductReview}
                  userInfo={userInfo}
                  submitHandler={submitHandler}
                  rating={rating}
                  setRating={setRating}
                  comment={comment}
                  setComment={setComment}
                  product={product}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Product;
