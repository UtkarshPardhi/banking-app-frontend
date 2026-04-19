import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // clean reset
  };

  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <div className="w-64 bg-[#0f172a] text-white p-5 flex flex-col justify-between">

        <div>
          <h2 className="text-xl font-semibold mb-8">Admin Panel</h2>

          <div className="space-y-2">

            {/* Dashboard */}
            <button
              onClick={() => navigate("/dashboard")}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${
                location.pathname === "/dashboard"
                  ? "bg-white/20"
                  : "hover:bg-white/10"
              }`}
            >
              Dashboard
            </button>

            {/* Accounts */}
            <button
              onClick={() => navigate("/dashboard/accounts")}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${
                location.pathname.startsWith("/dashboard/accounts")
                  ? "bg-white/20"
                  : "hover:bg-white/10"
              }`}
            >
              Accounts
            </button>

            {/* Reports */}
            <button
              onClick={() => navigate("/dashboard/reports")}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${
                location.pathname.startsWith("/dashboard/reports")
                  ? "bg-white/20"
                  : "hover:bg-white/10"
              }`}
            >
              Reports
            </button>

          </div>
        </div>

        <div className="text-sm text-gray-400">
          © Banking App
        </div>
      </div>

      {/* MAIN */}
      <div className={`flex-1 flex flex-col ${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100"}`}>

        {/* TOPBAR */}
        <div className={`flex justify-between items-center px-6 py-4 shadow border-b ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}>

          <h1 className="text-lg font-semibold">
            Banking Dashboard
          </h1>

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