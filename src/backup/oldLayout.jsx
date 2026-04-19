import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

function Layout() {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);

    // const handleLogout = () => {
    //     localStorage.removeItem("admin");
    //     navigate("/login");
    // };

    const handleLogout = () => {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/login");
    };

//     return (
//         <div className="d-flex" style={{ minHeight: "100vh"}}>

//             {/* Sidebar */}
//             <div
//               className="d-flex flex-column p-4"
//               style={{
//                 width: "240px",
//                 background: "linear-gradient(180deg, #0f172a, #1e293b)",
//                 color: "white"
//               }}
//             >
//                 <h4 className="mb-4 fw-bold text-center">Admin Panel</h4>

//                 <button
//                  className="btn btn-outline-light mb-3 text-start"
//                  onClick={() => navigate("/dashboard")}
//                 >
//                   Dashboard
//                 </button>

//                 <button
//                   className="btn btn-outline-light mb-3 text-start"
//                   onClick={() => navigate("/dashboard/accounts")}
//                 >
//                   Accounts
//                 </button>

//                 <button 
//                   className="btn btn-outline-light text-start"
//                   onClick={() => navigate("/dashboard/reports")}
//                 >
//                   Reports
//                 </button>
//             </div>

//             {/* Main Content */}
//             <div className="flex-grow-1 d-flex flex-column">

//                 {/* Navbar */}
//                 <nav
//                   className="d-flex justify-content-between align-items-center px-4 py-3 shadow-sm"
//                   style={{
//                     background: "#ffffff",
//                     borderBottom:"1px solid #e5e7eb"
//                   }}
//                 >
//                     <h5 className="fw-bold mb-0 text-dark">
//                         Banking Admin Dashboard
//                     </h5>

//                     <div>
//                         <button
//                           className="btn btn-outline-dark me-2"
//                           onClick={() => setDarkMode(!darkMode)}
//                         >
//                             {darkMode ? "Light Mode" : "Dark Mode"}
//                         </button>

//                         <button
//                           className="btn btn-danger"
//                           onClick={handleLogout}
//                         >
//                           Logout
//                         </button>
//                     </div>
//                 </nav>

//                 {/* Page Content */}
//                 <div
//                   className="p-4"
//                   style={{
//                     background: darkMode ? "#111827" : "#f8f9fa",
//                     minHeight: "calc(100vh - 70px)"
//                   }}
//                 >
//                     <div className="container-fluid">
//                         <div className="bg-white p-4 rounded-4 shadow-sm">
//                             <Outlet context={{darkMode}}/>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// }

//return (
//   <div className="flex min-h-screen">

//     {/* Sidebar */}
//     <div className="w-64 bg-[#0f172a] text-white p-5 flex flex-col justify-between">
//       <h2 className="text-xl font-bold text-center mb-6">Admin Panel</h2>

//       <div className="space-y-3">
//         <button
//           onClick={() => navigate("/dashboard")}
//           className="w-full text-left px-3 py-2 rounded border border-white/30 hover:bg-white/10"
//         >
//           Dashboard
//         </button>

//         <button
//           onClick={() => navigate("/dashboard/accounts")}
//           className="w-full text-left px-3 py-2 rounded border border-white/30 hover:bg-white/10"
//         >
//           Accounts
//         </button>

//         <button
//           onClick={() => navigate("/dashboard/reports")}
//           className="w-full text-left px-3 py-2 rounded border border-white/30 hover:bg-white/10"
//         >
//           Reports
//         </button>

//       </div>

//     </div>

//     {/* Main */}
//     <div className="flex-1 flex flex-col">

//       {/* Topbar */}
//       <div className="flex justify-between items-center px-6 py-4 bg-white shadow">
//           <h1 className="text-lg font-bold">
//             Banking Admin Dashboard
//           </h1>

//           <div className="flex gap-2">
//             <button
//               onClick={() => setDarkMode(!darkMode)}
//               className="px-3 py-1 border rounded"
//             >
//               {darkMode ? "Light Mode" : "Dark Mode"}
//             </button>

//             <button
//               onClick={handleLogout}
//               className="bg-red-500 text-white px-4 py-1 rounded"
//             >
//               Logout
//             </button>

//           </div>
//       </div>

//       {/* Content */}
//       <div
//         className={`p-6 flex-1 ${
//           darkMode ? "bg-gray-900 text-white" : "bg-gray-100"
//         }`}
//       >
//         <div className="bg-white p-6 rounded-xl shadow">
//           <Outlet context={{ darkMode }} />
//         </div>
//       </div>
//     </div>

//   </div>
// );
// }

return (
   <div className="flex min-h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-[#0f172a] text-white p-5 flex flex-col justify-between">

        <div>
          <h2 className="text-xl font-semibold mb-8">Admin Panel</h2>

          <div className="space-y-2">

            <button
              onClick={() => navigate("/dashboard")}
              className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/dashboard/accounts")}
              className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition"
            >
              Accounts
            </button>

            <button
              onClick={() => navigate("/dashboard/reports")}
              className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition"
            >
              Reports
            </button>

          </div>
        </div>

        <div className="text-sm text-gray-400">
          © Banking App
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <div className="flex justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-md shadow-sm border-b">

          <h1 className="text-lg font-semibold">
            Banking Dashboard
          </h1>

          <div className="flex items-center gap-3">

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-1.5 rounded-lg border hover:bg-gray-100 transition"
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

        {/* Content */}
        <div
          className={`flex-1 p-8 space-y-6 ${
            darkMode
              ? "bg-gray-900 text-white"
              : "bg-gradient-to-br from-gray-100 to-gray-200"
          }`}
        >
          <Outlet context={{ darkMode }} />
        </div>

      </div>
    </div>
);
}

export default Layout;