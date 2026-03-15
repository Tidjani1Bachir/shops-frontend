import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaLock, FaShoppingBag } from "react-icons/fa";
import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-500 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <FaUser className="text-4xl text-white" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">My Profile</h1>
          </div>
          <p className="text-pink-100 mt-2">Manage your account information</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Update Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                <FaUser className="text-pink-500" />
                Update Profile
              </h2>

              <form onSubmit={submitHandler} className="space-y-6">
                {/* Username Field */}
                <div>
                  <label className="block text-white font-semibold mb-3">
                    Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-3.5 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-white font-semibold mb-3">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-3.5 text-gray-500" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-white font-semibold mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-3.5 text-gray-500" />
                    <input
                      type="password"
                      placeholder="Enter new password (leave blank to keep current)"
                      className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="block text-white font-semibold mb-3">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-3.5 text-gray-500" />
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loadingUpdateProfile}
                  className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loadingUpdateProfile ? "Updating..." : "Update Profile"}
                </button>

                {loadingUpdateProfile && <Loader />}
              </form>
            </div>
          </div>

          {/* Quick Actions & Info Card */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Info Card */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-8">
              <h3 className="text-xl font-bold text-white mb-6">
                Account Information
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">Username</p>
                  <p className="text-white font-semibold text-lg">{userInfo.username}</p>
                </div>
                <div className="pt-4 border-t border-gray-700">
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white font-semibold break-all">{userInfo.email}</p>
                </div>
                {userInfo.isAdmin && (
                  <div className="pt-4 border-t border-gray-700 bg-pink-500 bg-opacity-20 rounded-lg p-3">
                    <p className="text-pink-400 font-semibold">✓ Admin Account</p>
                  </div>
                )}
              </div>
            </div>

            {/* My Orders Card */}
            <Link
              to="/user-orders"
              className="block bg-gradient-to-br from-pink-600 to-pink-500 rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <FaShoppingBag className="text-4xl text-white" />
                <div>
                  <h3 className="text-xl font-bold text-white">My Orders</h3>
                  <p className="text-pink-100">View your order history</p>
                </div>
              </div>
            </Link>

            {/* Security Notice */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
              <h4 className="text-white font-semibold mb-3">Security Tips</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Use a strong password</li>
                <li>• Never share your password</li>
                <li>• Update password regularly</li>
                <li>• Keep email address updated</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
