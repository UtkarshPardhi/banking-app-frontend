import React, { useEffect, useState } from "react";
import AccountService from "../services/AccountService";
import { Chart as ChartJS,
         CategoryScale,
         LinearScale,
         BarElement,
         Title,
         Tooltip,
         Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

function AccountList({ darkMode }) {

    const [accounts, setAccounts] = useState([]);
    const [accountHolderName, setAccountHolderName] = useState("");
    const [balance, setBalance] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        loadAccounts();
    }, []);

    const loadAccounts = () => {
        AccountService.getAllAccounts()
        .then((response) => {
            setAccounts(response.data);
        })
        .catch((error) => {
            console.error("Error fetching accounts:", error);
        });
    };

    const handleCreateAccount = (e) => {
        e.preventDefault();

        const account = {
            accountHolderName,
            balance
        };

        AccountService.createAccount(account)
        .then(() => {
            setAccountHolderName("");
            setBalance("");
            loadAccounts();
        })
        .catch(error => console.error(error));
    };

    const handleDeposit = (id) => {
        const amount = prompt("Enter deposit amount:");

        if (!amount) return;

        AccountService.deposit(id, amount)
        .then(() => loadAccounts())
        .catch(error => console.error());
    };

    const handleWithdraw = (id) => {
        const amount = prompt("Enter withdraw amount:");

        if (!amount) return;

        AccountService.withdraw(id, amount)
        .then(() => loadAccounts())
        .catch(error => console.error(error));
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this account?")) {
            AccountService.deleteAccount(id)
            .then(() => loadAccounts())
            .catch(error => console.error(error));
        }
    };

    const chartData = {
        labels: accounts.map(acc => acc.accountHolderName),
        datasets: [
            {
                label: "Account Balance",
                data: accounts.map(acc => acc.balance),
                backgroundColor: darkMode ? "#4dabf7" : "#0d6efd"
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true
            }
        }
    };

    const handleViewTransactions = (id) => {

        AccountService.getTransactions(id)
        .then((response) => {
            setTransactions(response.data);
            setSelectedAccountId(id);
        })
        .catch(error => console.error(error));
    };

    return (
        <div className="card shadow-lg border-0 p-5 rounded-4"
             style={{
                backgroundColor: darkMode ? "#2a2a3d" : "white",
                color: darkMode ? "white" : "black"
             }}
        >
            <h2 className="text-center mb-4 fw-bold text-primary"> Accounts List</h2>

            {/* Dashboard Summary Cards */}
            <div className="row mb-4 text-center">
                <div className="col-md-4">
                    <div className="card shadow-sm p-3 rounded-4 border-0">
                        <h6 className="text-muted">Total Accounts</h6>
                        <h3 className="fw-bold text-primary">
                            {accounts.length}
                        </h3>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm p-3 rounded-4 border-0">
                        <h6 className="text-muted">Total Balance</h6>
                        <h3 className="fw-bold text-success">
                            ₹{accounts.reduce((sum, acc) => sum + acc.balance, 0)}
                        </h3>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm p-3 rounded-4 border-0">
                        <h6 className="text-muted">Highest Balance</h6>
                        <h3 className="fw-bold text-warning">
                            ₹{accounts.length > 0
                            ? Math.max(...accounts.map(a => a.balance))
                            : 0}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Create Account Form */}
            <form onSubmit={handleCreateAccount} className="mb-4">
                <div className="row g-3">

                    <div className="col-md-4 mb-2">
                        <input
                             type="text"
                             className="form-control"
                             placeholder="Account Holder Name"
                             value={accountHolderName}
                             onChange={(e) => setAccountHolderName(e.target.value)}
                             required
                        />
                    </div>

                    <div className="col-md-3 mb-2">
                        <input
                        type="number"
                        className="form-control"
                        placeholder="Initial Balance"
                        value={balance}
                        onChange={(e) => setBalance(Number(e.target.value))}
                        min="0"
                        required
                        />
                    </div>

                    <div className="col-md-2 mb-2">
                        <button type="submit" className="btn btn-primary w-100">Create</button>
                    </div>
                </div>
            </form>

            <div className="mb-3">
                <input
                type="text"
                className="form-control"
                placeholder="Search by Account Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="mb-5">
               <Bar data={chartData} options={chartOptions}/>
            </div>

            {/* Accounts Table */}
            <table className="table table-hover align-middle text-center">
                <thead className={darkMode ? "table-dark" : "table-primary"}>
                    <tr>
                        <th>ID</th>
                        <th>Account</th>
                        <th>Balance</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts
                    .filter(account =>
                        account.accountHolderName
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                    )
                    .map(account =>(
                        <tr key={account.id}>
                            <td>{account.id}</td>
                            <td className="fw-semibold">{account.accountHolderName}</td>
                            <td className="fw-bold text-success">₹{account.balance}</td>

                            <td>
                                <button className="btn btn-info btn-sm me-2"
                                onClick={() => handleViewTransactions(account.id)}
                                >
                                   View
                                </button>
                                <button 
                                     className="btn btn-success btn-sm me-2"
                                     onClick={() => handleDeposit(account.id)}
                                >
                                    Deposit
                                </button>
                                <button 
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleWithdraw(account.id)}
                                >
                                    Withdraw
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(account.id)}
                                >
                                    Delete
                                    </button>
                            </td>

                        </tr>
                    ))}
                </tbody>


            </table>

            {/* TransactionHistory Section */}
            {selectedAccountId && (
                <div className="mt-5">
                    <h4 className="fw-bold">
                        Transaction History (Account {selectedAccountId})
                    </h4>

                    <table className="table table-bordered mt-3">
                        <thead className={darkMode ? "table-dark" : "table-light"}>
                            <tr>
                                <th>ID</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(tx => (
                                <tr key={tx.id}>
                                    <td>{tx.id}</td>
                                    <td>{tx.type}</td>
                                    <td>{tx.amount}</td>
                                    <td>
                                        {new Date(tx.timestamp).toLocaleString()}
                                    </td>   
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            )}

    </div>
    )
}

export default AccountList;