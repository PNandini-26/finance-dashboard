import { formatCurrency, computeSummary } from '../data/mockData';
import { useApp } from '../context/AppContext';

const WalletIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 12V22H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h16v4" />
    <path d="M22 12v4h-4a2 2 0 0 1 0-4h4" />
  </svg>
);
const ArrowUpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
  </svg>
);
const ArrowDownIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
  </svg>
);
const PiggyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.8 1.5-2 1.5-3C20.5 8 21 6 19 5z" />
    <path d="M2 9v1c0 1.1.9 2 2 2h1" /><path d="M16 11h0" />
  </svg>
);

export default function SummaryCards() {
  const { state } = useApp();
  const summary = computeSummary(state.transactions);
  const savingsRate = summary.income > 0
    ? Math.round((summary.savings / summary.income) * 100)
    : 0;

  const cards = [
    {
      key: 'balance',
      label: 'Net Balance',
      value: formatCurrency(summary.balance),
      icon: <WalletIcon />,
      change: null,
      changeLabel: `${state.transactions.length} transactions`,
    },
    {
      key: 'income',
      label: 'Total Income',
      value: formatCurrency(summary.income),
      icon: <ArrowUpIcon />,
      change: 'up',
      changeLabel: '↑ All time',
    },
    {
      key: 'expense',
      label: 'Total Expenses',
      value: formatCurrency(summary.expense),
      icon: <ArrowDownIcon />,
      change: 'down',
      changeLabel: '↓ All time',
    },
    {
      key: 'savings',
      label: 'Savings Rate',
      value: `${savingsRate}%`,
      icon: <PiggyIcon />,
      change: savingsRate > 20 ? 'up' : 'down',
      changeLabel: savingsRate > 20 ? 'Healthy' : 'Needs attention',
    },
  ];

  return (
    <div className="summary-grid">
      {cards.map((card, i) => (
        <div
          key={card.key}
          className={`summary-card ${card.key} fade-in-up`}
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div className="summary-card-icon">{card.icon}</div>
          <div className="summary-card-label">{card.label}</div>
          <div className="summary-card-value">{card.value}</div>
          {card.changeLabel && (
            <div className={`summary-card-change ${card.change || ''}`}>
              {card.changeLabel}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
