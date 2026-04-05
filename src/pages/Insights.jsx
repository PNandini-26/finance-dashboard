import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useApp } from '../context/AppContext';
import {
  computeCategoryBreakdown, computeMonthlyData, computeSummary,
  formatCurrency, getCategoryById,
} from '../data/mockData';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="label">{label}</div>
      {payload.map(p => (
        <div key={p.dataKey} className="value" style={{ color: p.fill || p.color }}>
          {p.name}: {formatCurrency(p.value)}
        </div>
      ))}
    </div>
  );
}

export default function Insights() {
  const { state } = useApp();
  const { transactions } = state;

  const categoryData = useMemo(() => computeCategoryBreakdown(transactions), [transactions]);
  const monthlyData  = useMemo(() => computeMonthlyData(transactions), [transactions]);
  const summary      = useMemo(() => computeSummary(transactions), [transactions]);

  // Highest spending category
  const topCat = categoryData[0];

  // Month with highest expense
  const highExpMonth = [...monthlyData].sort((a, b) => b.expense - a.expense)[0];
  const highIncMonth = [...monthlyData].sort((a, b) => b.income - a.income)[0];

  // Savings rate
  const savingsRate = summary.income > 0
    ? ((summary.savings / summary.income) * 100).toFixed(1)
    : 0;

  // Avg monthly expense
  const avgMonthlyExpense = monthlyData.length
    ? Math.round(monthlyData.reduce((s, m) => s + m.expense, 0) / monthlyData.length)
    : 0;

  // This month vs last month
  const last2 = monthlyData.slice(-2);
  const thisMonth = last2[1] || {};
  const lastMonth = last2[0] || {};
  const expenseChange = lastMonth.expense
    ? (((thisMonth.expense - lastMonth.expense) / lastMonth.expense) * 100).toFixed(0)
    : null;

  const insights = [
    {
      icon: '🔥',
      color: 'var(--orange)',
      colorDim: 'var(--orange-dim)',
      label: 'Top Spending Category',
      value: topCat ? topCat.name : 'N/A',
      sub: topCat ? `${formatCurrency(topCat.value)} · ${topCat.pct}% of expenses` : 'No expenses recorded',
    },
    {
      icon: '📅',
      color: 'var(--red)',
      colorDim: 'var(--red-dim)',
      label: 'Highest Expense Month',
      value: highExpMonth ? highExpMonth.name : 'N/A',
      sub: highExpMonth ? `${formatCurrency(highExpMonth.expense)} spent` : 'No data',
    },
    {
      icon: '💸',
      color: 'var(--amber)',
      colorDim: 'var(--amber-dim)',
      label: 'Avg Monthly Expense',
      value: formatCurrency(avgMonthlyExpense),
      sub: `Across ${monthlyData.length} months`,
    },
    {
      icon: '🏦',
      color: 'var(--green)',
      colorDim: 'var(--green-dim)',
      label: 'Savings Rate',
      value: `${savingsRate}%`,
      sub: savingsRate > 20 ? '✅ Healthy savings rate' : '⚠️ Try to save more',
    },
    {
      icon: '📈',
      color: 'var(--accent)',
      colorDim: 'var(--accent-dim)',
      label: 'Best Income Month',
      value: highIncMonth ? highIncMonth.name : 'N/A',
      sub: highIncMonth ? `${formatCurrency(highIncMonth.income)} earned` : 'No data',
    },
    {
      icon: '🔄',
      color: 'var(--purple)',
      colorDim: 'var(--purple-dim)',
      label: 'Month-over-Month Expense',
      value: expenseChange !== null ? `${expenseChange > 0 ? '+' : ''}${expenseChange}%` : 'N/A',
      sub: expenseChange !== null
        ? `${thisMonth.name || 'This'} vs ${lastMonth.name || 'last'} month`
        : 'Not enough months',
    },
  ];

  return (
    <div className="fade-in-up">
      <div className="page-header">
        <h1>Insights</h1>
        <p>Data-driven observations about your spending habits</p>
      </div>

      {/* Insight cards */}
      <div className="insights-grid">
        {insights.map((ins, i) => (
          <div key={i} className="insight-card" style={{ animationDelay: `${i * 50}ms` }}>
            <div
              className="insight-icon"
              style={{ background: ins.colorDim, fontSize: '1.2rem' }}
            >
              {ins.icon}
            </div>
            <div className="insight-label">{ins.label}</div>
            <div className="insight-value" style={{ color: ins.color }}>{ins.value}</div>
            <div className="insight-sub">{ins.sub}</div>
          </div>
        ))}
      </div>

      {/* Monthly Income vs Expense comparison bar chart */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-header">
          <span className="card-title">Monthly Comparison</span>
          <div className="flex gap-2">
            <span className="legend-item">
              <span className="legend-dot" style={{ background: 'var(--green)' }} />Income
            </span>
            <span className="legend-item" style={{ marginLeft: 8 }}>
              <span className="legend-dot" style={{ background: 'var(--red)' }} />Expenses
            </span>
          </div>
        </div>

        {monthlyData.length === 0 ? (
          <div className="empty-state"><p>No monthly data available</p></div>
        ) : (
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} barGap={4} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                  axisLine={false} tickLine={false}
                />
                <YAxis
                  tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                  axisLine={false} tickLine={false}
                  tickFormatter={v => formatCurrency(v, true)}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="income" name="Income" fill="var(--green)" radius={[4,4,0,0]} maxBarSize={32} />
                <Bar dataKey="expense" name="Expenses" fill="var(--red)" radius={[4,4,0,0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Category spending breakdown */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Category Spending Detail</span>
          <span className="total-count">{categoryData.length} categories</span>
        </div>

        {categoryData.length === 0 ? (
          <div className="empty-state"><p>No spending data</p></div>
        ) : (
          <div>
            {categoryData.map((cat, i) => (
              <div
                key={cat.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '12px 0',
                  borderBottom: i < categoryData.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                {/* Rank */}
                <div style={{
                  width: 24, flexShrink: 0,
                  fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                  color: 'var(--text-muted)', textAlign: 'right',
                }}>
                  {i + 1}
                </div>

                {/* Icon */}
                <div style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: `${cat.color}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem',
                }}>
                  {getCategoryById(cat.id).icon}
                </div>

                {/* Name & bar */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: 6 }}>
                    {cat.name}
                  </div>
                  <div className="category-bar-bg">
                    <div className="category-bar-fill" style={{ width: `${cat.pct}%`, background: cat.color }} />
                  </div>
                </div>

                {/* Stats */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {formatCurrency(cat.value)}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    {cat.pct}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
