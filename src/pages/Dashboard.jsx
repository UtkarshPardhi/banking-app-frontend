// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import { useOutletContext } from "react-router-dom";
// import AccountList from "../components/AccountList";

function Dashboard() {

    // const navigate = useNavigate();
    // const [darkMode, setDarkMode] = useState(false);

    // const handleLogout = () => {
    //     localStorage.removeItem("admin");
    //     window.location.href = "/login";
    // };

       const { darkMode } = useOutletContext();

    return (
    //     <div 
    //     style={{ 
    //         minHeight: "100vh", 
    //         display: "flex",
    //         // background: darkMode
    //         //   ? "#1e1e2f"
    //         //   : "linear-gradient(to right, #eef2f3, #ffffff)",
    //         //   color: darkMode ? "white" : "black"
    //         background: darkMode ? "#1e1e2f" : "#f4f7fa",
    //         color: darkMode ? "white" : "black"
    //         }}
    //         >

    //         {/*Navbar*/}
    //         {/* <nav className="navbar navbar-dark bg-primary shadow px-4">
    //             <div className="container-fluid">
    //             <span className="navbar-brand fs-4 fw-bold">
    //                 Banking Admin Dashboard
    //             </span>
    //             <button
    //                 className="btn btn-light me-2"
    //                 onClick={() => setDarkMode(!darkMode)}
    //                 >
    //                   {darkMode ? "Light Mode" : "Dark Mode"}
    //                 </button>
    //             <button 
    //             className="btn btn-light fw-semibold" 
    //             onClick={handleLogout}>
    //                 Logout
    //                 </button>
    //             </div>
    //         </nav> */}

    //         {/* SideBar */}
    //         <div
    //           style={{
    //             width: "220px",
    //             background: darkMode ? "#111827" : "#0d6efd",
    //             color: "white",
    //             padding: "20px"
    //           }}
    //         >
    //             <h4 className="mb-4">Admin Panel</h4>

    //              <div className="mb-3">📊 Dashboard</div>
    //              <div className="mb-3">🏦 Accounts</div>
    //              <div className="mb-3">📈 Reports</div>
    //         </div>

    //         {/* Right Side */}
    //         <div style={{ flex: 1, display: "flex", flexDirection: "column"}}>

    //          {/* Topbar */}
    //          <div
    //            style={{
    //             padding: "15px 30px",
    //             background: darkMode ? "#2a2a3d" : "white",
    //             boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    //             display: "flex",
    //             justifyContent: "space-between",
    //             alignItems: "center"
    //            }}
    //            >

    //             <h5 className="m-0">Banking Admin Dashboard</h5>

    //             <div>
    //                 <button
    //                   className="btn btn-outline-secondary me-2"
    //                   onClick={() => setDarkMode(!darkMode)}
    //                 >
    //                   {darkMode ? "Light Mode" : "Dark Mode"}
    //                 </button>

    //                 <button
    //                   className="btn btn-danger"
    //                   onClick={handleLogout}
    //                 >
    //                   Logout
    //                 </button>
    //             </div>
    //         </div>

    //         {/* Main Content */}
    //         <div style={{ padding: "40px"}}>
    //            <AccountList darkMode={darkMode} />
    //         </div>
    //     </div>
    // </div>
    <div>
        <h2 className="fw-bold">Dashboard Overview</h2>
        <p>Welcome to the banking admin dashboard.</p>
    </div>
    );
}

export default Dashboard;