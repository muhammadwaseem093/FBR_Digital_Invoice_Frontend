import { useState } from "react";
import api from "../../api/axios";
import { getToken } from "../../auth/token";

interface Props {
  onClose: () => void;
  onCreated: () => void;
}

export default function CreateTenantUserModal({ onClose, onCreated }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "tenant_admin",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const token = getToken();
    if (!token) {
      alert("You are not authorized. Please log in again.");
      return;
    }

    await api.post("/setup/tenantuser", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    onCreated(); // refresh list or show message
    onClose();   // close modal
  } catch (err) {
    console.error("Create Tenant Error →", err);
    alert("Failed to create tenant user.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center">

      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Create Tenant User</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Creating..." : "Create User"}
          </button>
        </form>
        <button
          className="mt-4 text-sm text-gray-500 hover:underline"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
