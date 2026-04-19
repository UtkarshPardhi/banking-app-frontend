// import { useEffect, useState, useMemo } from "react";
// import { useOutletContext } from "react-router-dom";
// import AccountService from "../services/AccountService";
// import { Users, Wallet, TrendingUp} from "lucide-react";

// import {
//     BarElement,
//     CategoryScale,
//     LinearScale,
//     Tooltip,
//     Legend,
//     Chart as ChartJS,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// export default function Dashboard() {
//     const { darkMode } = useOutletContext();
//     const [accounts, setAccounts] = useState([]);

//     useEffect(() => {
//         fetchAccounts();
//     }, []);

//     const fetchAccounts = async () => {
//         try {
//             const res = await AccountService.getAllAccounts();
//             setAccounts(res.data);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const totalBalance = accounts.reduce(
//         (sum, acc) => sum + acc.balance,
//         0
//     );

//     const highestBalance = 
//     accounts.length > 0 
//     ? Math.max(...accounts.map((a) => a.balance))
//     : 0;

//     return (
//         <div className="space-y-8">

//             {/* Header */}
//             <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : ""}`}>Dashboard</h2>

//             {/* Stats */}
//              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//         <div className={`${darkMode ? "bg-gray-700" : "bg-white"} p-6 rounded-2xl border ${darkMode ? "border-gray-600" : "border-gray-100"} shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}>
//             <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 hover:opacity-100 transition duration-300"></div>


//             <div className="relative z-10">
//           <div className="flex justify-between items-center">
//             <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>Total Accounts</p>
//            <Users size={20} className="text-blue-500 opacity-80" />
//           </div>

//            <h2 className={`text-3xl font-bold mt-4 ${darkMode ? "text-white" : ""}`}>
//             {accounts.length}
//             </h2>
//             </div>

//         </div>


//         <div className={`${darkMode ? "bg-gray-700" : "bg-white"} p-6 rounded-2xl border ${darkMode ? "border-gray-600" : "border-gray-100"} shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}>
//             <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 hover:opacity-100 transition duration-300"></div>

//             <div className="relative z-10">
//           <div className="flex justify-between items-center">
//             <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>Total Balance</p>
//            <Wallet size={20} className="text-green-500 opacity-80" />

//           </div>
//             <h2 className="text-3xl font-bold text-green-600 mt-4">
//             ₹{totalBalance.toLocaleString()}
//           </h2>
//           </div>

//         </div>

//         <div className={`${darkMode ? "bg-gray-700" : "bg-white"} p-6 rounded-2xl border ${darkMode ? "border-gray-600" : "border-gray-100"} shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}>
//             <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 hover:opacity-100 transition duration-300"></div>

//         <div className="relative z-10">
//           <div className="flex justify-between items-center">
//             <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>Highest Balance</p>
//             <TrendingUp size={20} className="text-yellow-500 opacity-80" />

//           </div>
//             <h2 className={`text-3xl font-bold text-yellow-600 mt-4 ${darkMode ? "text-white" : ""}`}>
//                  ₹{highestBalance.toLocaleString()}
//           </h2>
//         </div>
//         </div>

//       </div>

//             {/* Hero Card */}
//             <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-2xl shadow-lg hover:scale-[1.01] hover:shadow-2xl transition duration-300">
//                 <p className="text-sm opacity-80">Total Balance</p>
//                 <h2 className="text-4xl font-bold mt-2">
//                     ₹{totalBalance.toLocaleString()}
//                     </h2>
//                 <p className="text-sm mt-2 opacity-80">
//                     Overview of all accounts
//                 </p>
//             </div>

//             {/* 🔥 Chart */}
//       <div className={`${darkMode ? "bg-gray-700" : "bg-white"} p-6 rounded-2xl shadow-md ${darkMode ? "border border-gray-600" : ""}`}>
//         <h2 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : ""}`}>
//           Balance Distribution
//         </h2>

//         <Bar
//           data={useMemo(() => ({
//             labels: accounts.map((a) => a.accountHolderName),
//             datasets: [
//               {
//                 label: "Balance",
//                 data: accounts.map((a) => a.balance),
//                 backgroundColor: "rgba(99, 102, 241, 0.6)",
//                 borderRadius: 8,
//               },
//             ],
//           }), [accounts])}
//         />
//       </div>

//             {/* Recent Accounts */}
//             <div className={`${darkMode ? "bg-gray-700" : "bg-white"} p-6 rounded-2xl shadow-md ${darkMode ? "border border-gray-600" : "border border-gray-100"}`}>
//                 <h2 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : ""}`}>
//                     Recent Accounts
//                 </h2>

//                 <div className="space-y-3">
//                     {accounts.slice(0, 5).map((acc) => (
//                         <div
//                          key={acc.id}
//                          className={`flex justify-between p-3 rounded-lg ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"} transition`}
//                         >
//                             <span className={`font-medium ${darkMode ? "text-white" : ""}`}>
//                                 {acc.accountHolderName}
//                             </span>
//                             <span className="font-semibold text-green-600">
//                                 ₹{acc.balance}
//                             </span>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//         </div>
//     );
// }

// import { useEffect, useState, useMemo } from "react";
// import { useOutletContext } from "react-router-dom";
// import AccountService from "../services/AccountService";
// import { Users, Wallet, TrendingUp } from "lucide-react";

// import {
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
//   Chart as ChartJS,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// export default function Dashboard() {
//   const { darkMode } = useOutletContext();
//   const [accounts, setAccounts] = useState([]);

//   useEffect(() => {
//     fetchAccounts();
//   }, []);

//   const fetchAccounts = async () => {
//     try {
//       const res = await AccountService.getAllAccounts();
//       setAccounts(res.data);
//     } catch (err) {
//       console.error("Error fetching accounts:", err);
//     }
//   };

//   const totalBalance = accounts.reduce(
//     (sum, acc) => sum + acc.balance,
//     0
//   );

//   const highestBalance =
//     accounts.length > 0
//       ? Math.max(...accounts.map((a) => a.balance))
//       : 0;

//   const chartData = useMemo(
//     () => ({
//       labels: accounts.map((a) => a.accountHolderName),
//       datasets: [
//         {
//           label: "Balance",
//           data: accounts.map((a) => a.balance),
//           backgroundColor: "rgba(99, 102, 241, 0.6)",
//           borderRadius: 8,
//         },
//       ],
//     }),
//     [accounts]
//   );

//   return (
//     <div className="space-y-8">

//       {/* Header */}
//       <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : ""}`}>
//         Dashboard
//       </h2>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Card 1 */}
//         <div className={`relative group ${
//           darkMode ? "bg-gray-700" : "bg-white"
//         } p-6 rounded-2xl border ${
//           darkMode ? "border-gray-600" : "border-gray-100"
//         } shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}>

//           <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 
//                           opacity-0 group-hover:opacity-100 
//                           transition duration-300 
//                           pointer-events-none rounded-2xl"></div>

//           <div className="relative z-10">
//             <div className="flex justify-between items-center">
//               <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
//                 Total Accounts
//               </p>
//               <Users size={20} className="text-blue-500 opacity-80" />
//             </div>

//             <h2 className={`text-3xl font-bold mt-4 ${darkMode ? "text-white" : ""}`}>
//               {accounts.length}
//             </h2>
//           </div>
//         </div>

//         {/* Card 2 */}
//         <div className={`relative group ${
//           darkMode ? "bg-gray-700" : "bg-white"
//         } p-6 rounded-2xl border ${
//           darkMode ? "border-gray-600" : "border-gray-100"
//         } shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}>

//           <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 
//                           opacity-0 group-hover:opacity-100 
//                           transition duration-300 
//                           pointer-events-none rounded-2xl"></div>

//           <div className="relative z-10">
//             <div className="flex justify-between items-center">
//               <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
//                 Total Balance
//               </p>
//               <Wallet size={20} className="text-green-500 opacity-80" />
//             </div>

//             <h2 className="text-3xl font-bold text-green-600 mt-4">
//               ₹{totalBalance.toLocaleString()}
//             </h2>
//           </div>
//         </div>

//         {/* Card 3 */}
//         <div className={`relative group ${
//           darkMode ? "bg-gray-700" : "bg-white"
//         } p-6 rounded-2xl border ${
//           darkMode ? "border-gray-600" : "border-gray-100"
//         } shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}>

//           <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 
//                           opacity-0 group-hover:opacity-100 
//                           transition duration-300 
//                           pointer-events-none rounded-2xl"></div>

//           <div className="relative z-10">
//             <div className="flex justify-between items-center">
//               <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
//                 Highest Balance
//               </p>
//               <TrendingUp size={20} className="text-yellow-500 opacity-80" />
//             </div>

//             <h2 className={`text-3xl font-bold text-yellow-600 mt-4 ${darkMode ? "text-white" : ""}`}>
//               ₹{highestBalance.toLocaleString()}
//             </h2>
//           </div>
//         </div>

//       </div>

//       {/* Hero Card */}
//       <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-2xl shadow-lg hover:scale-[1.01] hover:shadow-2xl transition duration-300">
//         <p className="text-sm opacity-80">Total Balance</p>
//         <h2 className="text-4xl font-bold mt-2">
//           ₹{totalBalance.toLocaleString()}
//         </h2>
//         <p className="text-sm mt-2 opacity-80">
//           Overview of all accounts
//         </p>
//       </div>

//       {/* Chart */}
//       <div className={`${darkMode ? "bg-gray-700" : "bg-white"} p-6 rounded-2xl shadow-md ${darkMode ? "border border-gray-600" : ""}`}>
//         <h2 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : ""}`}>
//           Balance Distribution
//         </h2>

//         <Bar data={chartData} />
//       </div>

//       {/* Recent Accounts */}
//       <div className={`${darkMode ? "bg-gray-700" : "bg-white"} p-6 rounded-2xl shadow-md ${darkMode ? "border border-gray-600" : "border border-gray-100"}`}>
//         <h2 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : ""}`}>
//           Recent Accounts
//         </h2>

//         <div className="space-y-3">
//           {accounts.slice(0, 5).map((acc) => (
//             <div
//               key={acc.id}
//               className={`flex justify-between p-3 rounded-lg ${
//                 darkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"
//               } transition`}
//             >
//               <span className={`font-medium ${darkMode ? "text-white" : ""}`}>
//                 {acc.accountHolderName}
//               </span>
//               <span className="font-semibold text-green-600">
//                 ₹{acc.balance}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import AccountService from "../services/AccountService";
import { Users, Wallet, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const { darkMode } = useOutletContext();
  const [accounts, setAccounts] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    fetchAccounts(); 

    const handleUpdate = () => {
      fetchAccounts();
    };

    window.addEventListener("accountsUpdated", handleUpdate);

    return () => {
      window.removeEventListener("accountsUpdated", handleUpdate);
    };

  }, []);

  // const fetchAccounts = async () => {
  //   try {
  //     const res = await AccountService.getAllAccounts();
  //     setAccounts(res.data);
  //   } catch (err) {
  //     console.error("Error fetching accounts:", err);
  //   }
  // };

  const fetchAccounts = async () => {
  try {
    const res = await AccountService.getAllAccounts();
    const accs = res.data;

    // ✅ Always update accounts first
    setAccounts(accs);

    // 🔥 Safe transaction fetching
    let allTx = [];

    for (let acc of accs) {
      try {
        const txRes = await AccountService.getTransactions(acc.id);
        allTx = [
                  ...allTx,
                  ...txRes.data.map(tx => ({
                    ...tx,
                    accountName: acc.accountHolderName
                  }))
                ];
      } catch (err) {
        console.error("Transaction fetch failed for account:", acc.id);
      }
    }

    allTx.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setRecentTransactions(allTx.slice(0, 5));

  } catch (err) {
    console.error("Error fetching accounts:", err);
  }
};

  const totalBalance = accounts.reduce(
    (sum, acc) => sum + acc.balance,
    0
  );

  const highestBalance =
    accounts.length > 0
      ? Math.max(...accounts.map((a) => a.balance))
      : 0;

  const topAccount =
    accounts.length > 0
      ? accounts.reduce((max, acc) =>
          acc.balance > max.balance ? acc : max,
        accounts[0])
      : null;

  return (
    <div className="space-y-8">

      {/* Header */}
      <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : ""}`}>
        Dashboard
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Card 1 */}
        <div className={`relative group ${
          darkMode ? "bg-gray-700" : "bg-white"
        } p-6 rounded-2xl border ${
          darkMode ? "border-gray-600" : "border-gray-100"
        } shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}>

          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 
                          opacity-0 group-hover:opacity-100 
                          transition duration-300 
                          pointer-events-none rounded-2xl"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-center">
              <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
                Total Accounts
              </p>
              <Users size={20} className="text-blue-500 opacity-80" />
            </div>

            <h2 className={`text-3xl font-bold mt-4 ${darkMode ? "text-white" : ""}`}>
              {accounts.length}
            </h2>
          </div>
        </div>

        {/* Card 2 */}
        <div className={`relative group ${
          darkMode ? "bg-gray-700" : "bg-white"
        } p-6 rounded-2xl border ${
          darkMode ? "border-gray-600" : "border-gray-100"
        } shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}>

          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 
                          opacity-0 group-hover:opacity-100 
                          transition duration-300 
                          pointer-events-none rounded-2xl"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-center">
              <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
                Total Balance
              </p>
              <Wallet size={20} className="text-green-500 opacity-80" />
            </div>

            <h2 className="text-3xl font-bold text-green-600 mt-4">
              ₹{totalBalance.toLocaleString()}
            </h2>
          </div>
        </div>

        {/* Card 3 */}
        <div className={`relative group ${
          darkMode ? "bg-gray-700" : "bg-white"
        } p-6 rounded-2xl border ${
          darkMode ? "border-gray-600" : "border-gray-100"
        } shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}>

          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 
                          opacity-0 group-hover:opacity-100 
                          transition duration-300 
                          pointer-events-none rounded-2xl"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-center">
              <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
                Highest Balance
              </p>
              <TrendingUp size={20} className="text-yellow-500 opacity-80" />
            </div>

            <h2 className={`text-3xl font-bold text-yellow-600 mt-4 ${darkMode ? "text-white" : ""}`}>
              ₹{highestBalance.toLocaleString()}
            </h2>
          </div>
        </div>

      </div>

      {/* Hero Card */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-2xl shadow-lg hover:scale-[1.01] hover:shadow-2xl transition duration-300">
        <p className="text-sm opacity-80">Total Balance</p>
        <h2 className="text-4xl font-bold mt-2">
          ₹{totalBalance.toLocaleString()}
        </h2>
        <p className="text-sm mt-2 opacity-80">
          Overview of all accounts
        </p>
      </div>

      {/* Top Account */}
      <div className={`${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-100"} p-6 rounded-2xl shadow-md border`}>
        <h2 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : ""}`}>
          Top Account
        </h2>

        {topAccount ? (
          <div className="flex justify-between items-center">
            <span className={`font-medium ${darkMode ? "text-white" : ""}`}>
              {topAccount.accountHolderName}
            </span>
            <span className="text-green-600 font-bold">
              ₹{topAccount.balance.toLocaleString()}
            </span>
          </div>
        ) : (
          <p className="text-gray-400">No accounts available</p>
        )}
      </div>

      {/* Recent Accounts */}
      <div className={`${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-100"} p-6 rounded-2xl shadow-md border`}>
        <h2 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : ""}`}>
          Recent Activity
        </h2>

      <div className="space-y-3">
  {recentTransactions.length === 0 ? (
    <p className="text-gray-400">No recent activity</p>
  ) : (
    recentTransactions.map((tx, i) => (
      <div
        key={i}
        className={`flex justify-between p-3 rounded-lg ${
          darkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"
        } transition`}
      >
        {/* Left */}
        <div>
          <p className="text-sm text-gray-500">
            {tx.accountName}
          </p>

          <p className={`font-medium ${darkMode ? "text-white" : ""}`}>
            {tx.type === "DEPOSIT" ? "Deposit" : "Withdraw"}
          </p>

          <p className="text-xs text-gray-400">
            {new Date(tx.timestamp).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        {/* Right */}
        <span
          className={`font-semibold ${
            tx.type === "DEPOSIT" ? "text-green-600" : "text-red-600"
          }`}
        >
          {tx.type === "DEPOSIT" ? "+" : "-"}₹{tx.amount}
        </span>
      </div>
    ))
  )}
</div>
      </div>

    </div>
  );
}