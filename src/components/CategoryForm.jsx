import { FaTag, FaSave, FaTrash } from "react-icons/fa";

const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
      {/* Form Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-700">
        <div className="p-2 bg-pink-500/20 rounded-lg">
          <FaTag className="text-pink-500 text-lg" />
        </div>
        <h3 className="text-lg font-semibold text-white">Add Category</h3>
      </div>

      {/* Input Field */}
      <div className="space-y-4">
        <input
          type="text"
          className="w-full bg-gray-700 border border-gray-600 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-white px-4 py-3 rounded-lg placeholder-gray-400 transition-colors duration-300"
          placeholder="Enter category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit" // ← Still works! Parent form handles submission
            className="flex-1 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            onClick={handleSubmit} // Optional: add explicit handler
          >
            <FaSave className="text-sm" />
            {buttonText}
          </button>

          {handleDelete && (
            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaTrash className="text-sm" />
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;