import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useApp } from '../context/AppContext';
import { computeCategoryBreakdown, formatCurrency } from '../data/mockData';

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="custom-tooltip">
      <div className="label">{d.name}</div>
      <div className="value" style={{ color: d.color }}>{formatCurrency(d.value)}</div>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{d.pct}% of expenses</div>
    </div>
  );
}

export default function SpendingBreakdownChart() {
  const { state } = useApp();
  const data = computeCategoryBreakdown(state.transactions);
  const topCategories = data.slice(0, 6);
  const totalExpense = data.reduce((s, d) => s + d.value, 0);

  if (data.length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <span className="card-title">Spending Breakdown</span>
        </div>
        <div className="empty-state"><p>No expenses to display</p></div>
      </div>
    );
  }

  return (
    <div className="card" style={{ minWidth: 0 }}>
      <div className="card-header">
        <span className="card-title">Spending Breakdown</span>
        <span className="total-count">Top {topCategories.length}</span>
      </div>

      {/* Donut chart */}
      <div style={{ position: 'relative', height: 160 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={topCategories}
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={72}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {topCategories.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center text */}
        <div className="donut-center">
          <div className="donut-center-label">Total</div>
          <div className="donut-center-value">{formatCurrency(totalExpense, true)}</div>
        </div>
      </div>

      {/* Category list */}
      <div className="category-breakdown">
        {topCategories.map(cat => (
          <div key={cat.id} className="category-row">
            <div className="category-name">{cat.name}</div>
            <div className="category-bar-bg">
              <div
                className="category-bar-fill"
                style={{ width: `${cat.pct}%`, background: cat.color }}
              />
            </div>
            <div className="category-pct">{cat.pct}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
