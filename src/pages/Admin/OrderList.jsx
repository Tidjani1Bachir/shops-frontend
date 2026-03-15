import { FaCheckCircle, FaTimesCircle, FaBox, FaEye, FaCalendar, FaUser, FaDollarSign } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Admin Menu */}
        <div className="lg:w-72">
          <AdminMenu />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader />
            </div>
          ) : error ? (
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <>
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <FaBox className="text-pink-500" size={32} />
                  <h1 className="text-3xl lg:text-4xl font-bold text-white">
                    Orders
                  </h1>
                </div>
                <p className="text-gray-400 text-lg">
                  Total: <span className="text-pink-400 font-semibold">{orders?.length || 0}</span> orders
                </p>
              </div>

              {/* Orders Grid */}
              <div className="space-y-4">
                {orders && orders.length > 0 ? (
                  orders.map((order) => (
                    <div
                      key={order._id}
                      className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg hover:shadow-2xl hover:border-pink-500 transition-all duration-300 p-6"
                    >
                      {/* Order Header */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 pb-6 border-b border-gray-700">
                        {/* Order ID */}
                        <div>
                          <p className="text-gray-400 text-sm font-semibold uppercase tracking-wide mb-1">
                            Order ID
                          </p>
                          <p className="text-white font-mono text-sm break-all">
                            {order._id}
                          </p>
                        </div>

                        {/* User */}
                        <div className="flex items-start gap-2">
                          <FaUser className="text-pink-400 mt-1 flex-shrink-0" size={16} />
                          <div>
                            <p className="text-gray-400 text-sm font-semibold uppercase tracking-wide mb-1">
                              Customer
                            </p>
                            <p className="text-white">
                              {order.user ? order.user.username : "N/A"}
                            </p>
                          </div>
                        </div>

                        {/* Date */}
                        <div className="flex items-start gap-2">
                          <FaCalendar className="text-pink-400 mt-1 flex-shrink-0" size={16} />
                          <div>
                            <p className="text-gray-400 text-sm font-semibold uppercase tracking-wide mb-1">
                              Date
                            </p>
                            <p className="text-white">
                              {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                            </p>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="flex items-start gap-2">
                          <FaDollarSign className="text-pink-400 mt-1 flex-shrink-0" size={16} />
                          <div>
                            <p className="text-gray-400 text-sm font-semibold uppercase tracking-wide mb-1">
                              Total
                            </p>
                            <p className="text-white text-lg font-bold">
                              ${order.totalPrice}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Order Items & Status */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Order Items Preview */}
                        <div className="lg:col-span-1">
                          <p className="text-gray-400 text-sm font-semibold uppercase tracking-wide mb-3">
                            Items
                          </p>
                          <div className="flex gap-3">
                            {order.orderItems && order.orderItems.length > 0 && (
                              <div className="relative">
                                <img
                                  src={order.orderItems[0].image}
                                  alt={order._id}
                                  className="w-16 h-16 rounded-lg object-cover border border-gray-600"
                                />
                                {order.orderItems.length > 1 && (
                                  <span className="absolute -bottom-2 -right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    +{order.orderItems.length - 1}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Payment Status */}
                        <div>
                          <p className="text-gray-400 text-sm font-semibold uppercase tracking-wide mb-3">
                            Payment
                          </p>
                          <div className="flex items-center gap-2">
                            {order.isPaid ? (
                              <>
                                <FaCheckCircle className="text-green-400" size={20} />
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-500/20 text-green-400 border border-green-500">
                                  Completed
                                </span>
                              </>
                            ) : (
                              <>
                                <FaTimesCircle className="text-red-400" size={20} />
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-500/20 text-red-400 border border-red-500">
                                  Pending
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Delivery Status */}
                        <div>
                          <p className="text-gray-400 text-sm font-semibold uppercase tracking-wide mb-3">
                            Delivery
                          </p>
                          <div className="flex items-center gap-2">
                            {order.isDelivered ? (
                              <>
                                <FaCheckCircle className="text-green-400" size={20} />
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-500/20 text-green-400 border border-green-500">
                                  Delivered
                                </span>
                              </>
                            ) : (
                              <>
                                <FaTimesCircle className="text-orange-400" size={20} />
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-orange-500/20 text-orange-400 border border-orange-500">
                                  Pending
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="mt-6 pt-6 border-t border-gray-700">
                        <Link to={`/order/${order._id}`}>
                          <button className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105">
                            <FaEye size={18} />
                            View Order Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-12 text-center">
                    <FaBox className="text-gray-600 mx-auto mb-4" size={48} />
                    <p className="text-gray-400 text-lg">No orders found</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderList;
