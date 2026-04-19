import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Login from "./pages/LoginPage";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Reports from "./pages/Reports";
import { useState, useEffect } from "react";

function App() {

  //const isLoggedIn = !!localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            isLoggedIn
              ? <Navigate to="/dashboard" />
              : <Navigate to="/login" />
          }
        />

        <Route path="/login" element={<Login />} />

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