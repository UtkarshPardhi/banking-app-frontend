import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Reports from "./pages/Reports";

function App() {

    const isLoggedIn = localStorage.getItem("admin") === "true";

    return (
        <BrowserRouter>
            <Routes>

                {/* Default Route */}
                <Route
                  path="/"
                  element={
                    isLoggedIn
                    ? <Navigate to="/dashboard" />
                    : <Navigate to="/login" />
                  }
                />
                <Route path="/login" element={<Login/>}/>
                
                <Route
                  path="/dashboard/*"
                  element={
                    isLoggedIn
                    ? <Layout />
                    : <Navigate to="/login" />
                  }
                >
                    <Route index element={<Dashboard />} />
                    <Route path="accounts" element={<Accounts />} />
                    <Route path="reports" element={<Reports />} />
                </Route>
                
            </Routes>
        </BrowserRouter>
    );
}

export default App;