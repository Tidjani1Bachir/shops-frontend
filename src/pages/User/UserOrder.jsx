import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";
import { FaBox, FaCheckCircle, FaClock } from "react-icons/fa";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-500 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <FaBox className="text-4xl text-white" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">My Orders</h1>
          </div>
          <p className="text-pink-100 mt-2">Track and manage your purchases</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <Loader />
          </div>
        ) : error ? (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-6">
            <Message variant="danger">{error?.data?.error || error.error}</Message>
          </div>
        ) : orders && orders.length > 0 ? (
          <div className="space-y-6">
            {/* Orders Summary */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <p className="text-gray-400">Total Orders</p>
              <p className="text-4xl font-bold text-pink-500">{orders.length}</p>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 hover:border-pink-500 transition-all duration-300 overflow-hidden"
                >
                  <div className="md:flex items-stretch">
                    {/* Order Image */}
                    <div className="md:w-32 h-32 flex-shrink-0 bg-gray-700">
                      <img
                        src={order.orderItems[0].image}
                        alt={order.user}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Order Details */}
                    <div className="flex-1 p-6 md:flex md:items-center md:justify-between">
                      <div className="space-y-3 mb-4 md:mb-0">
                        {/* Order ID */}
                        <div>
                          <p className="text-gray-400 text-sm">Order ID</p>
                          <p className="text-white font-semibold text-lg break-all">
                            #{order._id}
                          </p>
                        </div>

                        {/* Date */}
                        <div>
                          <p className="text-gray-400 text-sm">Order Date</p>
                          <p className="text-white font-semibold">
                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>

                        {/* Total Price */}
                        <div>
                          <p className="text-gray-400 text-sm">Total Price</p>
                          <p className="text-2xl font-bold text-pink-500">
                            ${order.totalPrice}
                          </p>
                        </div>
                      </div>

                      {/* Status Badges */}
                      <div className="space-y-3 md:text-right">
                        {/* Payment Status */}
                        <div className="flex md:flex-col md:items-end gap-2">
                          <p className="text-gray-400 text-sm md:block hidden">Payment</p>
                          {order.isPaid ? (
                            <div className="flex items-center gap-2 bg-green-500 bg-opacity-20 border border-green-500 rounded-lg px-3 py-2 text-green-400 font-semibold">
                              <FaCheckCircle />
                              Paid
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg px-3 py-2 text-red-400 font-semibold">
                              <FaClock />
                              Pending
                            </div>
                          )}
                        </div>

                        {/* Delivery Status */}
                        <div className="flex md:flex-col md:items-end gap-2">
                          <p className="text-gray-400 text-sm md:block hidden">Delivery</p>
                          {order.isDelivered ? (
                            <div className="flex items-center gap-2 bg-green-500 bg-opacity-20 border border-green-500 rounded-lg px-3 py-2 text-green-400 font-semibold">
                              <FaCheckCircle />
                              Delivered
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 bg-orange-500 bg-opacity-20 border border-orange-500 rounded-lg px-3 py-2 text-orange-400 font-semibold">
                              <FaClock />
                              Shipping
                            </div>
                          )}
                        </div>

                        {/* View Details Button */}
                        <Link to={`/order/${order._id}`}>
                          <button className="w-full md:w-auto bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg mt-4 md:mt-0">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Order Items Count */}
                  <div className="bg-gray-750 px-6 py-3 border-t border-gray-700 text-gray-400 text-sm">
                    {order.orderItems.length} item{order.orderItems.length !== 1 ? "s" : ""} in this order
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <FaBox className="text-7xl text-gray-500 mb-6" />
            <h2 className="text-3xl font-bold text-white mb-2">No Orders Yet</h2>
            <p className="text-gray-400 text-lg mb-8">
              You haven&apos;t placed any orders yet. Start shopping!
            </p>
            <Link
              to="/shop"
              className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrder;
