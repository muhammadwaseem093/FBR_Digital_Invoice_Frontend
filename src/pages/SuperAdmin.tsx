import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TenantList from "../features/tenant/TenantList";
import CreateTenantUserModal from "../features/users/CreateTenantUserModal";
import { clearToken } from "../auth/token";
import { Menu } from "lucide-react";

export default function SuperAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen relative">
      {/* Sidebar for mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden`}
      >
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full p-4 sm:p-6 z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-gray-700"
              onClick={() => setSidebarOpen((prev) => !prev)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold text-slate-800">
              Super Admin Dashboard
            </h1>
          </div>

          <div className="flex gap-3">
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              onClick={() => setShowModal(true)}
            >
              + Create Tenant User
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => {
                clearToken();
                navigate("/");
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Modal for creating user */}
        {showModal && (
          <CreateTenantUserModal
            onClose={() => setShowModal(false)}
            onCreated={() => {
              alert("Tenant user created successfully");
              // You can also trigger a refresh here if needed
            }}
          />
        )}

        <TenantList />
      </div>
    </div>
  );
}
