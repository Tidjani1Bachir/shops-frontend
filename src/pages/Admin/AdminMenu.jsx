import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes, FaBars, FaChartLine, FaTag, FaBox, FaUsers, FaClipboardList } from "react-icons/fa";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    {
      label: "Admin Dashboard",
      path: "/admin/dashboard",
      icon: FaChartLine,
    },
    {
      label: "Create Category",
      path: "/admin/categorylist",
      icon: FaTag,
    },
    {
      label: "Create Product",
      path: "/admin/productlist",
      icon: FaBox,
    },
    {
      label: "All Products",
      path: "/admin/allproductslist",
      icon: FaBox,
    },
    {
      label: "Manage Users",
      path: "/admin/userlist",
      icon: FaUsers,
    },
    {
      label: "Manage Orders",
      path: "/admin/orderlist",
      icon: FaClipboardList,
    },
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleMenu}
        className={`fixed top-5 right-7 z-50 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white p-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-110 ${
          isMenuOpen ? "rotate-90" : "rotate-0"
        }`}
      >
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Admin Menu Panel */}
      {isMenuOpen && (
        <section className="fixed right-7 top-20 bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 rounded-lg shadow-2xl z-40 w-72 max-h-96 overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-600 to-pink-500 px-6 py-4 sticky top-0 z-50">
            <h2 className="text-white font-bold text-lg">Admin Panel</h2>
            <p className="text-pink-100 text-xs mt-1">Manage your store</p>
          </div>

          {/* Menu Items */}
          <ul className="list-none py-4 space-y-2 px-4">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-300 group ${
                        isActive
                          ? "bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-lg"
                          : "text-gray-300 hover:bg-gray-700 hover:text-pink-400"
                      }`
                    }
                  >
                    <Icon className="text-lg flex-shrink-0" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* Footer */}
          <div className="border-t border-gray-700 px-4 py-3 mt-4">
            <p className="text-gray-500 text-xs text-center">Click to navigate</p>
          </div>
        </section>
      )}
    </>
  );
};

export default AdminMenu;
