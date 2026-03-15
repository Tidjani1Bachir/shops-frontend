import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Messsage from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";
import {
  FaBox,
  FaTruck,
  FaCreditCard,
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaMoneyBillAlt,
} from "react-icons/fa";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPaPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();
//this useEffect avoids loading PayPal on every page, saving bandwidth and improving performance. load it only when neccessary, which is when the order is not paid yet. if the order is already paid, there's no need to load the PayPal script at all.


//full logic explanation
// I need to load PayPal only when:
// I have a client ID ✅
// The order is unpaid ✅
// PayPal isn’t already loaded ✅
// So I’ll wait for:
// Client ID to finish loading (!loadingPaPal && !errorPayPal)
// Order data to arrive (order)
// When those are ready, I’ll:
// Configure the PayPal SDK with my client ID
// Tell the SDK to start loading
// But only if it’s not already loaded (!window.paypal)
// I’ll use useEffect to react to data changes — because React re-renders when data arrives
  useEffect(() => {
    if (!errorPayPal && !loadingPaPal && paypal.clientId) {
      const loadingPaPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPaPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPaPal, order, paypal, paypalDispatch]);

//    The Purpose of onApprove
// This function is called by the PayPal SDK only after the user has:
// Logged in to PayPal (if needed)
// Reviewed the payment details
// Clicked “Approve” or “Pay Now”
  function onApprove(data, actions) {
//Returning the Promise tells PayPal’s SDK:
// “Wait for this async work to finish before closing the popup.”
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onError(err) {
    toast.error(err.message);
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Messsage variant="danger">{error.data.message}</Messsage>
  ) : (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-8 px-4 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Order Details</h1>
          <p className="text-gray-400">
            Order ID: <span className="text-pink-400 font-semibold">{order._id}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Order Items Section */}
          <div className="lg:col-span-2">
            {/* Order Items */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <FaBox className="text-pink-400" />
                Order Items
              </h2>

              {order.orderItems.length === 0 ? (
                <Messsage>Order is empty</Messsage>
              ) : (
                <div className="space-y-4">
                  {order.orderItems.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-pink-500 transition-colors duration-300 flex items-center gap-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover shadow-md"
                      />
                      <div className="flex-1">
                        <Link
                          to={`/product/${item.product}`}
                          className="text-white font-semibold hover:text-pink-400 transition-colors duration-300 text-lg"
                        >
                          {item.name}
                        </Link>
                        <p className="text-gray-400 text-sm mt-1">
                          Price: <span className="text-pink-400 font-semibold">${item.price}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 text-sm mb-1">Qty: {item.qty}</p>
                        <p className="text-white font-bold text-lg">
                          ${(item.qty * item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Shipping Information */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <FaTruck className="text-pink-400" />
                Shipping Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaUser className="text-pink-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">Name</p>
                    <p className="text-white font-semibold">{order.user.username}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaEnvelope className="text-pink-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-semibold">{order.user.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-pink-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">Address</p>
                    <p className="text-white font-semibold">
                      {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                      {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaCreditCard className="text-pink-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">Payment Method</p>
                    <p className="text-white font-semibold">{order.paymentMethod}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            {/* Payment Status */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-6">
              <h3 className="text-lg font-bold text-white mb-4">Payment Status</h3>
              {order.isPaid ? (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3">
                  <FaCheckCircle className="text-green-400 text-xl flex-shrink-0" />
                  <div>
                    <p className="text-green-400 font-semibold">Paid</p>
                    <p className="text-gray-400 text-sm">{order.paidAt?.substring(0, 10)}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3">
                  <FaTimesCircle className="text-red-400 text-xl flex-shrink-0" />
                  <p className="text-red-400 font-semibold">Not Paid</p>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FaMoneyBillAlt className="text-pink-400" />
                Order Summary
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-gray-300">
                  <span>Items</span>
                  <span className="font-semibold">${order.itemsPrice}</span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span>Shipping</span>
                  <span className="font-semibold">${order.shippingPrice}</span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span>Tax</span>
                  <span className="font-semibold">${order.taxPrice}</span>
                </div>

                <div className="border-t border-gray-700 pt-3 mt-3 flex justify-between items-center">
                  <span className="text-white font-bold text-lg">Total</span>
                  <span className="text-pink-400 font-bold text-xl">
                    ${order.totalPrice}
                  </span>
                </div>
              </div>
            </div>

            {/* PayPal Button */}
            {!order.isPaid && (
              <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FaCreditCard className="text-pink-400" />
                  Payment
                </h3>
                {loadingPay && <Loader />}
                {isPending ? (
                  <Loader />
                ) : (
                  <div>
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Delivery Button */}
            {loadingDeliver && <Loader />}
            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
                <button
                  type="button"
                  className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:shadow-lg flex items-center justify-center gap-2"
                  onClick={deliverHandler}
                >
                  <FaTruck size={18} />
                  Mark As Delivered
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
