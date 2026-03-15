import { Link } from "react-router-dom";
import moment from "moment";
import { FaEdit, FaCalendar, FaDollarSign, FaBox } from "react-icons/fa";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin">
            <FaBox className="text-pink-500" size={48} />
          </div>
          <p className="text-gray-300 mt-4 text-xl">Loading products...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 border border-red-500 rounded-lg p-8 max-w-md">
          <h3 className="text-red-500 font-bold text-lg mb-2">Error Loading Products</h3>
          <p className="text-gray-300">There was an error loading the products. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <FaBox className="text-pink-500" size={32} />
              <h1 className="text-3xl lg:text-4xl font-bold text-white">
                All Products
              </h1>
            </div>
            <p className="text-gray-400 text-lg">
              Total: <span className="text-pink-400 font-semibold">{products?.length || 0}</span> products
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products && products.map((product) => (
              <Link
                key={product._id}
                to={`/admin/product/update/${product._id}`}
                className="h-full"
              >
                <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-lg hover:shadow-2xl hover:border-pink-500 transition-all duration-300 transform hover:scale-105 flex flex-col h-full">
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden bg-gray-700">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Content Container */}
                  <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                    {/* Product Name */}
                    <div>
                      <h3 className="text-xl font-bold text-white line-clamp-2 mb-2">
                        {product?.name}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-3">
                        {product?.description?.substring(0, 100)}...
                      </p>
                    </div>

                    {/* Meta Information */}
                    <div className="space-y-2 border-t border-gray-700 pt-4">
                      {/* Date */}
                      <div className="flex items-center gap-2 text-gray-300 text-sm">
                        <FaCalendar className="text-pink-400" size={14} />
                        <span>{moment(product.createdAt).format("MMM Do YYYY")}</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <FaDollarSign className="text-pink-400" size={16} />
                        <span className="text-xl font-bold text-white">{product?.price}</span>
                      </div>
                    </div>

                    {/* Update Button */}
                    <button className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-semibold py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 mt-4 transform hover:scale-105">
                      <FaEdit size={16} />
                      Edit Product
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {!products || products.length === 0 && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-12 text-center">
              <FaBox className="text-gray-600 mx-auto mb-4" size={48} />
              <p className="text-gray-400 text-lg">No products found</p>
            </div>
          )}
        </div>

        {/* Admin Menu Sidebar */}
        <div className="lg:w-72">
          <AdminMenu />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
