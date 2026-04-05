import SummaryCards from '../components/SummaryCards';
import BalanceTrendChart from '../components/BalanceTrendChart';
import SpendingBreakdownChart from '../components/SpendingBreakdownChart';
import { useApp } from '../context/AppContext';
import {
  computeCategoryBreakdown, formatCurrency, formatDate, getCategoryById,
} from '../data/mockData';

export default function Dashboard() {
  const { state } = useApp();
  const { transactions } = state;

  // Last 5 transactions
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const topCategory = computeCategoryBreakdown(transactions)[0];

  return (
    <div className="fade-in-up">
      <div className="page-header">
        <h1>Good day 👋</h1>
        <p>Here's a snapshot of your financial health</p>
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Charts row */}
      <div className="charts-grid">
        <BalanceTrendChart />
        <SpendingBreakdownChart />
      </div>

      {/* Recent transactions */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Recent Activity</span>
          <span className="total-count">{transactions.length} total</span>
        </div>

        {recent.length === 0 ? (
          <div className="empty-state">
            <p>No transactions yet</p>
          </div>
        ) : (
          <div>
            {recent.map((txn, i) => {
              const cat = getCategoryById(txn.category);
              return (
                <div
                  key={txn.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '13px 0',
                    borderBottom: i < recent.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  {/* Category icon */}
                  <div style={{
                    width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                    background: `${cat.color}18`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1rem',
                  }}>
                    {cat.icon}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '0.88rem', fontWeight: 500,
                      color: 'var(--text-primary)',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {txn.description}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      {cat.label} · {formatDate(txn.date)}
                    </div>
                  </div>

                  {/* Amount */}
                  <div className={`txn-amount ${txn.type}`} style={{ flexShrink: 0 }}>
                    {txn.type === 'income' ? '+' : '−'}{formatCurrency(txn.amount)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
