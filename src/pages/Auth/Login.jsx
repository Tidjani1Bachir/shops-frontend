import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaSignInAlt, FaArrowRight } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-8 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Form Section */}
          <div className="flex flex-col justify-center">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-5xl font-bold text-white mb-2 flex items-center gap-3">
                <FaSignInAlt className="text-pink-400" />
                Welcome Back
              </h1>
              <p className="text-gray-400 text-lg">
                Sign in to your account to continue shopping
              </p>
            </div>

            {/* Form Card */}
            <form onSubmit={submitHandler} className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-8 mb-6">
              {/* Email Field */}
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-white font-semibold mb-3 flex items-center gap-2"
                >
                  <FaEnvelope className="text-pink-400" />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-pink-500 focus:outline-none transition-colors duration-300 placeholder-gray-500"
                  placeholder="Enter your email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Field */}
              <div className="mb-8">
                <label
                  htmlFor="password"
                  className="block text-white font-semibold mb-3 flex items-center gap-2"
                >
                  <FaLock className="text-pink-400" />
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-pink-500 focus:outline-none transition-colors duration-300 placeholder-gray-500"
                  placeholder="Enter your password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Sign In Button */}
              <button
                disabled={isLoading}
                type="submit"
                className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition-all duration-300 transform flex items-center justify-center gap-2 ${
                  isLoading
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed opacity-50"
                    : "bg-gradient-to-r from-pink-600 to-pink-500 text-white hover:from-pink-700 hover:to-pink-600 hover:shadow-lg hover:scale-105"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin">
                      <FaSignInAlt />
                    </div>
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <FaArrowRight size={18} />
                  </>
                )}
              </button>

              {isLoading && <Loader />}
            </form>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-gray-400">
                New Customer?{" "}
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                  className="text-pink-400 hover:text-pink-300 font-semibold transition-colors duration-300 inline-flex items-center gap-1 group"
                >
                  Create Account
                  <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
                alt="Shopping"
                className="h-96 w-full object-cover rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;