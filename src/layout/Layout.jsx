import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

function Layout() {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("admin");
        navigate("/login");
    };

    return (
        <div className="d-flex" style={{ minHeight: "100vh"}}>

            {/* Sidebar */}
            <div
              className="d-flex flex-column p-4"
              style={{
                width: "240px",
                background: "linear-gradient(180deg, #0f172a, #1e293b)",
                color: "white"
              }}
            >
                <h4 className="mb-4 fw-bold text-center">Admin Panel</h4>

                <button
                 className="btn btn-outline-light mb-3 text-start"
                 onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </button>

                <button
                  className="btn btn-outline-light mb-3 text-start"
                  onClick={() => navigate("/dashboard/accounts")}
                >
                  Accounts
                </button>

                <button 
                  className="btn btn-outline-light text-start"
                  onClick={() => navigate("/dashboard/reports")}
                >
                  Reports
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1 d-flex flex-column">

                {/* Navbar */}
                <nav
                  className="d-flex justify-content-between align-items-center px-4 py-3 shadow-sm"
                  style={{
                    background: "#ffffff",
                    borderBottom:"1px solid #e5e7eb"
                  }}
                >
                    <h5 className="fw-bold mb-0 text-dark">
                        Banking Admin Dashboard
                    </h5>

                    <div>
                        <button
                          className="btn btn-outline-dark me-2"
                          onClick={() => setDarkMode(!darkMode)}
                        >
                            {darkMode ? "Light Mode" : "Dark Mode"}
                        </button>

                        <button
                          className="btn btn-danger"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                    </div>
                </nav>

                {/* Page Content */}
                <div
                  className="p-4"
                  style={{
                    background: darkMode ? "#111827" : "#f8f9fa",
                    minHeight: "calc(100vh - 70px)"
                  }}
                >
                    <div className="container-fluid">
                        <div className="bg-white p-4 rounded-4 shadow-sm">
                            <Outlet context={{darkMode}}/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Layout;