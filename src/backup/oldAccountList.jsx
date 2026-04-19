// // // import React, { useEffect, useState } from "react";
// // // import AccountService from "../services/AccountService";
// // // import { Chart as ChartJS,
// // //          CategoryScale,
// // //          LinearScale,
// // //          BarElement,
// // //          Title,
// // //          Tooltip,
// // //          Legend
// // // } from "chart.js";
// // // import { Bar } from "react-chartjs-2";

// // // ChartJS.register(
// // //     CategoryScale,
// // //     LinearScale,
// // //     BarElement,
// // //     Title,
// // //     Tooltip,
// // //     Legend
// // // )

// // // function AccountList({ darkMode }) {

// // //     const [accounts, setAccounts] = useState([]);
// // //     const [accountHolderName, setAccountHolderName] = useState("");
// // //     const [balance, setBalance] = useState(0);
// // //     const [searchTerm, setSearchTerm] = useState("");
// // //     const [selectedAccountId, setSelectedAccountId] = useState(null);
// // //     const [transactions, setTransactions] = useState([]);

// // //     useEffect(() => {
// // //         loadAccounts();
// // //     }, []);

// // //     const loadAccounts = () => {
// // //         AccountService.getAllAccounts()
// // //         .then((response) => {
// // //             setAccounts(response.data);
// // //         })
// // //         .catch((error) => {
// // //             console.error("Error fetching accounts:", error);
// // //         });
// // //     };

// // //     const handleCreateAccount = (e) => {
// // //         e.preventDefault();

// // //         const account = {
// // //             accountHolderName,
// // //             balance
// // //         };

// // //         AccountService.createAccount(account)
// // //         .then(() => {
// // //             setAccountHolderName("");
// // //             setBalance("");
// // //             loadAccounts();
// // //         })
// // //         .catch(error => console.error(error));
// // //     };

// // //     const handleDeposit = (id) => {
// // //         const amount = prompt("Enter deposit amount:");

// // //         if (!amount) return;

// // //         AccountService.deposit(id, amount)
// // //         .then(() => loadAccounts())
// // //         .catch(error => console.error());
// // //     };

// // //     const handleWithdraw = (id) => {
// // //         const amount = prompt("Enter withdraw amount:");

// // //         if (!amount) return;

// // //         AccountService.withdraw(id, amount)
// // //         .then(() => loadAccounts())
// // //         .catch(error => console.error(error));
// // //     };

// // //     const handleDelete = (id) => {
// // //         if (window.confirm("Are you sure you want to delete this account?")) {
// // //             AccountService.deleteAccount(id)
// // //             .then(() => loadAccounts())
// // //             .catch(error => console.error(error));
// // //         }
// // //     };

// // //     const chartData = {
// // //         labels: accounts.map(acc => acc.accountHolderName),
// // //         datasets: [
// // //             {
// // //                 label: "Account Balance",
// // //                 data: accounts.map(acc => acc.balance),
// // //                 backgroundColor: darkMode ? "#4dabf7" : "#0d6efd"
// // //             }
// // //         ]
// // //     };

// // //     const chartOptions = {
// // //         responsive: true,
// // //         plugins: {
// // //             legend: {
// // //                 display: true
// // //             }
// // //         }
// // //     };

// // //     const handleViewTransactions = (id) => {

// // //         AccountService.getTransactions(id)
// // //         .then((response) => {
// // //             setTransactions(response.data);
// // //             setSelectedAccountId(id);
// // //         })
// // //         .catch(error => console.error(error));
// // //     };

// // //     return (
// // //         <div className="card shadow-lg border-0 p-5 rounded-4"
// // //              style={{
// // //                 backgroundColor: darkMode ? "#2a2a3d" : "white",
// // //                 color: darkMode ? "white" : "black"
// // //              }}
// // //         >
// // //             <h2 className="text-center mb-4 fw-bold text-primary"> Accounts List</h2>

// // //             {/* Dashboard Summary Cards */}
// // //             <div className="row mb-4 text-center">
// // //                 <div className="col-md-4">
// // //                     <div className="card shadow-sm p-3 rounded-4 border-0">
// // //                         <h6 className="text-muted">Total Accounts</h6>
// // //                         <h3 className="fw-bold text-primary">
// // //                             {accounts.length}
// // //                         </h3>
// // //                     </div>
// // //                 </div>

// // //                 <div className="col-md-4">
// // //                     <div className="card shadow-sm p-3 rounded-4 border-0">
// // //                         <h6 className="text-muted">Total Balance</h6>
// // //                         <h3 className="fw-bold text-success">
// // //                             ₹{accounts.reduce((sum, acc) => sum + acc.balance, 0)}
// // //                         </h3>
// // //                     </div>
// // //                 </div>

// // //                 <div className="col-md-4">
// // //                     <div className="card shadow-sm p-3 rounded-4 border-0">
// // //                         <h6 className="text-muted">Highest Balance</h6>
// // //                         <h3 className="fw-bold text-warning">
// // //                             ₹{accounts.length > 0
// // //                             ? Math.max(...accounts.map(a => a.balance))
// // //                             : 0}
// // //                         </h3>
// // //                     </div>
// // //                 </div>
// // //             </div>

// // //             {/* Create Account Form */}
// // //             <form onSubmit={handleCreateAccount} className="mb-4">
// // //                 <div className="row g-3">

// // //                     <div className="col-md-4 mb-2">
// // //                         <input
// // //                              type="text"
// // //                              className="form-control"
// // //                              placeholder="Account Holder Name"
// // //                              value={accountHolderName}
// // //                              onChange={(e) => setAccountHolderName(e.target.value)}
// // //                              required
// // //                         />
// // //                     </div>

// // //                     <div className="col-md-3 mb-2">
// // //                         <input
// // //                         type="number"
// // //                         className="form-control"
// // //                         placeholder="Initial Balance"
// // //                         value={balance}
// // //                         onChange={(e) => setBalance(Number(e.target.value))}
// // //                         min="0"
// // //                         required
// // //                         />
// // //                     </div>

// // //                     <div className="col-md-2 mb-2">
// // //                         <button type="submit" className="btn btn-primary w-100">Create</button>
// // //                     </div>
// // //                 </div>
// // //             </form>

// // //             <div className="mb-3">
// // //                 <input
// // //                 type="text"
// // //                 className="form-control"
// // //                 placeholder="Search by Account Name..."
// // //                 value={searchTerm}
// // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // //                 />
// // //             </div>

// // //             <div className="mb-5">
// // //                <Bar data={chartData} options={chartOptions}/>
// // //             </div>

// // //             {/* Accounts Table */}
// // //             <table className="table table-hover align-middle text-center">
// // //                 <thead className={darkMode ? "table-dark" : "table-primary"}>
// // //                     <tr>
// // //                         <th>ID</th>
// // //                         <th>Account</th>
// // //                         <th>Balance</th>
// // //                         <th>Actions</th>
// // //                     </tr>
// // //                 </thead>
// // //                 <tbody>
// // //                     {accounts
// // //                     .filter(account =>
// // //                         account.accountHolderName
// // //                           .toLowerCase()
// // //                           .includes(searchTerm.toLowerCase())
// // //                     )
// // //                     .map(account =>(
// // //                         <tr key={account.id}>
// // //                             <td>{account.id}</td>
// // //                             <td className="fw-semibold">{account.accountHolderName}</td>
// // //                             <td className="fw-bold text-success">₹{account.balance}</td>

// // //                             <td>
// // //                                 <button className="btn btn-info btn-sm me-2"
// // //                                 onClick={() => handleViewTransactions(account.id)}
// // //                                 >
// // //                                    View
// // //                                 </button>
// // //                                 <button 
// // //                                      className="btn btn-success btn-sm me-2"
// // //                                      onClick={() => handleDeposit(account.id)}
// // //                                 >
// // //                                     Deposit
// // //                                 </button>
// // //                                 <button 
// // //                                     className="btn btn-warning btn-sm me-2"
// // //                                     onClick={() => handleWithdraw(account.id)}
// // //                                 >
// // //                                     Withdraw
// // //                                 </button>
// // //                                 <button
// // //                                     className="btn btn-danger btn-sm"
// // //                                     onClick={() => handleDelete(account.id)}
// // //                                 >
// // //                                     Delete
// // //                                     </button>
// // //                             </td>

// // //                         </tr>
// // //                     ))}
// // //                 </tbody>


// // //             </table>

// // //             {/* TransactionHistory Section */}
// // //             {selectedAccountId && (
// // //                 <div className="mt-5">
// // //                     <h4 className="fw-bold">
// // //                         Transaction History (Account {selectedAccountId})
// // //                     </h4>

// // //                     <table className="table table-bordered mt-3">
// // //                         <thead className={darkMode ? "table-dark" : "table-light"}>
// // //                             <tr>
// // //                                 <th>ID</th>
// // //                                 <th>Type</th>
// // //                                 <th>Amount</th>
// // //                                 <th>Timestamp</th>
// // //                             </tr>
// // //                         </thead>
// // //                         <tbody>
// // //                             {transactions.map(tx => (
// // //                                 <tr key={tx.id}>
// // //                                     <td>{tx.id}</td>
// // //                                     <td>{tx.type}</td>
// // //                                     <td>{tx.amount}</td>
// // //                                     <td>
// // //                                         {new Date(tx.timestamp).toLocaleString()}
// // //                                     </td>   
// // //                                 </tr>
// // //                             ))}
// // //                         </tbody>

// // //                     </table>
// // //                 </div>
// // //             )}

// // //     </div>
// // //     )
// // // }

// // // export default AccountList;
// // //Old Accountlist code

// import React, { useEffect, useState } from "react";
// import { Eye, Plus, Minus, Trash } from "lucide-react";
// import AccountService from "../services/AccountService";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function AccountList({ darkMode }) {
//   const [accounts, setAccounts] = useState([]);
//   const [accountHolderName, setAccountHolderName] = useState("");
//   const [balance, setBalance] = useState(0);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedAccountId, setSelectedAccountId] = useState(null);
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     loadAccounts();
//   }, []);

//   const loadAccounts = () => {
//     AccountService.getAllAccounts()
//       .then((res) => setAccounts(res.data))
//       .catch((err) => console.error(err));
//   };

//   const handleCreateAccount = (e) => {
//     e.preventDefault();

//     const account = { accountHolderName, balance };

//     AccountService.createAccount(account).then(() => {
//       setAccountHolderName("");
//       setBalance(0);
//       loadAccounts();
//     });
//   };

//   const handleDeposit = (id) => {
//     const amount = prompt("Enter deposit amount:");
//     if (!amount) return;

//     AccountService.deposit(id, amount).then(loadAccounts);
//   };

//   const handleWithdraw = (id) => {
//     const amount = prompt("Enter withdraw amount:");
//     if (!amount) return;

//     AccountService.withdraw(id, amount).then(loadAccounts);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Delete this account?")) {
//       AccountService.deleteAccount(id).then(loadAccounts);
//     }
//   };

//   const handleViewTransactions = (id) => {
//     AccountService.getTransactions(id).then((res) => {
//       setTransactions(res.data);
//       setSelectedAccountId(id);
//     });
//   };

//   const chartData = {
//     labels: accounts.map((a) => a.accountHolderName),
//     datasets: [
//       {
//         label: "Balance",
//         data: accounts.map((a) => a.balance),
//         backgroundColor: "#3b82f6",
//       },
//     ],
//   };

//   return (
//     <div className={darkMode ? "bg-gray-900 text-white min-h-screen p-4" : "p-4"}>

//       {/* 🔥 SUMMARY CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

//         <div className={darkMode 
//   ? "bg-gray-800 text-white p-6 rounded-xl shadow" 
//   : "bg-white p-6 rounded-xl shadow"
// }>
//           <p className="text-gray-500">Total Accounts</p>
//           <h2 className="text-2xl font-bold text-blue-600">
//             {accounts.length}
//           </h2>
//         </div>

//         <div className={darkMode 
//   ? "bg-gray-800 text-white p-6 rounded-xl shadow" 
//   : "bg-white p-6 rounded-xl shadow"
// }>
//           <p className="text-gray-500">Total Balance</p>
//           <h2 className="text-2xl font-bold text-green-600">
//             ₹{accounts.reduce((sum, acc) => sum + acc.balance, 0)}
//           </h2>
//         </div>

//         <div className={darkMode 
//   ? "bg-gray-800 text-white p-6 rounded-xl shadow" 
//   : "bg-white p-6 rounded-xl shadow"
// }>
//           <p className="text-gray-500">Highest Balance</p>
//           <h2 className="text-2xl font-bold text-yellow-600">
//             ₹{accounts.length > 0
//               ? Math.max(...accounts.map((a) => a.balance))
//               : 0}
//           </h2>
//         </div>

//       </div>

//       {/* 🔥 CHART */}
//       <div className={darkMode 
//   ? "bg-gray-800 text-white p-6 rounded-xl shadow" 
//   : "bg-white p-6 rounded-xl shadow"
// }>
//         <h3 className="font-semibold mb-4">Account Overview</h3>
//         <Bar data={chartData} />
//       </div>

//       {/* 🔥 CREATE ACCOUNT */}
//       <div className={darkMode 
//   ? "bg-gray-800 text-white p-6 rounded-xl shadow" 
//   : "bg-white p-6 rounded-xl shadow"
// }>
//         <h3 className="font-semibold mb-4">Create Account</h3>

//         <form onSubmit={handleCreateAccount} className="grid md:grid-cols-3 gap-4">

//           <input
//             type="text"
//             placeholder="Account Holder Name"
//             value={accountHolderName}
//             onChange={(e) => setAccountHolderName(e.target.value)}
//             className="border px-3 py-2 rounded w-full"
//             required
//           />

//           <input
//             type="number"
//             placeholder="Balance"
//             value={balance}
//             onChange={(e) => setBalance(Number(e.target.value))}
//             className="border px-3 py-2 rounded w-full"
//             required
//           />

//           <button className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition">
//             Create
//           </button>

//         </form>
//       </div>

//       {/* 🔥 SEARCH */}
//       <input
//         type="text"
//         placeholder="Search..."
//         className="border px-3 py-2 rounded w-full mb-4"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       {/* 🔥 TABLE */}
//      <div className={darkMode 
//   ? "bg-gray-800 text-white p-6 rounded-xl shadow" 
//   : "bg-white p-6 rounded-xl shadow"
// }>
//   <h3 className="text-lg font-semibold mb-4">Accounts List</h3>

//   <div className="overflow-x-auto">
//     <table className="w-full text-sm">

//       {/* Header */}
//       <thead>
//         <tr className={
//           darkMode
//           ? "bg-gray-700 text-gray-300" 
//           : "bg-gray-100 text-gray-600"
//         }>
//           <th className="px-4 py-3 text-left">ID</th>
//           <th className="px-4 py-3 text-left">Name</th>
//           <th className="px-4 py-3 text-left">Balance</th>
//           <th className="px-4 py-3 text-left">Actions</th>
//         </tr>
//       </thead>

//       {/* Body */}
//       <tbody>
//         {/* {accounts
//           .filter((a) =>
//             a.accountHolderName
//               .toLowerCase()
//               .includes(searchTerm.toLowerCase())
//           )
//           .map((account) => (
//             <tr
//               key={account.id}
//               className="border-b hover:bg-gray-50 transition"
//             >
//               <td className="px-4 py-3">{account.id}</td>

//               <td className="px-4 py-3 font-medium">
//                 {account.accountHolderName}
//               </td>

//               <td className="px-4 py-3 text-green-600 font-semibold">
//                 ₹{account.balance}
//               </td> */}

// {accounts.length === 0 ? (
//     <tr>
//       <td colSpan="4" className="text-center py-6 text-gray-400">
//         No accounts found
//       </td>
//     </tr>
//   ) : (
//     accounts
//       .filter((a) =>
//         a.accountHolderName
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase())
//       )
//       .map((account) => (
//         <tr key={account.id} className={`border-b transition ${
//           darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
//         }`}>
//           <td className="px-4 py-3">{account.id}</td>
//           <td className="px-4 py-3 font-medium">
//             {account.accountHolderName}
//           </td>
//           <td className="px-4 py-3 text-green-600 font-semibold">
//             ₹{account.balance}
//           </td>

//               <td className="px-4 py-3">
//                 <div className="flex flex-wrap gap-2">

//                   <button
//                     onClick={() => handleViewTransactions(account.id)}
//                     className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 flex items-center gap-1"
//                   >
//                     <Eye size={14} /> View
//                   </button>

//                   <button
//                     onClick={() => handleDeposit(account.id)}
//                     className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded hover:bg-green-200 flex items-center gap-1"
//                   >
//                     <Plus size={14} /> Deposit
//                   </button>

//                   <button
//                     onClick={() => handleWithdraw(account.id)}
//                     className="px-3 py-1 text-xs bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-200 flex items-center gap-1"
//                   >
//                     <Minus size={14} /> Withdraw
//                   </button>

//                   <button
//                     onClick={() => handleDelete(account.id)}
//                     className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200 flex items-center gap-1"
//                   >
//                     <Trash size={14} /> Delete
//                   </button>

//                 </div>
//               </td>
//             </tr>
//           ))
//         )}
//       </tbody>

//     </table>
//   </div>
// </div>

// {/* 🔥 TRANSACTIONS */}
// {selectedAccountId !== null && (
//   <div className={darkMode 
//   ? "bg-gray-800 text-white p-6 rounded-xl shadow" 
//   : "bg-white p-6 rounded-xl shadow"
// }>
//     <h3 className="text-lg font-semibold mb-4">
//       Transactions (Account {selectedAccountId})
//     </h3>

//     <table className="w-full text-sm">
//       <thead>
//         <tr className="bg-gray-100 text-gray-600 text-xs uppercase">
//           <th className="px-4 py-2 text-left">ID</th>
//           <th className="px-4 py-2 text-left">Type</th>
//           <th className="px-4 py-2 text-left">Amount</th>
//           <th className="px-4 py-2 text-left">Time</th>
//         </tr>
//       </thead>

//       <tbody>
//         {transactions.length === 0 ? (
//           <tr>
//             <td colSpan="4" className="text-center py-4 text-gray-400">
//               No transactions found
//             </td>
//           </tr>
//         ) : (
//           transactions.map((tx) => (
//             <tr key={tx.id} className="border-b">
//               <td className="px-4 py-2">{tx.id}</td>
//               <td className="px-4 py-2">{tx.type}</td>
//               <td className="px-4 py-2 text-green-600 font-semibold">
//                 ₹{tx.amount}
//               </td>
//               <td className="px-4 py-2">
//                     {new Date(tx.timestamp).toLocaleString("en-IN", {
//                         timeZone: "Asia/Kolkata",
//                         day: "2-digit",
//                         month: "short",
//                         year: "numeric",
//                         hour: "2-digit",
//                         minute: "2-digit",
//                         hour12: true
//                         })}
//               </td>
//             </tr>
//           ))
//         )}
//       </tbody>
//     </table>
//   </div>
// )}

//     </div>
//   );
// }

// export default AccountList;

// // import React, { useEffect, useState } from "react";
// // import { Eye, Plus, Minus, Trash } from "lucide-react";
// // import AccountService from "../services/AccountService";

// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   Tooltip,
// //   Legend,
// // } from "chart.js";
// // import { Bar } from "react-chartjs-2";

// // ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// // function AccountList({ darkMode }) {
// //   const [accounts, setAccounts] = useState([]);
// //   const [accountHolderName, setAccountHolderName] = useState("");
// //   const [balance, setBalance] = useState(0);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [selectedAccountId, setSelectedAccountId] = useState(null);
// //   const [transactions, setTransactions] = useState([]);

// //   console.log("Accounts:", accounts);

// //   useEffect(() => {
// //     loadAccounts();
// //   }, []);

// //   const loadAccounts = () => {
// //     AccountService.getAllAccounts()
// //       .then((res) => setAccounts(res.data))
// //       .catch((err) => console.error(err));
// //   };

// //   const handleCreateAccount = (e) => {
// //     e.preventDefault();
// //     AccountService.createAccount({ accountHolderName, balance }).then(() => {
// //       setAccountHolderName("");
// //       setBalance(0);
// //       loadAccounts();
// //     });
// //   };

// //   const handleDeposit = (id) => {
// //     const amount = prompt("Enter deposit amount:");
// //     if (!amount) return;
// //     //AccountService.deposit(id, amount).then(() => loadAccounts());
// //     AccountService.deposit(id, Number(amount))
// //   };

// //   const handleWithdraw = (id) => {
// //     const amount = prompt("Enter withdraw amount:");
// //     if (!amount) return;
// //     //AccountService.withdraw(id, amount).then(() => loadAccounts());
// //     AccountService.withdraw(id, Number(amount))
// //   };

// //   const handleDelete = (id) => {
// //     if (window.confirm("Delete this account?")) {
// //       AccountService.deleteAccount(id).then(() => loadAccounts());
// //     }
// //   };

// //   const handleViewTransactions = (id) => {
// //     AccountService.getTransactions(id).then((res) => {
// //       setTransactions(res.data);
// //       setSelectedAccountId(id);
// //     });
// //   };

// //   const chartData = {
// //     labels: accounts.map((a) => a.accountHolderName),
// //     datasets: [
// //       {
// //         label: "Balance",
// //         data: accounts.map((a) => a.balance),
// //         backgroundColor: "#3b82f6",
// //       },
// //     ],
// //   };

// //   return (
// //     <div className={darkMode ? "bg-gray-900 text-white min-h-screen p-4" : "p-4"}>

// //       {/* 🔥 SUMMARY */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

// //         <div className={darkMode ? "bg-gray-800 p-6 rounded-xl shadow" : "bg-white p-6 rounded-xl shadow"}>
// //           <p className="text-gray-500">Total Accounts</p>
// //           <h2 className="text-2xl font-bold text-blue-600">{accounts.length}</h2>
// //         </div>

// //         <div className={darkMode ? "bg-gray-800 p-6 rounded-xl shadow" : "bg-white p-6 rounded-xl shadow"}>
// //           <p className="text-gray-500">Total Balance</p>
// //           <h2 className="text-2xl font-bold text-green-600">
// //             ₹{accounts.reduce((sum, acc) => sum + acc.balance, 0).toLocaleString()}
// //           </h2>
// //         </div>

// //         <div className={darkMode ? "bg-gray-800 p-6 rounded-xl shadow" : "bg-white p-6 rounded-xl shadow"}>
// //           <p className="text-gray-500">Highest Balance</p>
// //           <h2 className="text-2xl font-bold text-yellow-600">
// //             ₹{accounts.length > 0 ? Math.max(...accounts.map((a) => a.balance)).toLocaleString() : 0}
// //           </h2>
// //         </div>

// //       </div>

// //       {/* 🔥 CHART */}
// //       <div className={darkMode ? "bg-gray-800 p-6 rounded-xl shadow mb-6" : "bg-white p-6 rounded-xl shadow mb-6"}>
// //         <h3 className="font-semibold mb-4">Account Overview</h3>
// //         <Bar data={chartData} />
// //       </div>

// //       {/* 🔥 CREATE ACCOUNT */}
// //       <div className={darkMode ? "bg-gray-800 p-6 rounded-xl shadow mb-6" : "bg-white p-6 rounded-xl shadow mb-6"}>
// //         <h3 className="font-semibold mb-4">Create Account</h3>

// //         <form onSubmit={handleCreateAccount} className="grid md:grid-cols-3 gap-4">
// //           <input
// //             type="text"
// //             placeholder="Account Holder Name"
// //             value={accountHolderName}
// //             onChange={(e) => setAccountHolderName(e.target.value)}
// //             className={`border px-3 py-2 rounded w-full ${
// //               darkMode ? "bg-gray-700 text-white border-gray-600" : ""
// //             }`}
// //             required
// //           />

// //           <input
// //             type="number"
// //             placeholder="Balance"
// //             value={balance}
// //             onChange={(e) => setBalance(Number(e.target.value))}
// //             className={`border px-3 py-2 rounded w-full ${
// //               darkMode ? "bg-gray-700 text-white border-gray-600" : ""
// //             }`}
// //             required
// //           />

// //           <button className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition">
// //             Create
// //           </button>
// //         </form>
// //       </div>

// //       {/* 🔥 SEARCH */}
// //       <input
// //         type="text"
// //         placeholder="Search..."
// //         className={`border px-3 py-2 rounded w-full mb-4 ${
// //           darkMode ? "bg-gray-800 text-white border-gray-600" : ""
// //         }`}
// //         value={searchTerm}
// //         onChange={(e) => setSearchTerm(e.target.value)}
// //       />

// //       {/* 🔥 TABLE */}
// //       <div className={darkMode ? "bg-gray-800 p-6 rounded-xl shadow" : "bg-white p-6 rounded-xl shadow"}>
// //         <h3 className="text-lg font-semibold mb-4">Accounts List</h3>

// //         <div className="overflow-x-auto">
// //           <table className="w-full text-sm">

// //             <thead>
// //               <tr
// //                 className={
// //                   darkMode
// //                     ? "bg-gray-700 text-gray-300 uppercase text-xs"
// //                     : "bg-gray-100 text-gray-600 uppercase text-xs"
// //                 }
// //               >
// //                 <th className="px-4 py-3 text-left">ID</th>
// //                 <th className="px-4 py-3 text-left">Name</th>
// //                 <th className="px-4 py-3 text-left">Balance</th>
// //                 <th className="px-4 py-3 text-left">Actions</th>
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {accounts.length === 0 ? (
// //                 <tr>
// //                   <td colSpan="4" className="text-center py-6 text-gray-400">
// //                     No accounts found
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 accounts
// //                   .filter((a) =>
// //                     a.accountHolderName.toLowerCase().includes(searchTerm.toLowerCase())
// //                   )
// //                   .map((account) => (
// //                     <tr
// //                       key={account.id}
// //                       className={`border-b transition ${
// //                         darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
// //                       }`}
// //                     >
// //                       <td className="px-4 py-3">{account.id}</td>
// //                       <td className="px-4 py-3 font-medium">{account.accountHolderName}</td>
// //                       <td className="px-4 py-3 text-green-600 font-semibold">
// //                         ₹{account.balance.toLocaleString()}
// //                       </td>

// //                       <td className="px-4 py-3">
// //                         <div className="flex flex-wrap gap-2">

// //                           <button
// //                             onClick={() => handleViewTransactions(account.id)}
// //                             className={`px-3 py-1 text-xs rounded flex items-center gap-1 ${
// //                               darkMode
// //                                 ? "bg-blue-800 text-blue-200 hover:bg-blue-700"
// //                                 : "bg-blue-100 text-blue-600 hover:bg-blue-200"
// //                             }`}
// //                           >
// //                             <Eye size={14} /> View
// //                           </button>

// //                           <button
// //                             onClick={() => handleDeposit(account.id)}
// //                             className={`px-3 py-1 text-xs rounded flex items-center gap-1 ${
// //                               darkMode
// //                                 ? "bg-green-800 text-green-200 hover:bg-green-700"
// //                                 : "bg-green-100 text-green-600 hover:bg-green-200"
// //                             }`}
// //                           >
// //                             <Plus size={14} /> Deposit
// //                           </button>

// //                           <button
// //                             onClick={() => handleWithdraw(account.id)}
// //                             className={`px-3 py-1 text-xs rounded flex items-center gap-1 ${
// //                               darkMode
// //                                 ? "bg-yellow-700 text-yellow-200 hover:bg-yellow-600"
// //                                 : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
// //                             }`}
// //                           >
// //                             <Minus size={14} /> Withdraw
// //                           </button>

// //                           <button
// //                             onClick={() => handleDelete(account.id)}
// //                             className={`px-3 py-1 text-xs rounded flex items-center gap-1 ${
// //                               darkMode
// //                                 ? "bg-red-800 text-red-200 hover:bg-red-700"
// //                                 : "bg-red-100 text-red-600 hover:bg-red-200"
// //                             }`}
// //                           >
// //                             <Trash size={14} /> Delete
// //                           </button>

// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ))
// //               )}
// //             </tbody>

// //           </table>
// //         </div>
// //       </div>

// //       {/* 🔥 TRANSACTIONS */}
// //       {selectedAccountId !== null && (
// //         <div className={darkMode ? "bg-gray-800 p-6 rounded-xl shadow mt-6" : "bg-white p-6 rounded-xl shadow mt-6"}>
// //           <h3 className="text-lg font-semibold mb-4">
// //             Transactions (Account {selectedAccountId})
// //           </h3>

// //           <table className="w-full text-sm">
// //             <thead>
// //               <tr className={darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"}>
// //                 <th className="px-4 py-2 text-left">ID</th>
// //                 <th className="px-4 py-2 text-left">Type</th>
// //                 <th className="px-4 py-2 text-left">Amount</th>
// //                 <th className="px-4 py-2 text-left">Time</th>
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {transactions.length === 0 ? (
// //                 <tr>
// //                   <td colSpan="4" className="text-center py-4 text-gray-400">
// //                     No transactions found
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 transactions.map((tx) => (
// //                   <tr key={tx.id} className="border-b">
// //                     <td className="px-4 py-2">{tx.id}</td>
// //                     <td className="px-4 py-2">{tx.type}</td>
// //                     <td className="px-4 py-2 text-green-600 font-semibold">
// //                       ₹{tx.amount.toLocaleString()}
// //                     </td>
// //                     <td className="px-4 py-2">
// //                       {new Date(tx.timestamp).toLocaleString("en-IN", {
// //                         timeZone: "Asia/Kolkata",
// //                       })}
// //                     </td>
// //                   </tr>
// //                 ))
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}

// //     </div>
// //   );
// // }
 
// // export default AccountList;