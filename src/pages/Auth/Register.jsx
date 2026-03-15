import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaUser, FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

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

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* Form Section */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent mb-2">
                Create Account
              </h1>
              <p className="text-gray-400 text-sm">Join our community today</p>
            </div>

            <form onSubmit={submitHandler} className="space-y-6">
              {/* Username Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                  <FaUser className="text-pink-400" size={16} />
                  Username
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                  <FaEnvelope className="text-pink-400" size={16} />
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                  <FaLock className="text-pink-400" size={16} />
                  Password
                </label>
                <input
                  type="password"
                  className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                  <FaLock className="text-pink-400" size={16} />
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {/* Register Button */}
              <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin">
                      <FaUser size={18} />
                    </div>
                    Registering...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              {isLoading && <Loader />}
            </form>

            {/* Login Link */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-gray-400 text-center">
                Already have an account?{" "}
                <Link
                  to={redirect ? `/login?redirect=${redirect}` : "/login"}
                  className="inline-flex items-center gap-1 text-pink-400 hover:text-pink-300 font-semibold transition-colors group"
                >
                  Login
                  <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" />
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="relative w-full h-96 lg:h-full rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
              alt="Register banner"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-purple-600/20 hover:from-pink-600/30 hover:to-purple-600/30 transition-colors duration-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
