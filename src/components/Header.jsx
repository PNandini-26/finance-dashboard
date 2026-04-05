import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { computeSummary, formatCurrency } from '../data/mockData';

const PAGE_META = {
  dashboard:    { title: 'Dashboard',    subtitle: 'Your financial overview at a glance' },
  transactions: { title: 'Transactions', subtitle: 'Browse, filter and manage your activity' },
  insights:     { title: 'Insights',     subtitle: 'Understand your spending patterns' },
};

export default function Header({ onMenuToggle }) {
  const { state, toggleTheme } = useApp();
  const { activePage, theme, transactions } = state;
  const meta = PAGE_META[activePage] || PAGE_META.dashboard;

  return (
    <header className="header">
      {/* Mobile menu button */}
      <button
        className="btn-icon"
        onClick={onMenuToggle}
        style={{ display: 'none' }}
        id="mobile-menu-btn"
        aria-label="Toggle menu"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <div className="header-left">
        <div className="header-title">{meta.title}</div>
        <div className="header-subtitle">{meta.subtitle}</div>
      </div>

      <div className="header-right">
        {/* Theme toggle */}
        <button
          className="btn-icon"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        {/* Export button */}
        <ExportButton transactions={transactions} />
      </div>
    </header>
  );
}

function ExportButton({ transactions }) {
  const [open, setOpen] = useState(false);

  function exportCSV() {
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const rows = transactions.map(t =>
      [t.date, `"${t.description}"`, t.category, t.type, t.amount].join(',')
    );
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'finflow_transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
    setOpen(false);
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify(transactions, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'finflow_transactions.json';
    a.click();
    URL.revokeObjectURL(url);
    setOpen(false);
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        className="btn-icon"
        onClick={() => setOpen(o => !o)}
        title="Export data"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </button>
      {open && (
        <div style={{
          position: 'absolute', right: 0, top: '44px',
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-md)',
          minWidth: '140px', overflow: 'hidden', zIndex: 99,
        }}>
          <button onClick={exportCSV} style={{
            display: 'block', width: '100%', padding: '10px 16px',
            textAlign: 'left', background: 'none', border: 'none',
            color: 'var(--text-secondary)', fontSize: '0.83rem',
            cursor: 'pointer', fontFamily: 'var(--font-body)',
            transition: 'background 0.15s',
          }}
            onMouseEnter={e => e.target.style.background = 'var(--bg-card-hover)'}
            onMouseLeave={e => e.target.style.background = 'none'}
          >
            Export CSV
          </button>
          <button onClick={exportJSON} style={{
            display: 'block', width: '100%', padding: '10px 16px',
            textAlign: 'left', background: 'none', border: 'none',
            color: 'var(--text-secondary)', fontSize: '0.83rem',
            cursor: 'pointer', fontFamily: 'var(--font-body)',
            transition: 'background 0.15s',
          }}
            onMouseEnter={e => e.target.style.background = 'var(--bg-card-hover)'}
            onMouseLeave={e => e.target.style.background = 'none'}
          >
            Export JSON
          </button>
        </div>
      )}
    </div>
  );
}
