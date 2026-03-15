import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";
import { FaPen, FaComments, FaBox, FaUser, FaCalendar } from "react-icons/fa";
import PropTypes from "prop-types";


const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();

  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const tabs = [
    { id: 1, label: "Write Review", icon: FaPen },
    { id: 2, label: "All Reviews", icon: FaComments },
    { id: 3, label: "Top 4 Products", icon: FaBox },
  ];

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-8 border-b border-gray-700 flex-wrap">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all duration-300 border-b-2 ${
                activeTab === tab.id
                  ? "text-white border-pink-500 border-b-2 bg-gradient-to-r from-pink-600/10 to-pink-500/10"
                  : "text-gray-400 border-transparent hover:text-white hover:border-gray-600"
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="w-full">
        {/* Review Form Tab */}
        {activeTab === 1 && (
          <div className="w-full max-w-2xl">
            {userInfo ? (
              <form onSubmit={submitHandler} className="space-y-6">
                {/* Rating Select */}
                <div>
                  <label htmlFor="rating" className="block text-white font-semibold mb-3">
                    Your Rating
                  </label>
                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:border-pink-500 focus:outline-none transition-colors duration-300"
                  >
                    <option value="">Select a rating</option>
                    <option value="1">⭐ Inferior</option>
                    <option value="2">⭐⭐ Decent</option>
                    <option value="3">⭐⭐⭐ Great</option>
                    <option value="4">⭐⭐⭐⭐ Excellent</option>
                    <option value="5">⭐⭐⭐⭐⭐ Exceptional</option>
                  </select>
                </div>

                {/* Comment Textarea */}
                <div>
                  <label htmlFor="comment" className="block text-white font-semibold mb-3">
                    Your Review
                  </label>
                  <textarea
                    id="comment"
                    rows="5"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts about this product..."
                    className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:border-pink-500 focus:outline-none resize-none transition-colors duration-300"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingProductReview ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            ) : (
              <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
                <FaPen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">
                  Please{" "}
                  <Link to="/login" className="text-pink-400 hover:text-pink-300 font-semibold">
                    sign in
                  </Link>{" "}
                  to write a review
                </p>
              </div>
            )}
          </div>
        )}

        {/* All Reviews Tab */}
        {activeTab === 2 && (
          <div className="w-full">
            {product.reviews.length === 0 ? (
              <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
                <FaComments className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">No reviews yet. Be the first to review!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {product.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-pink-500 transition-colors duration-300"
                  >
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <FaUser className="text-pink-400" size={16} />
                          <strong className="text-white text-lg">{review.name}</strong>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <FaCalendar size={14} />
                          {review.createdAt.substring(0, 10)}
                        </div>
                      </div>
                      <div className="bg-pink-600/20 border border-pink-500/30 rounded-lg px-3 py-1">
                        <Ratings value={review.rating} />
                      </div>
                    </div>

                    {/* Review Comment */}
                    <p className="text-gray-300 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Related Products Tab */}
        {activeTab === 3 && (
          <div className="w-full">
            {!data ? (
              <Loader />
            ) : data.length === 0 ? (
              <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
                <FaBox className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">No Top products in the shop now </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((relatedProduct) => (
                  <div key={relatedProduct._id}>
                    <SmallProduct product={relatedProduct} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
ProductTabs.propTypes = {
  loadingProductReview: PropTypes.bool,
  userInfo: PropTypes.object, // or shape({ ... }) if you want stricter typing
  submitHandler: PropTypes.func.isRequired,
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setRating: PropTypes.func.isRequired,
  comment: PropTypes.string.isRequired,
  setComment: PropTypes.func.isRequired,
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        comment: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
export default ProductTabs;
