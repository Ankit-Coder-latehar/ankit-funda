import React, { useState } from 'react';
import { FaTachometerAlt, FaClipboardCheck, FaChartLine, FaProjectDiagram, FaUsers } from 'react-icons/fa';

// Dummy data for users
const initialUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer' },
];

const Sidebar = () => (
  <div className="w-64 bg-gray-800 text-white h-screen flex flex-col">
    <div className="flex-shrink-0 p-4 text-2xl font-bold">LetsGyan</div>
    <nav className="flex-grow">
      <ul className="space-y-2">
        <li>
          <a href="/dashboard" className="flex items-center py-2 px-4 hover:bg-gray-700">
            <FaTachometerAlt className="mr-3" />
            Dashboard
          </a>
        </li>
        <li>
          <a href="/task" className="flex items-center py-2 px-4 hover:bg-gray-700">
            <FaClipboardCheck className="mr-3" />
            Tasks
          </a>
        </li>
        <li>
          <a href="/report" className="flex items-center py-2 px-4 hover:bg-gray-700">
            <FaChartLine className="mr-3" />
            Reports
          </a>
        </li>
        <li>
          <a href="/project" className="flex items-center py-2 px-4 hover:bg-gray-700">
            <FaProjectDiagram className="mr-3" />
            Projects
          </a>
        </li>
        <li>
          <a href="/team" className="flex items-center py-2 px-4 bg-gray-700 rounded-lg ">
            <FaUsers className="mr-3" />
            Users
          </a>
        </li>
      </ul>
    </nav>
  </div>
);

const UserList = () => {
  const [users, setUsers] = useState(initialUsers);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Viewer' });

  // Handle input changes in form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Open modal for adding a new user
  const openAddUserModal = () => {
    setFormData({ name: '', email: '', role: 'Viewer' });
    setEditingUser(null);
    setModalOpen(true);
  };

  // Open modal for editing a user
  const openEditUserModal = (user) => {
    setFormData(user);
    setEditingUser(user);
    setModalOpen(true);
  };

  // Handle adding a new user or updating an existing user
  const handleSubmit = () => {
    if (editingUser) {
      setUsers(
        users.map((user) =>
          user.id === editingUser.id ? { ...user, ...formData } : user
        )
      );
    } else {
      setUsers([...users, { id: users.length + 1, ...formData }]);
    }
    setModalOpen(false);
  };

  // Delete a user
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Main content */}
      <div className="container mx-auto p-8 flex-grow">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">User Management</h1>
          <button
            onClick={openAddUserModal}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Add User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-200">
                  <td className="py-3 px-6 text-left">{user.name}</td>
                  <td className="py-3 px-6 text-left">{user.email}</td>
                  <td className="py-3 px-6 text-left">
                    <span
                      className={`py-1 px-3 rounded-full text-xs font-bold ${
                        user.role === 'Admin'
                          ? 'bg-green-500 text-white'
                          : user.role === 'Editor'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-blue-500 text-white'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-right">
                    <button
                      onClick={() => openEditUserModal(user)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">
                {editingUser ? 'Edit User' : 'Add User'}
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>
              </form>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  {editingUser ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;

