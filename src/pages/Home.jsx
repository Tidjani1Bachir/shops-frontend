import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Header Section */}
      {!keyword ? <Header /> : null}

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : isError ? (
        <div className="flex justify-center items-center h-screen px-4">
          <Message variant="danger">
            {isError?.data?.message || "An error occurred while loading products"}
          </Message>
        </div>
      ) : (
        <div className="w-full">
          {/* Section Header */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                  {keyword ? `Search Results for "${keyword}"` : "Special Products"}
                </h1>
                <p className="text-gray-400 text-lg">
                  Discover our curated collection of premium products
                </p>
              </div>
              
              <Link
                to="/shop"
                className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-bold rounded-lg py-3 px-8 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-pink-500/50 w-full lg:w-auto text-center"
              >
                Explore All Products
              </Link>
            </div>
          </div>

          {/* Products Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            {data?.products && data.products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {data.products.map((product) => (
                  <div
                    key={product._id}
                    className="transform transition-all duration-300 hover:scale-105"
                  >
                    <Product product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <p className="text-xl text-gray-400 mb-6">
                  No products found matching your criteria
                </p>
                <Link
                  to="/shop"
                  className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-bold rounded-lg py-2 px-6 transition-all duration-300"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>

          {/* CTA Section */}
          {!keyword && (
            <div className="bg-gradient-to-r from-pink-600 to-pink-500 py-12 lg:py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Ready to Shop?
                  </h2>
                  <p className="text-pink-100 text-lg mb-8">
                    Browse our complete collection and find exactly what your&apos;e looking for.
                  </p>
                  <Link
                    to="/shop"
                    className="inline-block bg-white text-pink-600 hover:bg-pink-50 font-bold rounded-lg py-3 px-10 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Visit Shop
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
