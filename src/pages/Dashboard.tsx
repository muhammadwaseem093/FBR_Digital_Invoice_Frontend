import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect, useRef } from "react";
import { clearToken } from "../auth/token";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Dashboard() {
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Invoices",
        backgroundColor: "#8b5cf6",
        data: [12, 19, 7, 15, 10, 20],
      },
    ],
  };

  const handleLogout = () => {
    clearToken();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white p-4 shadow">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">📄 Digital Invoice</h1>
          <nav className="flex gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="hover:underline"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate("/fbr-tokens")}
              className="hover:underline"
            >
              FBR Tokens
            </button>
          </nav>
        </div>

        <div className="relative" ref={profileRef}>
          <FaUserCircle
            size={28}
            className="cursor-pointer"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
          />
          <div
            className={`absolute right-0 mt-2 bg-white text-black shadow-lg rounded w-40 z-20 transition-all duration-300 ${
              profileDropdownOpen
                ? "opacity-100 max-h-60"
                : "opacity-0 max-h-0 overflow-hidden"
            }`}
          >
            <button
              onClick={() => {
                navigate("/settings");
                setProfileDropdownOpen(false);
              }}
              className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
            >
              Profile Settings
            </button>
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="flex justify-between mb-6 items-center">
          <h2 className="text-xl font-bold">Welcome to Your Dashboard</h2>
          <button
            onClick={() => navigate("/invoice")}
            className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white px-4 py-2 rounded shadow hover:scale-105 transition"
          >
            + Generate Invoice
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-6 shadow rounded text-center hover:shadow-md transition">
            <h3 className="text-lg font-semibold">Total Invoices</h3>
            <p className="text-3xl text-indigo-600 mt-2">58</p>
          </div>
          <div className="bg-white p-6 shadow rounded text-center hover:shadow-md transition">
            <h3 className="text-lg font-semibold">Today Generated</h3>
            <p className="text-3xl text-indigo-600 mt-2">4</p>
          </div>
          <div className="bg-white p-6 shadow rounded text-center hover:shadow-md transition">
            <h3 className="text-lg font-semibold">API Status</h3>
            <p className="text-3xl text-green-600 mt-2">Active</p>
          </div>
        </div>

        <div className="bg-white p-6 shadow rounded mb-6">
          <h3 className="text-lg font-semibold mb-4">Invoice Trends</h3>
          <Bar data={chartData} />
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <table className="w-full border text-sm">
            <thead>
              <tr>
                <th className="border p-2 bg-gray-100">Date</th>
                <th className="border p-2 bg-gray-100">Invoice No</th>
                <th className="border p-2 bg-gray-100">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border p-2">2025-06-24</td>
                <td className="border p-2">INV-1001</td>
                <td className="border p-2">Rs. 25,000</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border p-2">2025-06-24</td>
                <td className="border p-2">INV-1000</td>
                <td className="border p-2">Rs. 18,500</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
