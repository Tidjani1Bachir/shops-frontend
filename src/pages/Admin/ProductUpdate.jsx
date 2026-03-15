import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { FaBox, FaImage, FaUpload, FaTags, FaTrash, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";

const AdminProductUpdate = () => {
  const params = useParams();

  const { data: productData } = useGetProductByIdQuery(params._id);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock);

  // hook
  const navigate = useNavigate();

  // Fetch categories using RTK Query
  const { data: categories = [] } = useFetchCategoriesQuery();

  const [uploadProductImage] = useUploadProductImageMutation();

  // Define the update product mutation
  const [updateProduct] = useUpdateProductMutation();

  // Define the delete product mutation
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully");
      setImage(res.image);
    } catch (err) {
      toast.error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      // Update product using the RTK Query mutation
      const data = await updateProduct({ productId: params._id, formData });

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("Product successfully updated");
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      console.log(err);
      toast.error("Product update failed. Try again.");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`"${data.name}" has been deleted`);
      navigate("/admin/allproductslist");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.");
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
                Update Product
              </h1>
            </div>
            <p className="text-gray-400 text-lg">Edit or delete product information</p>
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
              {image && (
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    <img
                      src={image}
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
                  <span className="text-white font-semibold">Click to upload new image</span>
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
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              {/* Quantity and Brand Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Brand
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
                    placeholder="Enter brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
              </div>

              {/* Stock and Category Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Stock Count
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
                    placeholder="Enter stock count"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                    <FaTags className="text-pink-400" size={16} />
                    Category
                  </label>
                  <select
                    className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
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
                  Description
                </label>
                <textarea
                  className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors resize-none"
                  placeholder="Enter product description"
                  rows="6"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                >
                  <FaSave size={20} />
                  Update Product
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                >
                  <FaTrash size={20} />
                  Delete Product
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductUpdate;
