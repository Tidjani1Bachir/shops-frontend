import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import {
  FaBox,
  FaTruck,
  FaCreditCard,
  FaMoneyBillAlt,
  FaShoppingBag,
  FaMapMarkerAlt,
} from "react-icons/fa";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <ProgressSteps step1 step2 step3 />

      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-8 px-4 lg:px-8">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-2">
              <FaShoppingBag className="text-pink-400" />
              Review Your Order
            </h1>
            <p className="text-gray-400">
              Items: <span className="text-pink-400 font-semibold">{cart.cartItems.length}</span>
            </p>
          </div>

          {cart.cartItems.length === 0 ? (
            <Message>Your cart is empty</Message>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order Items */}
              <div className="lg:col-span-2">
                <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <FaBox className="text-pink-400" />
                    Order Items
                  </h2>

                  <div className="space-y-4">
                    {cart.cartItems.map((item, index) => (
                      <div
                        key={index}
                        className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-pink-500 transition-colors duration-300 flex items-center gap-4"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 rounded-lg object-cover shadow-md flex-shrink-0"
                        />

                        <div className="flex-1">
                          <Link
                            to={`/product/${item.product}`}
                            className="text-white font-semibold hover:text-pink-400 transition-colors duration-300 text-lg"
                          >
                            {item.name}
                          </Link>
                          <p className="text-gray-400 text-sm mt-1">
                            Price: <span className="text-pink-400 font-semibold">${Number(item.price).toFixed(2)}</span>
                          </p>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <p className="text-gray-400 text-sm mb-1">Qty: {item.qty}</p>
                          <p className="text-white font-bold text-lg">
                            ${(item.qty * item.price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Summary Card */}
                <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <FaMoneyBillAlt className="text-pink-400" />
                    Order Summary
                  </h2>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-gray-300">
                      <span>Items</span>
                      <span className="font-semibold">${Number(cart.itemsPrice).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-300">
                      <span>Shipping</span>
                      <span className="font-semibold">${Number(cart.shippingPrice).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-300">
                      <span>Tax</span>
                      <span className="font-semibold">${Number(cart.taxPrice).toFixed(2)}</span>
                    </div>

                    <div className="border-t border-gray-700 pt-3 mt-3 flex justify-between items-center">
                      <span className="text-white font-bold text-lg">Total</span>
                      <span className="text-pink-400 font-bold text-xl">
                        ${Number(cart.totalPrice).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Shipping Info Card */}
                <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <FaTruck className="text-pink-400" />
                    Shipping Address
                  </h2>

                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-pink-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                      {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                    </p>
                  </div>
                </div>

                {/* Payment Method Card */}
                <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <FaCreditCard className="text-pink-400" />
                    Payment Method
                  </h2>

                  <p className="text-gray-300 font-semibold bg-gray-700 rounded-lg px-3 py-2">
                    {cart.paymentMethod}
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <Message variant="danger">{error.data?.message || "An error occurred"}</Message>
                  </div>
                )}

                {/* Place Order Button */}
                <button
                  type="button"
                  className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition-all duration-300 transform flex items-center justify-center gap-2 ${
                    cart.cartItems.length === 0
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed opacity-50"
                      : "bg-gradient-to-r from-pink-600 to-pink-500 text-white hover:from-pink-700 hover:to-pink-600 hover:shadow-lg hover:scale-105"
                  }`}
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  <FaShoppingBag size={18} />
                  {isLoading ? "Processing..." : "Place Order"}
                </button>

                {isLoading && <Loader />}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
