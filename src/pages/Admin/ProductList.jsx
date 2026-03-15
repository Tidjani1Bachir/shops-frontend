import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { FaBox, FaImage, FaUpload, FaTags } from "react-icons/fa";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !quantity || !brand || !stock || !category || !description || !image) {
      toast.error("Please fill in all fields and upload an image");
      return;
    }

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Admin Menu */}
        <div className="lg:w-72">
          <AdminMenu />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <FaBox className="text-pink-500" size={32} />
              <h1 className="text-3xl lg:text-4xl font-bold text-white">
                Create Product
              </h1>
            </div>
            <p className="text-gray-400 text-lg">Add a new product to your store</p>
          </div>

          {/* Form Container */}
          <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg p-8">
            {/* Image Upload Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FaImage className="text-pink-500" size={24} />
                Product Image
              </h2>

              {/* Image Preview */}
              {imageUrl && (
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    <img
                      src={imageUrl}
                      alt="product preview"
                      className="max-h-64 rounded-lg shadow-lg border-2 border-pink-500"
                    />
                  </div>
                </div>
              )}

              {/* File Upload Input */}
              <label className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-gray-700/50 hover:bg-gray-700 hover:border-pink-500 transition-all duration-300">
                <div className="flex flex-col items-center justify-center">
                  <FaUpload className="text-pink-400 mb-2" size={32} />
                  <span className="text-white font-semibold">
                    {image ? image.name : "Click to upload or drag image"}
                  </span>
                  <span className="text-gray-400 text-sm mt-1">PNG, JPG, GIF up to 10MB</span>
                </div>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={uploadFileHandler}
                  className="hidden"
                />
              </label>
            </div>

            {/* Product Details Grid */}
            <div className="space-y-6">
              {/* Name and Price Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Quantity and Brand Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Brand *
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
                    placeholder="Enter brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Stock and Category Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Stock Count *
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
                    placeholder="Enter stock count"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                    <FaTags className="text-pink-400" size={16} />
                    Category *
                  </label>
                  <select
                    className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories?.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors resize-none"
                  placeholder="Enter product description"
                  rows="6"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-bold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mt-8 shadow-lg"
              >
                <FaBox size={20} />
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
