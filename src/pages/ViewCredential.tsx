/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaArrowLeft, FaUserCircle } from "react-icons/fa";
import { getCredential, saveCredential } from "../api/dummyApi";

export default function ViewCredential() {
  const [credentials, setCredentials] = useState<{ apiKey: string; apiSecret: string }[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cred = getCredential("testUser");
    if (cred) {
      setCredentials([{ apiKey: cred.apiKey, apiSecret: cred.apiSecret }]);
    }
  }, []);

  const handleEdit = (index: number) => setEditingIndex(index);

  const handleSave = (index: number) => {
    const updated = [...credentials];
    const record = updated[index];
    saveCredential("testUser", record.apiKey, record.apiSecret); 
    setEditingIndex(null);
  };

  const handleDelete = (_index: number) => {
    setCredentials([]);
    localStorage.removeItem("apiKey");
    localStorage.removeItem("apiSecret");
  };

  const handleChange = (index: number, field: "apiKey" | "apiSecret", value: string) => {
    const updated = [...credentials];
    updated[index][field] = value;
    setCredentials(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-purple-700 text-white p-4 shadow">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">📄 Digital Invoice</h1>
          <nav className="flex gap-4">
            <button onClick={() => navigate("/dashboard")} className="hover:underline">Dashboard</button>
            <button onClick={() => navigate("/settings")} className="hover:underline">Settings</button>
          </nav>
        </div>
        <div>
          <FaUserCircle size={28} className="cursor-pointer" onClick={() => navigate("/")} title="Logout" />
        </div>
      </header>

      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">API Credential Status</h2>
          <button onClick={() => navigate("/dashboard")} className="flex items-center text-indigo-600 hover:underline">
            <FaArrowLeft className="mr-1" /> Back
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[600px] w-full text-sm bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
              <tr>
                <th className="p-3 text-left">API Key</th>
                <th className="p-3 text-left">API Secret</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {credentials.map((cred, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <input
                      className="w-full bg-gray-50 border border-gray-300 p-2 rounded focus:ring-2 focus:ring-purple-500 outline-none"
                      value={cred.apiKey}
                      onChange={(e) => handleChange(index, "apiKey", e.target.value)}
                      disabled={editingIndex !== index}
                    />
                  </td>
                  <td className="p-3">
                    <input
                      className="w-full bg-gray-50 border border-gray-300 p-2 rounded focus:ring-2 focus:ring-purple-500 outline-none"
                      value={cred.apiSecret}
                      onChange={(e) => handleChange(index, "apiSecret", e.target.value)}
                      disabled={editingIndex !== index}
                    />
                  </td>
                  <td className="p-3 text-center space-x-2">
                    {editingIndex === index ? (
                      <button onClick={() => handleSave(index)} className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:scale-105 transition">Save</button>
                    ) : (
                      <button onClick={() => handleEdit(index)} className="text-yellow-500 hover:scale-110"><FaEdit /></button>
                    )}
                    <button onClick={() => handleDelete(index)} className="text-red-500 hover:scale-110"><FaTrash /></button>
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
