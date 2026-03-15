import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div
        style={{ zIndex: 9999 }}
        className={`${
          showSidebar ? "hidden" : "flex"
        } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700 w-[4%] hover:w-[16%] h-[100vh] fixed transition-all duration-300 ease-in-out`}
        id="navigation-container"
      >
      <div className="flex flex-col justify-center space-y-2 mt-8">
        <Link
          to="/"
          className="nav-item flex items-center px-4 py-3 rounded-lg transition-all duration-300 hover:bg-pink-600/20 hover:border-pink-500 group border border-transparent"
        >
          <AiOutlineHome className="text-pink-400 group-hover:text-pink-300" size={26} />
          <span className="hidden nav-item-name ml-4 font-semibold text-white group-hover:text-pink-300 transition-colors">HOME</span>
        </Link>

        <Link
          to="/shop"
          className="nav-item flex items-center px-4 py-3 rounded-lg transition-all duration-300 hover:bg-pink-600/20 hover:border-pink-500 group border border-transparent"
        >
          <AiOutlineShopping className="text-pink-400 group-hover:text-pink-300" size={26} />
          <span className="hidden nav-item-name ml-4 font-semibold text-white group-hover:text-pink-300 transition-colors">SHOP</span>
        </Link>

        <Link to="/cart" className="nav-item flex relative px-4 py-3 rounded-lg transition-all duration-300 hover:bg-pink-600/20 hover:border-pink-500 group border border-transparent">
          <div className="flex items-center">
            <AiOutlineShoppingCart className="text-pink-400 group-hover:text-pink-300" size={26} />
            <span className="hidden nav-item-name ml-4 font-semibold text-white group-hover:text-pink-300 transition-colors">CART</span>
          </div>

          <div className="absolute left-8 -top-2">
            {cartItems.length > 0 && (
              <span className="px-2 py-0.5 text-xs text-white bg-gradient-to-r from-pink-600 to-pink-500 rounded-full font-bold shadow-lg">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </div>
        </Link>

        <Link to="/favorite" className="nav-item flex relative px-4 py-3 rounded-lg transition-all duration-300 hover:bg-pink-600/20 hover:border-pink-500 group border border-transparent">
          <div className="flex items-center">
            <FaHeart className="text-pink-400 group-hover:text-pink-300" size={20} />
            <span className="hidden nav-item-name ml-4 font-semibold text-white group-hover:text-pink-300 transition-colors">
              FAVORITES
            </span>
            <FavoritesCount />
          </div>
        </Link>
      </div>

      <div className="relative">
        {userInfo ? (
          <>
            <button
              onClick={toggleDropdown}
              className="nav-item flex items-center px-4 py-3 rounded-lg transition-all duration-300 hover:bg-pink-600/20 hover:border-pink-500 group border border-transparent w-full justify-center hover:justify-start"
            >
              <span className="hidden nav-item-name text-white font-semibold group-hover:text-pink-300 transition-colors">
                {userInfo.username}
              </span>
              <FaChevronDown className={`text-pink-400 group-hover:text-pink-300 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <ul className={`absolute bottom-0 left-0 mb-20 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-xl space-y-0 overflow-hidden`}>
                {userInfo.isAdmin && (
                  <>
                    <li>
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-3 hover:bg-pink-600/20 border-b border-gray-700 text-gray-300 hover:text-pink-400 transition-colors text-sm"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/productlist"
                        className="block px-4 py-3 hover:bg-pink-600/20 border-b border-gray-700 text-gray-300 hover:text-pink-400 transition-colors text-sm"
                      >
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/categorylist"
                        className="block px-4 py-3 hover:bg-pink-600/20 border-b border-gray-700 text-gray-300 hover:text-pink-400 transition-colors text-sm"
                      >
                        Category
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/orderlist"
                        className="block px-4 py-3 hover:bg-pink-600/20 border-b border-gray-700 text-gray-300 hover:text-pink-400 transition-colors text-sm"
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/userlist"
                        className="block px-4 py-3 hover:bg-pink-600/20 border-b border-gray-700 text-gray-300 hover:text-pink-400 transition-colors text-sm"
                      >
                        Users
                      </Link>
                    </li>
                  </>
                )}

                <li>
                  <Link to="/profile" className="block px-4 py-3 hover:bg-pink-600/20 border-b border-gray-700 text-gray-300 hover:text-pink-400 transition-colors text-sm">
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logoutHandler}
                    className="block w-full px-4 py-3 text-left hover:bg-pink-600/20 text-gray-300 hover:text-pink-400 transition-colors text-sm"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </>
        ) : (
          <div className="space-y-2">
            <Link
              to="/login"
              className="nav-item flex items-center px-4 py-3 rounded-lg transition-all duration-300 hover:bg-pink-600/20 hover:border-pink-500 group border border-transparent"
            >
              <AiOutlineLogin className="text-pink-400 group-hover:text-pink-300" size={26} />
              <span className="hidden nav-item-name ml-4 font-semibold text-white group-hover:text-pink-300 transition-colors">LOGIN</span>
            </Link>
            <Link
              to="/register"
              className="nav-item flex items-center px-4 py-3 rounded-lg transition-all duration-300 hover:bg-pink-600/20 hover:border-pink-500 group border border-transparent"
            >
              <AiOutlineUserAdd className="text-pink-400 group-hover:text-pink-300" size={26} />
              <span className="hidden nav-item-name ml-4 font-semibold text-white group-hover:text-pink-300 transition-colors">REGISTER</span>
            </Link>
          </div>
        )}
      </div>
    </div>

    {/* Mobile Navigation */}
    <nav className="xl:hidden lg:hidden md:block sm:block fixed top-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 px-4 h-16 md:h-20 flex items-center justify-between z-[9999]">
      {/* Logo/Brand */}
      <Link to="/" className="text-pink-400 font-bold text-lg hover:text-pink-300 transition-colors">
        Store
      </Link>

      {/* Navigation Items */}
      <div className="flex items-center gap-4">
        {/* Cart */}
        <Link to="/cart" className="relative group">
          <AiOutlineShoppingCart className="text-pink-400 group-hover:text-pink-300 transition-colors" size={24} />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-3 px-2 py-0.5 text-xs text-white bg-gradient-to-r from-pink-600 to-pink-500 rounded-full font-bold">
              {cartItems.reduce((a, c) => a + c.qty, 0)}
            </span>
          )}
        </Link>

        {/* Favorites */}
        <Link to="/favorite" className="relative">
          <FaHeart className="text-pink-400 hover:text-pink-300 transition-colors" size={20} />
          <FavoritesCount />
        </Link>

        {/* Menu Toggle */}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="text-pink-400 hover:text-pink-300 transition-colors"
        >
          {showSidebar ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {showSidebar && (
        <div className="absolute top-16 md:top-20 left-0 right-0 bg-gray-800 border-t border-gray-700 max-h-96 overflow-y-auto">
          <div className="flex flex-col py-4">
            {/* Navigation Links */}
            <Link
              to="/"
              onClick={() => setShowSidebar(false)}
              className="px-6 py-3 hover:bg-pink-600/20 border-b border-gray-700 hover:text-pink-400 transition-colors flex items-center gap-3"
            >
              <AiOutlineHome size={20} />
              Home
            </Link>
            <Link
              to="/shop"
              onClick={() => setShowSidebar(false)}
              className="px-6 py-3 hover:bg-pink-600/20 border-b border-gray-700 hover:text-pink-400 transition-colors flex items-center gap-3"
            >
              <AiOutlineShopping size={20} />
              Shop
            </Link>

            {/* User Menu */}
            {userInfo ? (
              <>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full px-6 py-3 hover:bg-pink-600/20 border-b border-gray-700 hover:text-pink-400 transition-colors flex items-center gap-3 justify-between text-left"
                >
                  <span>{userInfo.username}</span>
                  <FaChevronDown className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {dropdownOpen && (
                  <>
                    {userInfo.isAdmin && (
                      <>
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setShowSidebar(false)}
                          className="px-8 py-2 hover:bg-pink-600/20 border-b border-gray-700 hover:text-pink-400 transition-colors text-sm"
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/admin/productlist"
                          onClick={() => setShowSidebar(false)}
                          className="px-8 py-2 hover:bg-pink-600/20 border-b border-gray-700 hover:text-pink-400 transition-colors text-sm"
                        >
                          Products
                        </Link>
                        <Link
                          to="/admin/categorylist"
                          onClick={() => setShowSidebar(false)}
                          className="px-8 py-2 hover:bg-pink-600/20 border-b border-gray-700 hover:text-pink-400 transition-colors text-sm"
                        >
                          Category
                        </Link>
                        <Link
                          to="/admin/orderlist"
                          onClick={() => setShowSidebar(false)}
                          className="px-8 py-2 hover:bg-pink-600/20 border-b border-gray-700 hover:text-pink-400 transition-colors text-sm"
                        >
                          Orders
                        </Link>
                        <Link
                          to="/admin/userlist"
                          onClick={() => setShowSidebar(false)}
                          className="px-8 py-2 hover:bg-pink-600/20 border-b border-gray-700 hover:text-pink-400 transition-colors text-sm"
                        >
                          Users
                        </Link>
                      </>
                    )}

                    <Link
                      to="/profile"
                      onClick={() => setShowSidebar(false)}
                      className="px-8 py-2 hover:bg-pink-600/20 border-b border-gray-700 hover:text-pink-400 transition-colors text-sm"
                    >
                      Profile
                    </Link>
                  </>
                )}

                <button
                  onClick={() => {
                    logoutHandler();
                    setShowSidebar(false);
                  }}
                  className="w-full px-6 py-3 hover:bg-pink-600/20 border-b border-gray-700 hover:text-pink-400 transition-colors text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setShowSidebar(false)}
                  className="px-6 py-3 hover:bg-pink-600/20 border-b border-gray-700 hover:text-pink-400 transition-colors flex items-center gap-3"
                >
                  <AiOutlineLogin size={20} />
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setShowSidebar(false)}
                  className="px-6 py-3 hover:bg-pink-600/20 border-b border-gray-700 hover:text-pink-400 transition-colors flex items-center gap-3"
                >
                  <AiOutlineUserAdd size={20} />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>

    {/* Spacer for mobile navigation */}
    <div className="xl:hidden lg:hidden md:block sm:block h-16 md:h-20"></div>
    </>
  );
};

export default Navigation;
