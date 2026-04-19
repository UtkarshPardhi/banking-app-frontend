// // import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// // import Login from "./pages/LoginPage";
// // import Layout from "./layout/Layout";
// // import Dashboard from "./pages/Dashboard";
// // import Accounts from "./pages/Accounts";
// // import Reports from "./pages/Reports";

// // function App() {

// //     //const isLoggedIn = localStorage.getItem("admin") === "true";
// //     const isLoggedIn = !!localStorage.getItem("token");

// //     return (
// //         <BrowserRouter>
// //             <Routes>

// //                 {/* Default Route */}
// //                 <Route
// //                   path="/"
// //                   element={
// //                     isLoggedIn
// //                     ? <Navigate to="/dashboard" />
// //                     : <Navigate to="/login" />
// //                   }
// //                 />
// //                 <Route path="/login" element={<Login/>}/>
                
// //                 <Route
// //                   path="/dashboard/*"
// //                   element={
// //                     isLoggedIn
// //                     ? <Layout />
// //                     : <Navigate to="/login" />
// //                   }
// //                 >
// //                     <Route index element={<Dashboard />} />
// //                     <Route path="accounts" element={<Accounts />} />
// //                     <Route path="reports" element={<Reports />} />
// //                 </Route>
                
// //             </Routes>
// //         </BrowserRouter>
// //     );
// // }

// // export default App;

// import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// import Login from "./pages/LoginPage";
// import Layout from "./layout/Layout";
// import Dashboard from "./pages/Dashboard";
// import Accounts from "./pages/Accounts";
// import Reports from "./pages/Reports";

// function App() {

//     const [isLoggedIn, setIsLoggedIn] = useState(
//         !!localStorage.getItem("token")
//     );

//     // const isLoggedIn = !!localStorage.getItem("token");

//     // 🔥 Listen for login/logout changes
//     useEffect(() => {
//         const checkAuth = () => {
//             setIsLoggedIn(!!localStorage.getItem("token"));
//         };

//         window.addEventListener("storage", checkAuth);

//         return () => window.removeEventListener("storage", checkAuth);
//     }, []);

//     return (
//         <BrowserRouter>
//             <Routes>

//                 {/* Default Route */}
//                 <Route
//                   path="/"
//                   element={
//                     isLoggedIn
//                     ? <Navigate to="/dashboard" />
//                     : <Navigate to="/login" />
//                   }
//                 />

//                 <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

//                 <Route
//                   path="/dashboard/*"
//                   element={
//                     isLoggedIn
//                     ? <Layout setIsLoggedIn={setIsLoggedIn} />
//                     : <Navigate to="/login" />
//                   }
//                 >
//                     <Route index element={<Dashboard />} />
//                     <Route path="accounts" element={<Accounts />} />
//                     <Route path="reports" element={<Reports />} />
//                 </Route>

//             </Routes>
//         </BrowserRouter>
//     );
// }

// export default App;

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