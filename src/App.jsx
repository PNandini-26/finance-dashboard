import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Insights from './pages/Insights';
import './index.css';

function AppInner() {
  const { state } = useApp();
  const { activePage } = state;
  const [mobileOpen, setMobileOpen] = useState(false);

  const PAGE_MAP = {
    dashboard:    <Dashboard />,
    transactions: <Transactions />,
    insights:     <Insights />,
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 99,
            display: 'none',
          }}
          id="mobile-overlay"
        />
      )}

      {/* Main */}
      <div className="main-content">
        <Header onMenuToggle={() => setMobileOpen(o => !o)} />
        <div className="page-content">
          {PAGE_MAP[activePage] || <Dashboard />}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
