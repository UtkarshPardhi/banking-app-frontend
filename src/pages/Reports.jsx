// import { useOutletContext } from "react-router-dom";
// import { BarChart3, PieChart, TrendingUp, Download } from "lucide-react";

// function Reports() {
//     const { darkMode } = useOutletContext();

//     return (
//         <div className="space-y-6">
//             <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : ""}`}>Reports & Analytics</h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <div className={`${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-100"} p-6 rounded-xl border shadow-sm`}>
//                     <div className="flex items-center gap-3">
//                         <div className="p-3 bg-blue-100 rounded-lg">
//                             <BarChart3 size={24} className="text-blue-600" />
//                         </div>
//                         <div>
//                             <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>Transaction Volume</p>
//                             <p className={`text-xl font-bold ${darkMode ? "text-white" : ""}`}>1,234</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className={`${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-100"} p-6 rounded-xl border shadow-sm`}>
//                     <div className="flex items-center gap-3">
//                         <div className="p-3 bg-green-100 rounded-lg">
//                             <TrendingUp size={24} className="text-green-600" />
//                         </div>
//                         <div>
//                             <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>Total Deposits</p>
//                             <p className="text-xl font-bold text-green-600">₹45,678</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className={`${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-100"} p-6 rounded-xl border shadow-sm`}>
//                     <div className="flex items-center gap-3">
//                         <div className="p-3 bg-red-100 rounded-lg">
//                             <PieChart size={24} className="text-red-600" />
//                         </div>
//                         <div>
//                             <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>Total Withdrawals</p>
//                             <p className="text-xl font-bold text-red-600">₹12,345</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className={`${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-100"} p-6 rounded-xl border shadow-sm`}>
//                     <div className="flex items-center gap-3">
//                         <div className="p-3 bg-purple-100 rounded-lg">
//                             <Download size={24} className="text-purple-600" />
//                         </div>
//                         <div>
//                             <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>Export Data</p>
//                             <p className={`text-xl font-bold ${darkMode ? "text-white" : ""}`}>CSV / PDF</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className={`${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-100"} p-6 rounded-xl border shadow-sm`}>
//                 <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : ""}`}>Monthly Summary</h3>
//                 <p className={`${darkMode ? "text-gray-300" : "text-gray-500"}`}>
//                     Transaction reports and analytics will appear here.
//                 </p>
//             </div>
//         </div>
//     );
// }

// export default Reports;

import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { BarChart3, PieChart as PieChartIcon, TrendingUp, Download } from "lucide-react";
import AccountService from "../services/AccountService";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

function Reports() {
    const { darkMode } = useOutletContext();

    const [loading, setLoading] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [selectedAccountId, setSelectedAccountId] = useState("");
    const [filter, setFilter] = useState("");
    const [stats, setStats] = useState({
        totalTransactions: 0,
        totalCredit: 0,
        totalDebit: 0,
    });

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(amount || 0);
    };

    useEffect(() => {
        AccountService.getAllAccounts()
            .then(res => {
            console.log("Accounts:", res.data);
            setAccounts(res.data);
        })//setAccounts(res.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
  if (!selectedAccountId) {
    setStats({
      totalTransactions: 0,
      totalCredit: 0,
      totalDebit: 0,
    });
    return;
  }

  setLoading(true);

  AccountService.getStats(selectedAccountId)
  .then(res => {
    setStats(res.data);
  })
  .catch(err => console.error("Stats error:", err))
  .finally(() => setLoading(false));

}, [selectedAccountId]);

//     useEffect(() => {
//   if (!selectedAccountId) return;

//   console.log("Selected account:", selectedAccountId);

//   AccountService.getStats(selectedAccountId)
//     .then(res => {
//       console.log("Stats response:", res.data);
//       setStats(res.data);
//     })
//     .catch(err => {
//       console.error("Stats error:", err.response?.status);
//     });

// }, [selectedAccountId]);

    // ✅ DOWNLOAD FUNCTIONS

    const downloadExcel = async () => {
        if (!selectedAccountId) {
    alert("Select account first");
    return;
  }

  try {
    const response = await AccountService.getExcel(selectedAccountId, filter);

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "statement.xlsx";
    a.click();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Excel download error:", error);
  }
};

    const downloadCSV = async () => {
       if (!selectedAccountId) {
    alert("Select account first");
    return;
  }

  try {
    const response = await AccountService.getCSV(selectedAccountId, filter);

    const blob = new Blob([response.data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download error:", error);
  }
    };

    const downloadPDF = async () => {
        if (!selectedAccountId) {
    alert("Select account first");
    return;
  }

  try {
    const response = await AccountService.getPDF(selectedAccountId, filter);

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "statement.pdf";
    a.click();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download error:", error);
  }
    };

    const chartData = [
  { name: "Deposits", value: stats.totalCredit },
  { name: "Withdrawals", value: stats.totalDebit },
];

const COLORS = ["#8b5cf6", "#94a3b8"];

    return (
        <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : ""}`}>
                Reports & Analytics
            </h2>

            {/* CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                <div className={`${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-100"} 
                      p-6 rounded-xl border shadow-sm 
                      transition-all duration-300 
                      hover:shadow-lg hover:-translate-y-1 hover:border-purple-400 group`}>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 rounded-lg transition-all duration-300 group-hover:scale-110">
                            <BarChart3 size={24} className="text-blue-600" />
                        </div>
                        <div>
                            <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>Transaction Volume</p>
                            <p className={`text-xl font-bold ${darkMode ? "text-white" : ""}`}>{stats.totalTransactions}</p>
                        </div>
                    </div>
                </div>

                <div className={`${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-100"} 
                                p-6 rounded-xl border shadow-sm 
                                transition-all duration-300 
                                hover:shadow-lg hover:-translate-y-1 hover:border-purple-400 group`}>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-100 rounded-lg transition-all duration-300 group-hover:scale-110">
                            <TrendingUp size={24} className="text-green-600" />
                        </div>
                        <div>
                            <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>Total Deposits</p>
                            <p className="text-xl font-bold text-green-600">{formatCurrency(stats.totalCredit)}</p>
                        </div>
                    </div>
                </div>

                <div className={`${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-100"} 
                                    p-6 rounded-xl border shadow-sm 
                                    transition-all duration-300 
                                    hover:shadow-lg hover:-translate-y-1 hover:border-purple-400 group`}>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-red-100 rounded-lg transition-all duration-300 group-hover:scale-110">
                            <PieChartIcon size={24} className="text-red-600" />
                        </div>
                        <div>
                            <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>Total Withdrawals</p>
                            <p className="text-xl font-bold text-red-600">{formatCurrency(stats.totalDebit)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🔥 EXPORT SECTION */}
            <div className={`${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-100"} p-6 rounded-xl border shadow-sm`}>

                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : ""}`}>
                    Download Account Statement
                </h3>

                {/* ACCOUNT SELECT */}
                <div className="flex flex-col md:flex-row gap-4 items-center">

                    <select
                        value={selectedAccountId}
                        onChange={(e) => setSelectedAccountId(e.target.value)}
                        className="border px-3 py-2 rounded w-full md:w-64"
                    >
                        <option value="">Select Account</option>
                        {accounts.map(acc => (
                            <option key={acc.id} value={acc.id}>
                                {acc.accountHolderName}
                            </option>
                        ))}
                    </select>

                  {/* Filter */}
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="border px-3 py-2 rounded"
                        >
                        <option value="">All</option>
                        <option value="7D">Last 7 Days</option>
                        <option value="30D">Last 30 Days</option>
                    </select>

                    {/* BUTTONS */}
                    <div className="flex gap-3">

                        <button
                            onClick={downloadExcel}
                            disabled={!selectedAccountId}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded 
                                        transition-all duration-200 
                                        hover:scale-105 active:scale-95 
                                        shadow-sm hover:shadow-md 
                                        disabled:opacity-50 disabled:cursor-not-allowed">
                            Download Excel
                        </button>

                        <button
                            onClick={downloadCSV}
                            disabled={!selectedAccountId}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded 
                                        transition-all duration-200 
                                        hover:scale-105 active:scale-95 
                                        shadow-sm hover:shadow-md 
                                        disabled:opacity-50 disabled:cursor-not-allowed"
                                                                >
                            Download CSV
                        </button>

                        <button
                            onClick={downloadPDF}
                            disabled={!selectedAccountId}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded 
                                        transition-all duration-200 
                                        hover:scale-105 active:scale-95 
                                        shadow-sm hover:shadow-md 
                                        disabled:opacity-50 disabled:cursor-not-allowed"
                                                                >
                            Download PDF
                        </button>

                    </div>

                </div>

            </div>

            {/* EXISTING SECTION */}
            <div className={`${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-100"} p-6 rounded-xl border shadow-sm`}>

  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : ""}`}>
    Analytics Overview
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[250px]">
    {loading ? (
        <div className="col-span-2 flex justify-center items-center text-gray-400">
          Loading analytics...
        </div>
      ) : stats.totalCredit === 0 && stats.totalDebit === 0 ? (
        <div className="col-span-2 flex items-center justify-center text-gray-400">
          No transaction data available
        </div>
      ) : (
    <>
      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            contentStyle={{
              backgroundColor: "#576271",
              border: "none",
              borderRadius: "8px",
              color: "#fff"
              }}
          />
          <Bar dataKey="value" animationDuration={500}>
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Pie Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            outerRadius={80}
            label
            isAnimationActive={true}
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip 
           contentStyle={{
              backgroundColor: "#576271",
              border: "none",
              borderRadius: "8px",
              color: "#fff"
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  )}

    </div>
</div>
</div>
    );
}

export default Reports;