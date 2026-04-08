import { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// These stay eager — they're needed immediately
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./pages/Admin/AdminRoute";
import Home from "./pages/Home.jsx";

// ✅ Lazy load everything else
const Login           = lazy(() => import("./pages/Auth/Login"));
const Register        = lazy(() => import("./pages/Auth/Register"));
const Profile         = lazy(() => import("./pages/User/Profile"));
const UserList        = lazy(() => import("./pages/Admin/UserList"));
const CategoryList    = lazy(() => import("./pages/Admin/CategoryList"));
const ProductList     = lazy(() => import("./pages/Admin/ProductList"));
const AllProducts     = lazy(() => import("./pages/Admin/AllProducts"));
const ProductUpdate   = lazy(() => import("./pages/Admin/ProductUpdate"));
const Favorites       = lazy(() => import("./pages/Products/Favorites.jsx"));
const ProductDetails  = lazy(() => import("./pages/Products/ProductDetails.jsx"));
const Cart            = lazy(() => import("./pages/Cart.jsx"));
const Shop            = lazy(() => import("./pages/Shop.jsx"));
const Shipping        = lazy(() => import("./pages/Orders/Shipping.jsx"));
const PlaceOrder      = lazy(() => import("./pages/Orders/PlaceOrder.jsx"));
const Order           = lazy(() => import("./pages/Orders/Order.jsx"));
const OrderList       = lazy(() => import("./pages/Admin/OrderList.jsx"));
const AdminDashboard  = lazy(() => import("./pages/Admin/AdminDashboard.jsx"));

// Loading fallback — replace with your spinner/skeleton
const PageLoader = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <span>Loading...</span>
  </div>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login"    element={<Suspense fallback={<PageLoader />}><Login /></Suspense>} />
      <Route path="/register" element={<Suspense fallback={<PageLoader />}><Register /></Suspense>} />
      <Route index={true} path="/" element={<Home />} />
      <Route path="/favorite"     element={<Suspense fallback={<PageLoader />}><Favorites /></Suspense>} />
      <Route path="/product/:id"  element={<Suspense fallback={<PageLoader />}><ProductDetails /></Suspense>} />
      <Route path="/cart"         element={<Suspense fallback={<PageLoader />}><Cart /></Suspense>} />
      <Route path="/shop"         element={<Suspense fallback={<PageLoader />}><Shop /></Suspense>} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile"    element={<Suspense fallback={<PageLoader />}><Profile /></Suspense>} />
        <Route path="/shipping"   element={<Suspense fallback={<PageLoader />}><Shipping /></Suspense>} />
        <Route path="/placeorder" element={<Suspense fallback={<PageLoader />}><PlaceOrder /></Suspense>} />
        <Route path="/order/:id"  element={<Suspense fallback={<PageLoader />}><Order /></Suspense>} />
      </Route>

      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist"               element={<Suspense fallback={<PageLoader />}><UserList /></Suspense>} />
        <Route path="categorylist"           element={<Suspense fallback={<PageLoader />}><CategoryList /></Suspense>} />
        <Route path="productlist"            element={<Suspense fallback={<PageLoader />}><ProductList /></Suspense>} />
        <Route path="allproductslist"        element={<Suspense fallback={<PageLoader />}><AllProducts /></Suspense>} />
        <Route path="productlist/:pageNumber" element={<Suspense fallback={<PageLoader />}><ProductList /></Suspense>} />
        <Route path="product/update/:_id"   element={<Suspense fallback={<PageLoader />}><ProductUpdate /></Suspense>} />
        <Route path="orderlist"             element={<Suspense fallback={<PageLoader />}><OrderList /></Suspense>} />
        <Route path="dashboard"             element={<Suspense fallback={<PageLoader />}><AdminDashboard /></Suspense>} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);