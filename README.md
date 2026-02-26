# 🖥 Banking Admin Dashboard – React Frontend

A modern Admin Dashboard built using **React, Vite, Bootstrap, Axios, and Chart.js**.  
This frontend application connects to the Spring Boot Banking Backend and provides account management, transaction history, and analytics visualization.

---

## 🚀 Features

### 🔐 Authentication
- Admin Login
- Route protection using React Router
- Logout functionality

### 📊 Dashboard
- Sidebar Navigation (Admin Panel)
- Nested Routing Architecture
- Dark Mode Toggle
- Summary Cards:
  - Total Accounts
  - Total Balance
  - Highest Balance

### 💳 Account Management
- Create Account
- Deposit Money
- Withdraw Money
- Delete Account
- Search Account by Name

### 📜 Transaction History
- View transactions per account
- Real-time updates
- Proper timestamp formatting

### 📈 Analytics
- Bar Chart showing account balances
- Responsive chart visualization using Chart.js

---

## 🏗 Project Architecture

```
src/
│
├── components/
│   └── AccountList.jsx
│
├── layout/
│   └── Layout.jsx
│
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Accounts.jsx
│   └── Reports.jsx
│
├── services/
│   └── AccountService.js
│
├── App.jsx
├── main.jsx
```

Architecture Pattern Used:
- Layout-based routing
- Nested Routes
- Service Layer for API calls
- Component separation
- State management using React Hooks

---

## 🧱 Tech Stack

- React
- Vite
- React Router
- Axios
- Bootstrap
- Chart.js
- JavaScript (ES6+)

---

## 🔗 Backend Integration

Connected to Spring Boot backend running at:

```
http://localhost:8080
```

Make sure backend is running before starting frontend.

---

## ⚙️ How To Run

```bash
git clone https://github.com/UtkarshPardhi/banking-app-frontend.git
cd banking-app-frontend
npm install
npm run dev
```

Application runs on:

```
http://localhost:5173
```

---

## 🎨 UI Highlights

- Gradient Sidebar
- Clean Navbar
- Responsive Layout
- Modern Card Design
- Interactive Charts
- Dark Mode Support

---

## 🔮 Future Improvements

- JWT Authentication
- Role-based access
- Transaction Analytics Page
- Pagination & Sorting
- Deployment to Vercel
- Production-ready API configuration

---

## 👨‍💻 Author

**Utkarsh Pardhi**  
Full Stack Developer  
GitHub: https://github.com/UtkarshPardhi
