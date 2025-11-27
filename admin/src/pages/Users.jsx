import React, { useState, useEffect } from "react";
import {
  Users as UsersIcon,
  Search,
  Filter,
  Mail,
  Phone,
  Calendar,
  Eye,
  UserX,
  X,
} from "lucide-react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      // Set empty array if API fails
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleDeactivateUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to deactivate ${userName}?`)) {
      try {
        await axios.patch(`/admin/users/${userId}/deactivate`);
        fetchUsers(); // Refresh the users list
        alert("User deactivated successfully");
      } catch (error) {
        console.error("Error deactivating user:", error);
        alert("Error deactivating user");
      }
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "therapist":
        return "bg-blue-100 text-blue-800";
      case "client":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const userStats = {
    total: users.length,
    clients: users.filter((u) => u.role === "client").length,
    therapists: users.filter((u) => u.role === "therapist").length,
    admins: users.filter((u) => u.role === "admin").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Export Users
          </button>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <UsersIcon className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">
                {userStats.total}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <UsersIcon className="h-8 w-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Clients</p>
              <p className="text-2xl font-semibold text-gray-900">
                {userStats.clients}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <UsersIcon className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Therapists</p>
              <p className="text-2xl font-semibold text-gray-900">
                {userStats.therapists}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <UsersIcon className="h-8 w-8 text-red-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Admins</p>
              <p className="text-2xl font-semibold text-gray-900">
                {userStats.admins}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="client">Clients</option>
              <option value="therapist">Therapists</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-gray-200 p-2 rounded-full mr-3">
                        <UsersIcon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {user._id.slice(-6)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {user.email}
                    </div>
                    {user.phone && (
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        {user.phone}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {new Date(
                        user.createdAt || user.created_at || Date.now()
                      ).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Eye
                        className="h-4 w-4 inline mr-1"
                        onClick={() => handleViewDetails(user)}
                      />
                      <span onClick={() => handleViewDetails(user)}>
                        View Details
                      </span>
                    </button>
                    {user.role !== "admin" && (
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() =>
                          handleDeactivateUser(user._id, user.name)
                        }
                      >
                        <UserX className="h-4 w-4 inline mr-1" />
                        {user.status === "active" ? "Deactivate" : "Activate"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No users found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            No users match your current filters.
          </p>
        </div>
      )}

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                User Details
              </h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-gray-200 p-3 rounded-full mr-4">
                  <UsersIcon className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {selectedUser.name}
                  </h4>
                  <p
                    className={`text-sm px-2 py-1 rounded-full inline-block ${getRoleColor(
                      selectedUser.role
                    )}`}
                  >
                    {selectedUser.role}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Email:
                  </label>
                  <p className="text-gray-900">{selectedUser.email}</p>
                </div>

                {selectedUser.phone && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Phone:
                    </label>
                    <p className="text-gray-900">{selectedUser.phone}</p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    User ID:
                  </label>
                  <p className="text-gray-900 font-mono text-sm">
                    {selectedUser._id}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Joined:
                  </label>
                  <p className="text-gray-900">
                    {new Date(
                      selectedUser.createdAt ||
                        selectedUser.created_at ||
                        Date.now()
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Status:
                  </label>
                  <p
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      selectedUser.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedUser.status || "Active"}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4 flex justify-end space-x-3">
                {selectedUser.role !== "admin" && (
                  <button
                    onClick={() => {
                      handleDeactivateUser(selectedUser._id, selectedUser.name);
                      setShowUserModal(false);
                    }}
                    className={`px-4 py-2 rounded-md text-white ${
                      selectedUser.status === "active"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {selectedUser.status === "active"
                      ? "Deactivate User"
                      : "Activate User"}
                  </button>
                )}
                <button
                  onClick={() => setShowUserModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
