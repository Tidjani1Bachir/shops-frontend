import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";
import {
  FaMapMarkerAlt,
  FaCity,
  FaMailchimp,
  FaGlobe,
  FaCreditCard,
  FaArrowRight,
} from "react-icons/fa";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  // Payment
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-8 px-4 lg:px-8">
      <ProgressSteps step1 step2 />
      
      <div className="container mx-auto mt-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Shipping Address</h1>
            <p className="text-gray-400">
              Please provide your delivery details below
            </p>
          </div>

          {/* Form Container */}
          <form onSubmit={submitHandler} className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-8">
            {/* Address Field */}
            <div className="mb-6">
              <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                <FaMapMarkerAlt className="text-pink-400" />
                Address
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-pink-500 focus:outline-none transition-colors duration-300 placeholder-gray-500"
                placeholder="Enter your street address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            {/* City Field */}
            <div className="mb-6">
              <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                <FaCity className="text-pink-400" />
                City
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-pink-500 focus:outline-none transition-colors duration-300 placeholder-gray-500"
                placeholder="Enter your city"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            {/* Postal Code and Country Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Postal Code */}
              <div>
                <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                  <FaMailchimp className="text-pink-400" />
                  Postal Code
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-pink-500 focus:outline-none transition-colors duration-300 placeholder-gray-500"
                  placeholder="Enter postal code"
                  value={postalCode}
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                  <FaGlobe className="text-pink-400" />
                  Country
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-pink-500 focus:outline-none transition-colors duration-300 placeholder-gray-500"
                  placeholder="Enter country"
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700 my-8"></div>

            {/* Payment Method Section */}
            <div className="mb-8">
              <label className="block text-white font-semibold mb-4 flex items-center gap-2">
                <FaCreditCard className="text-pink-400" />
                Payment Method
              </label>

              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-pink-500 transition-colors duration-300 cursor-pointer">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    className="w-5 h-5 text-pink-500 accent-pink-500 cursor-pointer"
                    name="paymentMethod"
                    value="PayPal"
                    checked={paymentMethod === "PayPal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="ml-3 text-white font-semibold flex items-center gap-2">
                    PayPal or Credit Card
                    <span className="text-xs bg-pink-500/20 text-pink-300 px-2 py-1 rounded-full">Recommended</span>
                  </span>
                </label>
                <p className="text-gray-400 text-sm mt-2 ml-8">
                  Secure payment with PayPal or major credit cards
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2 mt-6"
              type="submit"
            >
              Continue to Review
              <FaArrowRight size={18} />
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
            <p className="text-blue-200 text-sm">
              💡 <strong>Tip:</strong> Make sure to double-check your address information to avoid delivery delays.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
