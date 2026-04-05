import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';

const EXPENSE_CATEGORIES = CATEGORIES.filter(c =>
  !['salary', 'freelance', 'investment'].includes(c.id)
);
const INCOME_CATEGORIES = CATEGORIES.filter(c =>
  ['salary', 'freelance', 'investment'].includes(c.id)
);

function emptyForm() {
  return {
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: '',
    type: 'expense',
    category: 'food',
  };
}

export default function TransactionModal({ mode = 'add', txn = null, onClose }) {
  const { addTransaction, editTransaction } = useApp();
  const [form, setForm] = useState(txn ? { ...txn, amount: String(txn.amount) } : emptyForm());
  const [errors, setErrors] = useState({});

  // When type changes, reset category to a valid one
  useEffect(() => {
    const validCats = form.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    if (!validCats.find(c => c.id === form.category)) {
      setForm(f => ({ ...f, category: validCats[0].id }));
    }
  }, [form.type]);

  function validate() {
    const e = {};
    if (!form.description.trim()) e.description = 'Required';
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) e.amount = 'Enter a valid amount';
    if (!form.date) e.date = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    const payload = { ...form, amount: Number(form.amount) };
    if (mode === 'edit') {
      editTransaction(payload);
    } else {
      addTransaction(payload);
    }
    onClose();
  }

  const cats = form.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">
            {mode === 'edit' ? 'Edit Transaction' : 'Add Transaction'}
          </span>
          <button className="btn-icon" onClick={onClose} style={{ width: 32, height: 32 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="form-grid">
          {/* Type */}
          <div className="form-group full">
            <label className="form-label">Type</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {['expense', 'income'].map(t => (
                <button
                  key={t}
                  onClick={() => setForm(f => ({ ...f, type: t }))}
                  style={{
                    flex: 1, padding: '9px', borderRadius: 'var(--radius-sm)',
                    border: `1px solid ${form.type === t ? (t === 'income' ? 'var(--green)' : 'var(--red)') : 'var(--border)'}`,
                    background: form.type === t ? (t === 'income' ? 'var(--green-dim)' : 'var(--red-dim)') : 'var(--bg-input)',
                    color: form.type === t ? (t === 'income' ? 'var(--green)' : 'var(--red)') : 'var(--text-secondary)',
                    fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600,
                    cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.15s',
                  }}
                >
                  {t === 'income' ? '↑ Income' : '↓ Expense'}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="form-group full">
            <label className="form-label">Description</label>
            <input
              className="form-input"
              placeholder="e.g. Grocery shopping"
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            />
            {errors.description && <span style={{ color: 'var(--red)', fontSize: '0.72rem' }}>{errors.description}</span>}
          </div>

          {/* Amount */}
          <div className="form-group">
            <label className="form-label">Amount (₹)</label>
            <input
              className="form-input"
              type="number"
              placeholder="0"
              min="1"
              value={form.amount}
              onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
            />
            {errors.amount && <span style={{ color: 'var(--red)', fontSize: '0.72rem' }}>{errors.amount}</span>}
          </div>

          {/* Date */}
          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              className="form-input"
              type="date"
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            />
            {errors.date && <span style={{ color: 'var(--red)', fontSize: '0.72rem' }}>{errors.date}</span>}
          </div>

          {/* Category */}
          <div className="form-group full">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            >
              {cats.map(c => (
                <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {mode === 'edit' ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  );
}
