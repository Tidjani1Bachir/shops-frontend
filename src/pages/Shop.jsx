import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import { setCategories, setProducts, setChecked } from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );
  
  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, categoriesQuery.isLoading, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter, filteredProductsQuery.isLoading]);

  const handleBrandClick = (brand) => {
    if (brand === "All Brands") {
      dispatch(setProducts(filteredProductsQuery.data));
    } else {
      const productsByBrand = filteredProductsQuery.data?.filter(
        (product) => product.brand === brand
      );
      dispatch(setProducts(productsByBrand));
    }
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    "All Brands",
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    // Update the price filter state when the user types in the input filed
    setPriceFilter(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-500 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Shop</h1>
          <p className="text-pink-100 mt-2">Discover our complete collection</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Categories Filter */}
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="w-1 h-6 bg-pink-600 rounded mr-3"></span>
                  Categories
                </h3>
                <div className="space-y-3">
                  {categories?.map((c) => (
                    <div key={c._id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`cat-${c._id}`}
                        onChange={(e) => handleCheck(e.target.checked, c._id)}
                        checked={checked.includes(c._id)}
                        className="w-4 h-4 text-pink-600 bg-gray-700 border-gray-600 rounded focus:ring-2 focus:ring-pink-500 cursor-pointer"
                      />
                      <label
                        htmlFor={`cat-${c._id}`}
                        className="ml-3 text-gray-300 hover:text-white transition-colors cursor-pointer text-sm"
                      >
                        {c.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brands Filter */}
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="w-1 h-6 bg-pink-600 rounded mr-3"></span>
                  Brands
                </h3>
                <div className="space-y-3">
                  {uniqueBrands?.map((brand) => (
                    <div key={brand} className="flex items-center">
                      <input
                        type="radio"
                        id={`brand-${brand}`}
                        name="brand"
                        onChange={() => handleBrandClick(brand)}
                        className="w-4 h-4 text-pink-600 bg-gray-700 border-gray-600 focus:ring-2 focus:ring-pink-500 cursor-pointer"
                      />
                      <label
                        htmlFor={`brand-${brand}`}
                        className="ml-3 text-gray-300 hover:text-white transition-colors cursor-pointer text-sm"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="w-1 h-6 bg-pink-600 rounded mr-3"></span>
                  Price
                </h3>
                <input
                  type="text"
                  placeholder="Enter Price"
                  value={priceFilter}
                  onChange={handlePriceChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                />
              </div>

              {/* Reset Button */}
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Products Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-3xl font-bold text-white">
                  {products?.length}
                  <span className="text-pink-500 ml-2">
                    {products?.length === 1 ? "Product" : "Products"}
                  </span>
                </h2>
                <div className="text-gray-400 text-sm">
                  Showing all available products
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="text-center">
                  <p className="text-xl text-gray-400 mb-6">
                    No products found
                  </p>
                  <Loader />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products?.map((p) => (
                  <div
                    key={p._id}
                    className="transform transition-all duration-300 hover:scale-105"
                  >
                    <ProductCard p={p} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
