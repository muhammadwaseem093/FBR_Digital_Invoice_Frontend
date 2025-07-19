import { useEffect, useState } from "react";
import api from "../../api/axios";

interface TenantUser {
  id: string;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
}

export default function TenantList() {
  const [tenants, setTenants] = useState<TenantUser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTenants = async () => {
    try {
      const response = await api.get("/users");
      const tenantUsers = response.data.filter(
        (user: TenantUser) => user.role === "tenant_admin"
      );
      setTenants(tenantUsers);
    } catch (err) {
      console.error("Failed to load tenants", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Tenant Admins</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-50 text-left text-sm font-semibold text-blue-700 uppercase">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant, index) => (
              <tr
                key={tenant.id}
                className={`border-t ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition`}
              >
                <td className="px-4 py-2">{tenant.name}</td>
                <td className="px-4 py-2">{tenant.email}</td>
                <td className="px-4 py-2">{tenant.role}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      tenant.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {tenant.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button className="text-blue-600 hover:underline text-sm">
                    View
                  </button>
                  <button className="text-yellow-600 hover:underline text-sm">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline text-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
