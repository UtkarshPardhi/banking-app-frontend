import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {

        if (username === "admin" && password === "admin123") {
            localStorage.setItem("admin", "true");
            window.location.href = "/dashboard";
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div 
        className="d-flex justify-content-center align-items-center"
        style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(to right, #eef2f3, #ffffff"
        }}
        >
            <div
              className="shadow-lg p-4"
              style={{
                width: "380px",
                background: "white",
                borderRadius: "12px"
              }}
            >
            <h3 className="text-center mb-4 fw-bold text-primary">
                Admin Login
                </h3>

            <input
              type="text"
              placeholder="Username"
              className="form-control mb-3"
              onChange={(e) => setusername(e.target.value)}
            />
            
            <input
              type="password"
              placeholder="Password"
              className="form-control mb-4"
              onChange={(e) => setpassword(e.target.value)}
            />

            <button className="btn btn-primary w-100 fw-semibold" onClick={handleLogin}>
                Login
            </button>
            </div>
        </div>
    );
}

export default Login;