// import React, { useEffect, useState, useMemo } from "react";
// import { Eye, Plus, Minus, Trash } from "lucide-react";
// import AccountService from "../services/AccountService";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

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

//     AccountService.createAccount({ accountHolderName, balance }).then(() => {
//       setAccountHolderName("");
//       setBalance(0);
//       loadAccounts();
//     });
//   };

//   const handleDeposit = (id) => {
//     const amount = prompt("Enter deposit amount:");
//     if (!amount || isNaN(amount)) return;

//     AccountService.deposit(id, Number(amount)).then(() => loadAccounts());
//   };

//   const handleWithdraw = (id) => {
//     const amount = prompt("Enter withdraw amount:");
//     if (!amount || isNaN(amount)) return;

//     AccountService.withdraw(id, Number(amount)).then(() => loadAccounts());
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Delete this account?")) {
//       AccountService.deleteAccount(id).then(() => loadAccounts());
//     }
//   };

//   const handleViewTransactions = (id) => {
//     AccountService.getTransactions(id).then((res) => {
//       setTransactions(res.data);
//       setSelectedAccountId(id);
//     });
//   };

//   const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

//   const chartData = useMemo(() => ({
//     labels: accounts.map((a) => a.accountHolderName),
//     datasets: [
//       {
//         label: "Balance",
//         data: accounts.map((a) => a.balance),
//         backgroundColor: "#3b82f6",
//       },
//     ],
//   }), [accounts]);

//   return (
//     <div className="p-4">

//       {/* SUMMARY */}
//       <div className="grid md:grid-cols-3 gap-6 mb-6">

//         <div className={`${darkMode ? "bg-gray-700" : "bg-white"} p-6 rounded-xl shadow`}>
//           <p className={darkMode ? "text-gray-300" : "text-gray-500"}>Total Accounts</p>
//           <h2 className="text-2xl font-bold text-blue-600">{accounts.length}</h2>
//         </div>

//         <div className={`${darkMode ? "bg-gray-700" : "bg-white"} p-6 rounded-xl shadow`}>
//           <p className={darkMode ? "text-gray-300" : "text-gray-500"}>Total Balance</p>
//           <h2 className="text-2xl font-bold text-green-600">
//             ₹{totalBalance.toLocaleString()}
//           </h2>
//         </div>

//         <div className={`${darkMode ? "bg-gray-700" : "bg-white"} p-6 rounded-xl shadow`}>
//           <p className={darkMode ? "text-gray-300" : "text-gray-500"}>Highest Balance</p>
//           <h2 className="text-2xl font-bold text-yellow-600">
//             ₹{accounts.length > 0 ? Math.max(...accounts.map(a => a.balance)).toLocaleString() : 0}
//           </h2>
//         </div>

//       </div>

//       {/* CHART */}
//       <div className={`${darkMode ? "bg-gray-700" : "bg-white"} p-6 rounded-xl shadow mb-6`}>
//         <h3 className={`font-semibold mb-4 ${darkMode ? "text-white" : ""}`}>Account Overview</h3>
//         <Bar data={chartData} />
//       </div>

//       {/* CREATE */}
//       <div className={`${darkMode ? "bg-gray-700" : "bg-white"} p-6 rounded-xl shadow mb-6`}>
//         <h3 className={`font-semibold mb-4 ${darkMode ? "text-white" : ""}`}>Create Account</h3>

//         <form onSubmit={handleCreateAccount} className="grid md:grid-cols-3 gap-4">
//           <input
//             type="text"
//             placeholder="Account Holder Name"
//             value={accountHolderName}
//             onChange={(e) => setAccountHolderName(e.target.value)}
//             className={`border px-3 py-2 rounded ${darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white"}`}
//             required
//           />

//           <input
//             type="number"
//             placeholder="Balance"
//             value={balance}
//             onChange={(e) => setBalance(Number(e.target.value))}
//             className={`border px-3 py-2 rounded ${darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white"}`}
//             required
//           />

//           <button className="bg-blue-600 text-white rounded px-4 py-2">
//             Create
//           </button>
//         </form>
//       </div>

//       {/* TABLE */}
//       <div className={`${darkMode ? "bg-gray-700" : "bg-white"} p-6 rounded-xl shadow`}>
//         <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : ""}`}>Accounts</h3>

//         <table className="w-full text-sm">
//           <tbody>
//             {accounts.map((account) => (
//               <tr key={account.id} className={`border-b ${darkMode ? "border-gray-600" : ""}`}>
//                 <td className={darkMode ? "text-white" : ""}>{account.accountHolderName}</td>
//                 <td className={darkMode ? "text-white" : ""}>₹{account.balance.toLocaleString()}</td>

//                 <td className="flex gap-2">
//                   <button onClick={() => handleDeposit(account.id)} className={`${darkMode ? "text-green-400 hover:text-green-300" : "text-green-600 hover:text-green-700"}`}><Plus size={14} /></button>
//                   <button onClick={() => handleWithdraw(account.id)} className={`${darkMode ? "text-yellow-400 hover:text-yellow-300" : "text-yellow-600 hover:text-yellow-700"}`}><Minus size={14} /></button>
//                   <button onClick={() => handleDelete(account.id)} className={`${darkMode ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-700"}`}><Trash size={14} /></button>
//                   <button onClick={() => handleViewTransactions(account.id)} className={`${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"}`}><Eye size={14} /></button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//     </div>
//   );
// }

// export default AccountList;

import React, { useEffect, useState, useMemo } from "react";
import { Eye, Plus, Minus, Trash } from "lucide-react";
import AccountService from "../services/AccountService";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function AccountList({ darkMode }) {
  const [accounts, setAccounts] = useState([]);
  const [accountHolderName, setAccountHolderName] = useState("");
  const [balance, setBalance] = useState(0);

  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loadingTx, setLoadingTx] = useState(false);

  const [filterType, setFilterType] = useState("ALL");

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = () => {
    AccountService.getAllAccounts()
      .then((res) => setAccounts(res.data))
      .catch((err) => console.error(err));
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    AccountService.createAccount({ accountHolderName, balance }).then(() => {
      setAccountHolderName("");
      setBalance(0);
      loadAccounts();

      // notify dashboard
      window.dispatchEvent(new Event("accountsUpdated"));
    });
  };

  const handleDeposit = (id) => {
    const amount = prompt("Enter deposit amount:");
    if (!amount || isNaN(amount)) return;
    AccountService.deposit(id, Number(amount)).then(() => {
      loadAccounts();

      // notify dashboard
      window.dispatchEvent(new Event("accountsUpdated"));
    });
  };

  const handleWithdraw = (id) => {
    const amount = prompt("Enter withdraw amount:");
    if (!amount || isNaN(amount)) return;
    AccountService.withdraw(id, Number(amount)).then(() => {
      loadAccounts();

      // notify dashboard
      window.dispatchEvent(new Event("accountsUpdated"));
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this account?")) {
      AccountService.deleteAccount(id).then(() => {
        loadAccounts();
      
        // notify dashboard
        window.dispatchEvent(new Event("accountsUpdated"));
      });
    }
  };

  const handleViewTransactions = (id) => {
    setLoadingTx(true);
    AccountService.getTransactions(id)
      .then((res) => {
        setTransactions(res.data);
        setSelectedAccountId(id);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingTx(false));
  };

  // ✅ FILTER WITH TIMESTAMP
  const getFilteredTransactions = () => {
    if (filterType === "ALL") return transactions;

    const now = new Date();

    return transactions.filter((tx) => {
      if (!tx.timestamp) return false;

      const txDate = new Date(tx.timestamp);
      const diff = now - txDate;

      if (filterType === "7D") return diff <= 7 * 24 * 60 * 60 * 1000;
      if (filterType === "30D") return diff <= 30 * 24 * 60 * 60 * 1000;

      return true;
    });
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  const chartData = useMemo(() => ({
    labels: accounts.map((a) => a.accountHolderName),
    datasets: [
      {
        label: "Balance",
        data: accounts.map((a) => a.balance),
        backgroundColor: "#3b82f6",
      },
    ],
  }), [accounts]);

  return (
    <div className="p-4">

      {/* SUMMARY */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className={`${darkMode ? "bg-gray-700" : "bg-white"} p-6 rounded-xl shadow
        transition-all duration-300 
        hover:shadow-lg hover:-translate-y-1 
        hover:border-purple-400 border group`}>
          <p>Total Accounts</p>
          <h2 className="text-2xl font-bold text-blue-600 transition-all duration-300 group-hover:scale-105">{accounts.length}</h2>
        </div>

        <div className={`${darkMode ? "bg-gray-700" : "bg-white"} p-6 rounded-xl shadow
        transition-all duration-300 
        hover:shadow-lg hover:-translate-y-1 
        hover:border-purple-400 border group`}>
          <p>Total Balance</p>
          <h2 className="text-2xl font-bold text-green-600 transition-all duration-300 group-hover:scale-105">
            ₹{totalBalance.toLocaleString()}
          </h2>
        </div>

        <div className={`${darkMode ? "bg-gray-700" : "bg-white"} p-6 rounded-xl shadow
        transition-all duration-300 
        hover:shadow-lg hover:-translate-y-1 
        hover:border-purple-400 border group`}>
          <p>Highest Balance</p>
          <h2 className="text-2xl font-bold text-yellow-600 transition-all duration-300 group-hover:scale-105">
            ₹{accounts.length > 0 ? Math.max(...accounts.map(a => a.balance)) : 0}
          </h2>
        </div>
      </div>

      {/* CHART */}
      <div className={`${darkMode ? "bg-gray-700" : "bg-white"} p-6 rounded-xl shadow mb-6`}>
        <Bar data={chartData} />
      </div>

      {/* CREATE */}
      <form onSubmit={handleCreateAccount} className="mb-6 flex gap-3">
        <input
          placeholder="Name"
          value={accountHolderName}
          onChange={(e) => setAccountHolderName(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Balance"
          value={balance}
          onChange={(e) => setBalance(Number(e.target.value))}
          className="border px-3 py-2 rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg 
        transition-all duration-200 
        hover:bg-blue-700 hover:scale-105 
        active:scale-95 shadow-sm hover:shadow-md">Create</button>
      </form>

      {/* TABLE */}
      <table className="w-full">
        <tbody>
          {accounts.map((acc) => (
            <tr key={acc.id} className={`border-b transition-colors duration-200 ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}>
              <td>{acc.accountHolderName}</td>
              <td>₹{acc.balance}</td>

              <td className="flex gap-2">

                <button className="p-2 bg-green-100 text-green-600 rounded 
                  transition-all duration-200 
                  hover:bg-green-200 hover:scale-110 
                  active:scale-95 hover:shadow-md cursor-pointer"
                  onClick={() => handleDeposit(acc.id)}>
                  <Plus size={16} />
                </button>

                <button className="p-2 bg-yellow-100 text-yellow-600 rounded 
                  transition-all duration-200 
                  hover:bg-yellow-200 hover:scale-110 
                  active:scale-95 hover:shadow-md cursor-pointer"
                  onClick={() => handleWithdraw(acc.id)}>
                  <Minus size={16} />
                </button>

                <button className="p-2 bg-red-100 text-red-600 rounded 
                  transition-all duration-200 
                  hover:bg-red-200 hover:scale-110 
                  active:scale-95 hover:shadow-md cursor-pointer"
                  onClick={() => handleDelete(acc.id)}>
                  <Trash size={16} />
                </button>

                <button className="p-2 bg-blue-100 text-blue-600 rounded 
                  transition-all duration-200 
                  hover:bg-blue-200 hover:scale-110 
                  active:scale-95 hover:shadow-md cursor-pointer"
                  onClick={() => handleViewTransactions(acc.id)}>
                  <Eye size={16} />
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {selectedAccountId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className={`${darkMode ? "bg-gray-800 text-white" : "bg-white"} w-full max-w-2xl p-6 rounded-xl`}>

            <div className="flex justify-between mb-4">
              <h2>Transactions ({transactions.length})</h2>
              <button onClick={() => setSelectedAccountId(null)}
                 className="text-gray-500 hover:text-red-500 transition">✕</button>
            </div>

            {/* FILTER */}
            <div className="flex gap-2 mb-4">
              {["ALL", "7D", "30D"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 rounded ${
                    filterType === type
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {loadingTx ? (
              <p>Loading...</p>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Date & Time</th>
                    </tr>
                  </thead>

                  <tbody>
                    {getFilteredTransactions()
                      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                      .map((tx, i) => (
                        <tr key={i}>

                          <td className={tx.type === "DEPOSIT" ? "text-green-600" : "text-red-600"}>
                            {tx.type}
                          </td>

                          <td>₹{tx.amount}</td>

                          <td>
                            {tx.timestamp
                              ? new Date(tx.timestamp).toLocaleString("en-IN", {
                                  timeZone: "Asia/Kolkata",
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                })
                              : "N/A"}
                          </td>

                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

export default AccountList;