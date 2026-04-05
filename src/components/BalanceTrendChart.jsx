import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, LineChart, Line,
} from 'recharts';
import { useApp } from '../context/AppContext';
import { computeMonthlyData, formatCurrency } from '../data/mockData';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="label">{label}</div>
      {payload.map(p => (
        <div key={p.dataKey} className="value" style={{ color: p.color }}>
          {p.name}: {formatCurrency(p.value)}
        </div>
      ))}
    </div>
  );
}

export default function BalanceTrendChart() {
  const { state } = useApp();
  const data = computeMonthlyData(state.transactions);

  if (data.length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <span className="card-title">Balance Trend</span>
        </div>
        <div className="empty-state">
          <p>No data to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ flex: 1 }}>
      <div className="card-header">
        <span className="card-title">Balance Trend</span>
        <div className="flex gap-2">
          <span className="legend-item">
            <span className="legend-dot" style={{ background: 'var(--green)' }} />
            Income
          </span>
          <span className="legend-item" style={{ marginLeft: 8 }}>
            <span className="legend-dot" style={{ background: 'var(--red)' }} />
            Expenses
          </span>
        </div>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="var(--green)" stopOpacity={0.25} />
                <stop offset="95%" stopColor="var(--green)" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="var(--red)" stopOpacity={0.25} />
                <stop offset="95%" stopColor="var(--red)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => formatCurrency(v, true)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="var(--green)"
              strokeWidth={2}
              fill="url(#colorIncome)"
              dot={{ fill: 'var(--green)', strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="expense"
              name="Expenses"
              stroke="var(--red)"
              strokeWidth={2}
              fill="url(#colorExpense)"
              dot={{ fill: 'var(--red)', strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
