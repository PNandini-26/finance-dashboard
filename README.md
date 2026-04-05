# 💰 FinFlow — Finance Dashboard

A clean, interactive finance dashboard built with **React + Vite + JavaScript**.

![FinFlow Dashboard](https://via.placeholder.com/1200x630/0A1020/63B3ED?text=FinFlow+Finance+Dashboard)

---

## ✨ Features

### 📊 Dashboard Overview
- **4 Summary Cards** — Net Balance, Total Income, Total Expenses, Savings Rate
- **Balance Trend Chart** — Monthly income vs expense area chart (Recharts)
- **Spending Breakdown** — Donut chart with category breakdown and percentage bars
- **Recent Activity** — Latest 5 transactions at a glance

### 💳 Transactions
- Full transaction list with **date, description, category, type, amount**
- **Search** by description or amount
- **Filter** by type (Income / Expense) and category
- **Sort** by any column (click column headers)
- **Pagination** — 15 items per page
- **Add / Edit / Delete** transactions (Admin only)

### 🔐 Role-Based UI
- **Admin** — Can view, add, edit, and delete transactions
- **Viewer** — Read-only access (no add/edit/delete buttons shown)
- Switch roles via the **Role Switcher** in the sidebar

### 📈 Insights
- Top spending category
- Highest expense month & best income month
- Average monthly expense
- Savings rate with health indicator
- Month-over-month expense change
- Full monthly bar chart comparison
- Ranked category spending breakdown

### 🌙 Dark / Light Mode
- Toggle via the ☀️/🌙 button in the header
- Theme preference saved to localStorage

### 💾 Data Persistence
- All state (transactions, role, theme) saved to **localStorage**
- Data survives page refreshes

### 📤 Export
- Export all transactions as **CSV** or **JSON**
- Click the download icon in the header

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| Recharts | Charts (area, bar, donut) |
| Lucide React | Icons |
| Context API | State management |
| CSS Variables | Theming (dark/light) |
| localStorage | Data persistence |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or higher — [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

### Installation Steps

**Step 1 — Clone or download the project:**
```bash
# If you have the zip, extract it. Otherwise:
git clone <repo-url>
cd finance-dashboard
```

**Step 2 — Install dependencies:**
```bash
npm install
```

**Step 3 — Start the development server:**
```bash
npm run dev
```

**Step 4 — Open in browser:**
```
http://localhost:5173
```

That's it! The app is running. 🎉

---

## 📁 Project Structure

```
finance-dashboard/
├── index.html                  # HTML entry point (loads Google Fonts)
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies & scripts
├── README.md                   # This file
└── src/
    ├── main.jsx                # React DOM root
    ├── App.jsx                 # App layout + routing (state-based)
    ├── index.css               # Global CSS + design system variables
    │
    ├── context/
    │   └── AppContext.jsx      # Global state (useReducer + Context API)
    │
    ├── data/
    │   └── mockData.js         # Mock transactions + helper functions
    │
    ├── components/
    │   ├── Sidebar.jsx         # Navigation + role switcher
    │   ├── Header.jsx          # Top bar + theme toggle + export
    │   ├── SummaryCards.jsx    # 4 KPI cards
    │   ├── BalanceTrendChart.jsx    # Area chart
    │   ├── SpendingBreakdownChart.jsx # Donut chart
    │   └── TransactionModal.jsx     # Add/Edit modal form
    │
    └── pages/
        ├── Dashboard.jsx       # Overview page
        ├── Transactions.jsx    # Transactions list page
        └── Insights.jsx        # Analytics & insights page
```

---

## 🎨 Design Decisions

- **Dark-first design** with a deep navy palette (`#070B14`, `#0A1020`, `#111B2E`)
- **Typography**: `Syne` (display headings) + `Inter` (body) + `JetBrains Mono` (numbers)
- **Color language**: Green = income, Red = expense, Blue = balance, Purple = savings
- **CSS Variables** for all colors/spacing — makes theming trivial
- **No external UI library** — all components are custom-built

---

## 🔑 Role-Based Access

| Feature | Admin | Viewer |
|---------|-------|--------|
| View Dashboard | ✅ | ✅ |
| View Transactions | ✅ | ✅ |
| View Insights | ✅ | ✅ |
| Add Transaction | ✅ | ❌ |
| Edit Transaction | ✅ | ❌ |
| Delete Transaction | ✅ | ❌ |
| Export Data | ✅ | ✅ |

Switch roles using the dropdown in the bottom of the sidebar.

---

## 🗃️ State Management

State is managed using **React's built-in `useReducer` + Context API**:

```
AppContext
├── transactions[]       // All transaction data
├── role                 // 'admin' | 'viewer'
├── theme                // 'dark' | 'light'
└── activePage           // Current page key

Actions:
├── SET_ROLE
├── TOGGLE_THEME
├── SET_PAGE
├── ADD_TRANSACTION
├── EDIT_TRANSACTION
├── DELETE_TRANSACTION
└── LOAD_FROM_STORAGE
```

---

## 📦 Build for Production

```bash
npm run build
```

Output is in the `dist/` folder. Preview with:
```bash
npm run preview
```

---

## 🧾 Sample Data

The app ships with **~80 mock transactions** spanning 6 months (Jan–Jun 2024) across 12 categories including salary, freelance, food, shopping, rent, utilities, health, entertainment, and travel.

---

## 📝 Assumptions Made

1. Currency is **Indian Rupees (₹)** — amounts formatted with `en-IN` locale
2. All data is **client-side only** — no backend required
3. Role switching is **UI-only** for demonstration (no auth)
4. The "savings" figure is `income - expenses` when positive
