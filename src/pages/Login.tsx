import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../auth/token";
import api from "../api/axios";
import axios from "axios"; // make sure it's imported at the top

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();



  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        email: username,
        password: password,
      });

      const token = response.data.access_token;
      setToken(token);

      const profileRes = await api.get("/users/me");
      const role = profileRes.data.role;

      if (role === "superadmin") {
        navigate("/admin");
      } else if (role === "tenant_admin") {
        navigate("/dashboard");
      } else {
        navigate("/settings");
      }
    } catch (err) {
  console.error("Login Error →", err);

  if (axios.isAxiosError(err)) {
    if (err.response) {
      console.error("Backend response:", err.response.data);
      const backendError = err.response.data?.detail || "Login failed";
      alert(`Error: ${backendError}`);
    } else if (err.request) {
      console.error("No response from server", err.request);
      alert("No response from server. Check backend status.");
    } else {
      console.error("Axios error", err.message);
      alert(`Axios error: ${err.message}`);
    }
  } else {
    console.error("Unknown error", err);
    alert("An unexpected error occurred during login.");
  }
}

  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="py-6 px-4">
        <div className="grid lg:grid-cols-2 items-center gap-6 max-w-6xl w-full">
          <div className="border border-slate-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-lg:mx-auto">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="mb-12">
                <h1 className="text-slate-900 text-3xl font-semibold text-center">
                  Sign in
                </h1>
              </div>

              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  User name
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full text-sm text-slate-900 border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600"
                    placeholder="Enter Your Email"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-sm text-slate-900 border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div className="mt-12">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-[15px] font-medium tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
                  onClick={handleLogin}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>

          <div className="max-lg:mt-8">
            <img
              src="https://readymadeui.com/login-image.webp"
              className="w-full aspect-[71/50] max-lg:w-4/5 mx-auto block object-cover"
              alt="login"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
