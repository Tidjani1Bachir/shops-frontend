import { useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";

import { FaPlus, FaEdit, FaTrash, FaTag } from "react-icons/fa";
import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name?.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      setName("");
      toast.success(`${result.name} is created.`);
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Creating category failed, try again.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName?.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap();

      toast.success(`${result.name} is updated`);
      setSelectedCategory(null);
      setUpdatingName("");
      setModalVisible(false);
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Update failed.");
    }
  };

  // ✅ FIXED: Use selectedCategory safely + improved error handling
const handleDeleteCategory = async () => {
  // Guard against null/undefined selectedCategory
  if (!selectedCategory?._id) {
    toast.error("No category selected for deletion");
    return;
  }

  try {
    // ✅ Removed unused 'result' variable
    await deleteCategory(selectedCategory._id).unwrap();

    toast.success(`"${selectedCategory.name}" is deleted.`);
    
    setSelectedCategory(null);
    setModalVisible(false);
  } catch (error) {
    console.error("Delete error:", error);
    const message = error?.data?.message || "Category deletion failed. Try again.";
    toast.error(message);
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
              <FaTag className="text-pink-500" size={32} />
              <h1 className="text-3xl lg:text-4xl font-bold text-white">
                Manage Categories
              </h1>
            </div>
            <p className="text-gray-400 text-lg">
              Total: <span className="text-pink-400 font-semibold">{categories?.length || 0}</span> categories
            </p>
          </div>

          {/* Create Category Section */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg p-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FaPlus className="text-pink-500" size={24} />
              Create New Category
            </h2>
            {/* ✅ Fix 2: Remove outer <form> since CategoryForm has its own */}
            <CategoryForm
              value={name}
              setValue={setName}
              handleSubmit={handleCreateCategory}
            />
          </div>

          {/* Categories Grid */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg p-8">
            <h2 className="text-xl font-bold text-white mb-6">Categories</h2>
            
            {categories && categories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div key={category._id} className="group flex gap-2">
                    <button
                      className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 border-2 border-gray-600 hover:border-pink-500 text-white py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-between"
                      onClick={() => {
                        setModalVisible(true);
                        setSelectedCategory(category);
                        setUpdatingName(category.name);
                      }}
                    >
                      <span className="font-semibold text-lg">{category.name}</span>
                      <FaEdit className="text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" size={18} />
                    </button>
                    {/* ✅ Fix 3: Delete DIRECTLY without setting state first */}
                    <button
                       onClick={async () => {
    try {
      await deleteCategory(category._id).unwrap();
      toast.success(`"${category.name}" deleted successfully.`);
    } catch (error) {
      toast.error(error?.data?.message || "Deletion failed.");
    }
  }}
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
                      title="Delete category"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FaTag className="text-gray-600 mx-auto mb-4" size={48} />
                <p className="text-gray-400 text-lg">No categories found</p>
              </div>
            )}
          </div>

          {/* Update/Delete Modal */}
          <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-6">
                Update Category
              </h3>
              <CategoryForm
                value={updatingName}
                setValue={(value) => setUpdatingName(value)}
                handleSubmit={handleUpdateCategory}
                buttonText="Update"
                handleDelete={handleDeleteCategory}
              />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;