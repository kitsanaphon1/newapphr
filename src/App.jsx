import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

export default function App() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const api = 'http://localhost:5003/api/user';

  const fetchUsers = async () => {
    const res = await axios.get(api);
    setUsers(res.data);
  };

  const createUser = async () => {
    if (!username || !email) return alert('Please fill in both fields');
    await axios.post(api, { username, email });
    setUsername('');
    setEmail('');
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`${api}/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-teal-200 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 flex items-center gap-2">
            <span>👥</span> User List
          </h1>
          <div className="flex items-center gap-2">
            <img src="https://img.icons8.com/ios-filled/50/000000/company.png" alt="logo" className="w-8 h-8" />
            <span className="font-bold text-lg text-gray-700">CHOL COMPANY</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 p-3 rounded shadow-sm focus:ring focus:ring-blue-200"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-3 rounded shadow-sm focus:ring focus:ring-blue-200"
          />
          <button
            onClick={createUser}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-md"
          >
            ➕ Add
          </button>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-6 py-3">Username</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b hover:bg-blue-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{user.username}</td>
                  <td className="px-6 py-4 text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
