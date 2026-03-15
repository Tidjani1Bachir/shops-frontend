import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import PropTypes from "prop-types";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const CustomArrow = (props) => {
  const { className, style, onClick, children } = props;
  return (
    <button
      className={`${className} absolute top-1/2 transform -translate-y-1/2 z-10 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white rounded-full p-3 transition-all duration-300 hover:scale-110 hover:shadow-lg`}
      style={{ ...style, background: "none" }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    dotsClass: "slick-dots custom-dots",
    nextArrow: (
      <CustomArrow>
        <FaChevronRight size={18} />
      </CustomArrow>
    ),
    prevArrow: (
      <CustomArrow>
        <FaChevronLeft size={18} />
      </CustomArrow>
    ),
  };

  return (
    <div className="mb-8 px-4">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-700 bg-gray-900">
          <Slider {...settings} className="product-carousel">
            {products.map(
              ({
                image,
                _id,
                name,
                price,
                description,
                brand,
                createdAt,
                numReviews,
                rating,
                quantity,
                countInStock,
              }) => (
                <div key={_id} className="outline-none">
                  <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-6 lg:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      {/* Image Section */}
                      <div className="flex justify-center">
                        <div className="relative group">
                          <img
                            src={image}
                            alt={name}
                            className="w-full rounded-lg object-cover h-80 lg:h-96 shadow-2xl transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg" />
                        </div>
                      </div>

                      {/* Info Section */}
                      <div className="text-white space-y-6">
                        {/* Header */}
                        <div>
                          <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600">
                            {name}
                          </h2>
                          <p className="text-gray-400 text-base leading-relaxed">
                            {description.substring(0, 180)}...
                          </p>
                        </div>

                        {/* Price Badge */}
                        <div className="inline-flex items-center">
                          <span className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent">
                            ${price}
                          </span>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-2 gap-4">
                          {/* Brand */}
                          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-pink-500 transition-colors duration-300">
                            <div className="flex items-center gap-2 mb-2">
                              <FaStore className="text-pink-400" />
                              <span className="text-gray-400 text-sm font-semibold">
                                Brand
                              </span>
                            </div>
                            <p className="text-white font-bold text-lg">{brand}</p>
                          </div>

                          {/* Rating */}
                          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-pink-500 transition-colors duration-300">
                            <div className="flex items-center gap-2 mb-2">
                              <FaStar className="text-yellow-400" />
                              <span className="text-gray-400 text-sm font-semibold">
                                Rating
                              </span>
                            </div>
                            <p className="text-white font-bold text-lg">
                              {Math.round(rating)} / 5
                            </p>
                          </div>

                          {/* Reviews */}
                          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-pink-500 transition-colors duration-300">
                            <div className="flex items-center gap-2 mb-2">
                              <FaShoppingCart className="text-blue-400" />
                              <span className="text-gray-400 text-sm font-semibold">
                                Reviews
                              </span>
                            </div>
                            <p className="text-white font-bold text-lg">
                              {numReviews}
                            </p>
                          </div>

                          {/* In Stock */}
                          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-pink-500 transition-colors duration-300">
                            <div className="flex items-center gap-2 mb-2">
                              <FaBox className="text-green-400" />
                              <span className="text-gray-400 text-sm font-semibold">
                                In Stock
                              </span>
                            </div>
                            <p className="text-white font-bold text-lg">
                              {countInStock}
                            </p>
                          </div>

                          {/* Quantity */}
                          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-pink-500 transition-colors duration-300">
                            <div className="flex items-center gap-2 mb-2">
                              <FaBox className="text-purple-400" />
                              <span className="text-gray-400 text-sm font-semibold">
                                Quantity
                              </span>
                            </div>
                            <p className="text-white font-bold text-lg">
                              {quantity}
                            </p>
                          </div>

                          {/* Added */}
                          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-pink-500 transition-colors duration-300">
                            <div className="flex items-center gap-2 mb-2">
                              <FaClock className="text-orange-400" />
                              <span className="text-gray-400 text-sm font-semibold">
                                Added
                              </span>
                            </div>
                            <p className="text-white font-bold text-lg">
                              {moment(createdAt).fromNow()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </Slider>

          <style>{`
            .custom-dots {
              bottom: 20px !important;
            }
            .custom-dots li button:before {
              background-color: rgba(255, 255, 255, 0.4) !important;
              color: rgba(255, 255, 255, 0.4) !important;
            }
            .custom-dots li.slick-active button:before {
              background-color: rgb(236, 72, 153) !important;
              color: rgb(236, 72, 153) !important;
            }
            .slick-prev:before,
            .slick-next:before {
              content: "" !important;
            }
            .product-carousel .slick-arrow {
              left: 20px;
            }
            .product-carousel .slick-next {
              left: auto;
              right: 20px;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

CustomArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
export default ProductCarousel;
