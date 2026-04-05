// ============================================================
//  Mock Data — Finance Dashboard
// ============================================================

export const CATEGORIES = [
  { id: 'food',        label: 'Food & Dining',   color: '#FB923C', icon: '🍔' },
  { id: 'transport',   label: 'Transport',        color: '#60A5FA', icon: '🚗' },
  { id: 'shopping',    label: 'Shopping',         color: '#F472B6', icon: '🛍️' },
  { id: 'utilities',   label: 'Utilities',        color: '#A78BFA', icon: '⚡' },
  { id: 'health',      label: 'Health',           color: '#34D399', icon: '🏥' },
  { id: 'entertainment', label: 'Entertainment',  color: '#FBBF24', icon: '🎬' },
  { id: 'salary',      label: 'Salary',           color: '#34D399', icon: '💼' },
  { id: 'freelance',   label: 'Freelance',        color: '#22D3EE', icon: '💻' },
  { id: 'investment',  label: 'Investment',       color: '#6366F1', icon: '📈' },
  { id: 'rent',        label: 'Rent',             color: '#F87171', icon: '🏠' },
  { id: 'education',   label: 'Education',        color: '#94A3B8', icon: '📚' },
  { id: 'travel',      label: 'Travel',           color: '#2DD4BF', icon: '✈️' },
];

export function getCategoryById(id) {
  return CATEGORIES.find(c => c.id === id) || { id, label: id, color: '#94A3B8', icon: '💰' };
}

let _id = 100;
function uid() { return String(++_id); }

function d(y, m, day) {
  return new Date(y, m - 1, day).toISOString().split('T')[0];
}

export const INITIAL_TRANSACTIONS = [
  // --- January ---
  { id: uid(), date: d(2024,1,3),  description: 'Monthly Salary',         amount: 85000, type: 'income',  category: 'salary' },
  { id: uid(), date: d(2024,1,5),  description: 'Zomato Order',           amount: 840,   type: 'expense', category: 'food' },
  { id: uid(), date: d(2024,1,7),  description: 'Ola Cab',                amount: 320,   type: 'expense', category: 'transport' },
  { id: uid(), date: d(2024,1,10), description: 'Amazon Purchase',        amount: 3200,  type: 'expense', category: 'shopping' },
  { id: uid(), date: d(2024,1,12), description: 'Electricity Bill',       amount: 1800,  type: 'expense', category: 'utilities' },
  { id: uid(), date: d(2024,1,14), description: 'Netflix Subscription',   amount: 649,   type: 'expense', category: 'entertainment' },
  { id: uid(), date: d(2024,1,15), description: 'Freelance Project',      amount: 18000, type: 'income',  category: 'freelance' },
  { id: uid(), date: d(2024,1,18), description: 'House Rent',             amount: 22000, type: 'expense', category: 'rent' },
  { id: uid(), date: d(2024,1,20), description: 'Swiggy Dinner',          amount: 620,   type: 'expense', category: 'food' },
  { id: uid(), date: d(2024,1,22), description: 'Metro Card Recharge',    amount: 500,   type: 'expense', category: 'transport' },
  { id: uid(), date: d(2024,1,25), description: 'Mutual Fund SIP',        amount: 5000,  type: 'expense', category: 'investment' },
  { id: uid(), date: d(2024,1,28), description: 'Medical Checkup',        amount: 1200,  type: 'expense', category: 'health' },
  { id: uid(), date: d(2024,1,30), description: 'Book Purchase',          amount: 580,   type: 'expense', category: 'education' },

  // --- February ---
  { id: uid(), date: d(2024,2,1),  description: 'Monthly Salary',         amount: 85000, type: 'income',  category: 'salary' },
  { id: uid(), date: d(2024,2,3),  description: 'Restaurant Dinner',      amount: 1800,  type: 'expense', category: 'food' },
  { id: uid(), date: d(2024,2,5),  description: 'Petrol Fuel',            amount: 2400,  type: 'expense', category: 'transport' },
  { id: uid(), date: d(2024,2,7),  description: 'Myntra Shopping',        amount: 4200,  type: 'expense', category: 'shopping' },
  { id: uid(), date: d(2024,2,10), description: 'Internet Bill',          amount: 999,   type: 'expense', category: 'utilities' },
  { id: uid(), date: d(2024,2,12), description: 'Hotstar Premium',        amount: 1499,  type: 'expense', category: 'entertainment' },
  { id: uid(), date: d(2024,2,14), description: 'Freelance Design Work',  amount: 12000, type: 'income',  category: 'freelance' },
  { id: uid(), date: d(2024,2,15), description: 'House Rent',             amount: 22000, type: 'expense', category: 'rent' },
  { id: uid(), date: d(2024,2,18), description: 'Zomato Order',           amount: 520,   type: 'expense', category: 'food' },
  { id: uid(), date: d(2024,2,20), description: 'Movie Tickets',          amount: 780,   type: 'expense', category: 'entertainment' },
  { id: uid(), date: d(2024,2,22), description: 'Mutual Fund SIP',        amount: 5000,  type: 'expense', category: 'investment' },
  { id: uid(), date: d(2024,2,25), description: 'Dividend Income',        amount: 3400,  type: 'income',  category: 'investment' },
  { id: uid(), date: d(2024,2,28), description: 'Gym Membership',         amount: 2500,  type: 'expense', category: 'health' },

  // --- March ---
  { id: uid(), date: d(2024,3,1),  description: 'Monthly Salary',         amount: 85000, type: 'income',  category: 'salary' },
  { id: uid(), date: d(2024,3,3),  description: 'Grocery Shopping',       amount: 3600,  type: 'expense', category: 'food' },
  { id: uid(), date: d(2024,3,5),  description: 'Uber Cab',               amount: 450,   type: 'expense', category: 'transport' },
  { id: uid(), date: d(2024,3,8),  description: 'Flipkart Sale',          amount: 6800,  type: 'expense', category: 'shopping' },
  { id: uid(), date: d(2024,3,10), description: 'Water & Gas Bill',       amount: 1400,  type: 'expense', category: 'utilities' },
  { id: uid(), date: d(2024,3,12), description: 'Freelance Consulting',   amount: 25000, type: 'income',  category: 'freelance' },
  { id: uid(), date: d(2024,3,14), description: 'House Rent',             amount: 22000, type: 'expense', category: 'rent' },
  { id: uid(), date: d(2024,3,16), description: 'Pharmacy',               amount: 890,   type: 'expense', category: 'health' },
  { id: uid(), date: d(2024,3,18), description: 'Spotify Premium',        amount: 119,   type: 'expense', category: 'entertainment' },
  { id: uid(), date: d(2024,3,20), description: 'Online Course',          amount: 2999,  type: 'expense', category: 'education' },
  { id: uid(), date: d(2024,3,22), description: 'Mutual Fund SIP',        amount: 5000,  type: 'expense', category: 'investment' },
  { id: uid(), date: d(2024,3,25), description: 'Restaurant Lunch',       amount: 960,   type: 'expense', category: 'food' },
  { id: uid(), date: d(2024,3,28), description: 'Rapido Bike',            amount: 180,   type: 'expense', category: 'transport' },

  // --- April ---
  { id: uid(), date: d(2024,4,1),  description: 'Monthly Salary',         amount: 85000, type: 'income',  category: 'salary' },
  { id: uid(), date: d(2024,4,2),  description: 'Zomato Order',           amount: 740,   type: 'expense', category: 'food' },
  { id: uid(), date: d(2024,4,5),  description: 'Metro Card Recharge',    amount: 500,   type: 'expense', category: 'transport' },
  { id: uid(), date: d(2024,4,7),  description: 'Clothes Shopping',       amount: 5500,  type: 'expense', category: 'shopping' },
  { id: uid(), date: d(2024,4,10), description: 'Electricity Bill',       amount: 2100,  type: 'expense', category: 'utilities' },
  { id: uid(), date: d(2024,4,12), description: 'Bonus Income',           amount: 15000, type: 'income',  category: 'salary' },
  { id: uid(), date: d(2024,4,14), description: 'House Rent',             amount: 22000, type: 'expense', category: 'rent' },
  { id: uid(), date: d(2024,4,16), description: 'Cinema Tickets',         amount: 1100,  type: 'expense', category: 'entertainment' },
  { id: uid(), date: d(2024,4,18), description: 'Freelance Web Dev',      amount: 20000, type: 'income',  category: 'freelance' },
  { id: uid(), date: d(2024,4,20), description: 'Mutual Fund SIP',        amount: 5000,  type: 'expense', category: 'investment' },
  { id: uid(), date: d(2024,4,22), description: 'Doctor Visit',           amount: 1500,  type: 'expense', category: 'health' },
  { id: uid(), date: d(2024,4,25), description: 'Goa Weekend Trip',       amount: 12000, type: 'expense', category: 'travel' },
  { id: uid(), date: d(2024,4,28), description: 'Grocery Store',          amount: 3200,  type: 'expense', category: 'food' },

  // --- May ---
  { id: uid(), date: d(2024,5,1),  description: 'Monthly Salary',         amount: 85000, type: 'income',  category: 'salary' },
  { id: uid(), date: d(2024,5,3),  description: 'Restaurant Brunch',      amount: 2100,  type: 'expense', category: 'food' },
  { id: uid(), date: d(2024,5,5),  description: 'Petrol Fuel',            amount: 2600,  type: 'expense', category: 'transport' },
  { id: uid(), date: d(2024,5,7),  description: 'Amazon Shopping',        amount: 8900,  type: 'expense', category: 'shopping' },
  { id: uid(), date: d(2024,5,10), description: 'Internet Bill',          amount: 999,   type: 'expense', category: 'utilities' },
  { id: uid(), date: d(2024,5,12), description: 'Dividend Income',        amount: 4200,  type: 'income',  category: 'investment' },
  { id: uid(), date: d(2024,5,14), description: 'House Rent',             amount: 22000, type: 'expense', category: 'rent' },
  { id: uid(), date: d(2024,5,16), description: 'Netflix + Hotstar',      amount: 1149,  type: 'expense', category: 'entertainment' },
  { id: uid(), date: d(2024,5,18), description: 'Freelance Design',       amount: 16000, type: 'income',  category: 'freelance' },
  { id: uid(), date: d(2024,5,20), description: 'Mutual Fund SIP',        amount: 5000,  type: 'expense', category: 'investment' },
  { id: uid(), date: d(2024,5,22), description: 'Yoga Classes',           amount: 3000,  type: 'expense', category: 'health' },
  { id: uid(), date: d(2024,5,25), description: 'Udemy Courses',          amount: 1999,  type: 'expense', category: 'education' },
  { id: uid(), date: d(2024,5,28), description: 'Weekend Staycation',     amount: 7500,  type: 'expense', category: 'travel' },

  // --- June ---
  { id: uid(), date: d(2024,6,1),  description: 'Monthly Salary',         amount: 85000, type: 'income',  category: 'salary' },
  { id: uid(), date: d(2024,6,3),  description: 'Swiggy Order',           amount: 680,   type: 'expense', category: 'food' },
  { id: uid(), date: d(2024,6,5),  description: 'Ola Ride',               amount: 280,   type: 'expense', category: 'transport' },
  { id: uid(), date: d(2024,6,8),  description: 'IKEA Furniture',         amount: 14000, type: 'expense', category: 'shopping' },
  { id: uid(), date: d(2024,6,10), description: 'Electricity Bill',       amount: 1950,  type: 'expense', category: 'utilities' },
  { id: uid(), date: d(2024,6,12), description: 'Freelance Analytics',    amount: 22000, type: 'income',  category: 'freelance' },
  { id: uid(), date: d(2024,6,14), description: 'House Rent',             amount: 22000, type: 'expense', category: 'rent' },
  { id: uid(), date: d(2024,6,16), description: 'Concert Tickets',        amount: 3500,  type: 'expense', category: 'entertainment' },
  { id: uid(), date: d(2024,6,18), description: 'Medical Insurance',      amount: 6000,  type: 'expense', category: 'health' },
  { id: uid(), date: d(2024,6,20), description: 'Mutual Fund SIP',        amount: 5000,  type: 'expense', category: 'investment' },
  { id: uid(), date: d(2024,6,22), description: 'Grocery',                amount: 2800,  type: 'expense', category: 'food' },
  { id: uid(), date: d(2024,6,25), description: 'Bonus Q2',               amount: 20000, type: 'income',  category: 'salary' },
  { id: uid(), date: d(2024,6,28), description: 'Stock Dividend',         amount: 2800,  type: 'income',  category: 'investment' },
];

// Compute summary stats from transactions
export function computeSummary(transactions) {
  const income  = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = income - expense;
  const savings = Math.max(0, balance);
  return { income, expense, balance, savings };
}

// Monthly data for line chart
export function computeMonthlyData(transactions) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const map = {};

  transactions.forEach(t => {
    const date = new Date(t.date);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    if (!map[key]) {
      map[key] = { name: months[date.getMonth()], income: 0, expense: 0, balance: 0 };
    }
    if (t.type === 'income')  map[key].income  += t.amount;
    if (t.type === 'expense') map[key].expense += t.amount;
  });

  return Object.values(map).map(m => ({
    ...m,
    balance: m.income - m.expense,
  }));
}

// Category breakdown for pie chart
export function computeCategoryBreakdown(transactions) {
  const expenses = transactions.filter(t => t.type === 'expense');
  const total = expenses.reduce((s, t) => s + t.amount, 0);
  const map = {};

  expenses.forEach(t => {
    if (!map[t.category]) map[t.category] = 0;
    map[t.category] += t.amount;
  });

  const cat = getCategoryById;
  return Object.entries(map)
    .map(([id, value]) => ({
      id,
      name: cat(id).label,
      color: cat(id).color,
      value,
      pct: total > 0 ? Math.round((value / total) * 100) : 0,
    }))
    .sort((a, b) => b.value - a.value);
}

// Format currency (Indian Rupees)
export function formatCurrency(amount, compact = false) {
  if (compact && amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  if (compact && amount >= 1000) {
    return `₹${(amount / 1000).toFixed(0)}K`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
