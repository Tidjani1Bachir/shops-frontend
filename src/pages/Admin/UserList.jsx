import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaUser, FaEnvelope, FaShieldAlt, FaSave, FaSpinner } from "react-icons/fa";
import Message from "../../components/Message";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";

// ⚠️⚠️⚠️ don't forget this ⚠️⚠️⚠️⚠️
import AdminMenu from "./AdminMenu";


const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-6">
      <AdminMenu />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FaUser className="text-pink-500 text-3xl" />
            <h1 className="text-4xl font-bold text-white">Users Management</h1>
          </div>
          <p className="text-gray-400">Manage and monitor all platform users</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <FaSpinner className="text-pink-500 text-4xl animate-spin" />
          </div>
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : users && users.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 hover:scale-105 hover:shadow-2xl hover:border-pink-500 transition-all duration-300"
              >
                {/* User Card Header */}
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-700">
                  <div className="p-3 bg-pink-500/20 rounded-full">
                    <FaUser className="text-pink-500 text-2xl" />
                  </div>
                  <div className="flex-1">
                    {editableUserId === user._id ? (
                      <input
                        type="text"
                        value={editableUserName}
                        onChange={(e) => setEditableUserName(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-white px-3 py-2 rounded-lg text-sm font-semibold"
                      />
                    ) : (
                      <h3 className="font-semibold text-white text-lg">{user.username}</h3>
                    )}
                  </div>
                </div>

                {/* User Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-gray-400 text-sm" />
                    {editableUserId === user._id ? (
                      <input
                        type="email"
                        value={editableUserEmail}
                        onChange={(e) => setEditableUserEmail(e.target.value)}
                        className="flex-1 bg-gray-700 border border-gray-600 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-white px-3 py-2 rounded text-sm"
                      />
                    ) : (
                      <a
                        href={`mailto:${user.email}`}
                        className="text-gray-300 hover:text-pink-400 transition-colors text-sm"
                      >
                        {user.email}
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <FaShieldAlt className={`text-sm ${user.isAdmin ? "text-green-400" : "text-gray-400"}`} />
                    <span className={`text-sm font-medium ${user.isAdmin ? "text-green-400" : "text-gray-400"}`}>
                      {user.isAdmin ? "Admin" : "User"}
                    </span>
                  </div>

                  {/* User ID */}
                  <div className="text-xs text-gray-500 bg-gray-700/50 px-3 py-1.5 rounded-md font-mono">
                    ID: {user._id}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-gray-700">
                  {editableUserId === user._id ? (
                    <>
                      <button
                        onClick={() => updateHandler(user._id)}
                        className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <FaSave className="text-sm" />
                        Save
                      </button>
                      <button
                        onClick={() => setEditableUserId(null)}
                        className="flex-1 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleEdit(user._id, user.username, user.email)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <FaEdit className="text-sm" />
                        Edit
                      </button>
                      {!user.isAdmin && (
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <FaTrash className="text-sm" />
                          Delete
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-700">
            <FaUser className="text-gray-600 text-4xl mb-4" />
            <p className="text-gray-400 text-lg">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default UserList;
