import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { LayoutDashboard, Wallet, BarChart3 } from "lucide-react";
import logo from "@/assets/logo.png";

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <div className="w-64 bg-gradient-to-b from-[#020617] to-[#0f172a] border-r border-blue-900/30 text-white p-5 flex flex-col justify-between select-none">

        <div>
          {/* LOGO */}
          <div className="flex items-center justify-center mb-12">
            <img
              src={logo}
              alt="FinGo Logo"
              className="h-16 object-contain pointer-events-none drop-shadow-[0_0_18px_rgba(34,211,238,0.7)]"
            />
          </div>

          <div className="space-y-2">

            {/* Dashboard */}
            <button
              onClick={() => navigate("/dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                location.pathname === "/dashboard"
                  ? "bg-blue-500/20 border border-blue-400/30"
                  : "hover:bg-blue-500/10 text-gray-300"
              }`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>

            {/* Accounts */}
            <button
              onClick={() => navigate("/dashboard/accounts")}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                location.pathname.startsWith("/dashboard/accounts")
                  ? "bg-blue-500/20 border border-blue-400/30"
                  : "hover:bg-blue-500/10 text-gray-300"
              }`}
            >
              <Wallet size={18} />
              Accounts
            </button>

            {/* Reports */}
            <button
              onClick={() => navigate("/dashboard/reports")}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                location.pathname.startsWith("/dashboard/reports")
                  ? "bg-blue-500/20 border border-blue-400/30"
                  : "hover:bg-blue-500/10 text-gray-300"
              }`}
            >
              <BarChart3 size={18} />
              Reports
            </button>

          </div>
        </div>

        {/* FOOTER */}
        <div className="text-sm text-gray-400">
          © 2026 FinGo
        </div>
      </div>

      {/* MAIN */}
      <div className={`flex-1 flex flex-col ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100"
      }`}>

        {/* TOPBAR */}
        <div className={`flex justify-between items-center px-6 py-4 shadow border-b ${
          darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-gradient-to-r from-white to-gray-100 border-gray-200"
        }`}>

          <div className="flex items-center gap-2">
          <img
              src={logo}
              alt="FinGo"
              className={`h-10 object-contain pointer-events-none ${
                darkMode
                  ? "brightness-125 contrast-125 drop-shadow-[0_0_16px_rgba(34,211,238,1)]"
                  : ""
              }`}
            />
          </div>

          <div className="flex gap-3">

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-4 py-1.5 rounded-lg border transition ${
                darkMode
                  ? "border-gray-600 hover:bg-gray-700"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg transition"
            >
              Logout
            </button>

          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-6">
          <div className={`rounded-xl shadow p-6 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}>
            <Outlet context={{ darkMode }} />
          </div>
        </div>

      </div>

    </div>
  );
}

export default Layout;