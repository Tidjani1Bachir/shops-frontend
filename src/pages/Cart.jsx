import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (userInfo) {
      navigate("/shipping");
    } else {
      navigate("/login?redirect=/shipping");
    }
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-500 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <FaShoppingCart className="text-4xl text-white" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">Shopping Cart</h1>
          </div>
          <p className="text-pink-100 mt-2">Review and manage your items</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-center">
              <FaShoppingCart className="text-7xl text-gray-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-2">Your cart is empty</h2>
              <p className="text-gray-400 text-lg mb-8">
                Looks like you haven&apos;t added any items yet. Let&apos;s fix that!
              </p>
              <Link
                to="/shop"
                className="inline-block bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-pink-600 to-pink-500 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">
                    {totalItems} {totalItems === 1 ? "Item" : "Items"}
                  </h2>
                </div>

                {/* Items List */}
                <div className="divide-y divide-gray-700">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="p-6 hover:bg-gray-750 transition-colors duration-200"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-24 h-24 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg shadow-md"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <Link
                            to={`/product/${item._id}`}
                            className="text-lg font-semibold text-pink-500 hover:text-pink-400 transition-colors"
                          >
                            {item.name}
                          </Link>
                          <p className="text-gray-400 text-sm mt-1">{item.brand}</p>
                          <p className="text-2xl font-bold text-white mt-2">
                            ${item.price}
                          </p>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex flex-col items-end gap-4">
                          <select
                            className="px-3 py-1 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all cursor-pointer"
                            value={item.qty}
                            onChange={(e) =>
                              addToCartHandler(item, Number(e.target.value))
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                Qty: {x + 1}
                              </option>
                            ))}
                          </select>

                          <button
                            className="text-red-500 hover:text-red-600 transition-colors p-2 hover:bg-red-500 hover:bg-opacity-20 rounded-lg"
                            onClick={() => removeFromCartHandler(item._id)}
                            title="Remove from cart"
                          >
                            <FaTrash className="text-xl" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Continue Shopping Link */}
                <div className="bg-gray-750 px-6 py-4 border-t border-gray-700">
                  <Link
                    to="/shop"
                    className="text-pink-500 hover:text-pink-400 transition-colors font-semibold"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 sticky top-24">
                <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>

                {/* Breakdown */}
                <div className="space-y-4 mb-6 pb-6 border-b border-gray-700">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-semibold">${totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-400">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax (estimated)</span>
                    <span className="font-semibold">Calculated at checkout</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-bold text-white">Total</span>
                  <span className="text-3xl font-bold text-pink-500">
                    ${totalPrice}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </button>

                {/* Additional Info */}
                <p className="text-gray-400 text-xs mt-4 text-center">
                  Secure checkout powered by our payment system
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
