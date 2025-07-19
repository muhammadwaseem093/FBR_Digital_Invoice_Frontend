import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed left-0 top-0">
      <div className="text-xl font-bold p-6 border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="mt-4 space-y-2 px-4">
        <Link to="/admin" className="block py-2 px-3 rounded hover:bg-gray-700">Dashboard</Link>
        <Link to="/admin/tenants" className="block py-2 px-3 rounded hover:bg-gray-700">Tenants</Link>
        <Link to="/admin/users" className="block py-2 px-3 rounded hover:bg-gray-700">Users</Link>
        <Link to="/admin/create-tenant-user" className="block py-2 px-3 rounded hover:bg-gray-700">Create Tenant User</Link>
      </nav>
    </div>
  );
}
