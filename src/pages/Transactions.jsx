import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, getCategoryById, formatCurrency, formatDate } from '../data/mockData';
import TransactionModal from '../components/TransactionModal';

const ITEMS_PER_PAGE = 15;

const SortIcon = ({ dir }) => (
  <span className="sort-icon">
    {dir === 'asc'
      ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15" /></svg>
      : dir === 'desc'
      ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
      : <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.35"><polyline points="18 15 12 9 6 15" /></svg>
    }
  </span>
);

export default function Transactions() {
  const { state, deleteTransaction, role } = useApp();
  const { transactions } = state;
  const isAdmin = role === 'admin';

  const [search, setSearch]         = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCat, setFilterCat]   = useState('all');
  const [sortKey, setSortKey]        = useState('date');
  const [sortDir, setSortDir]        = useState('desc');
  const [page, setPage]              = useState(1);
  const [modal, setModal]            = useState(null); // null | 'add' | { mode:'edit', txn }

  function toggleSort(key) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
    setPage(1);
  }

  const filtered = useMemo(() => {
    let list = [...transactions];
    if (filterType !== 'all') list = list.filter(t => t.type === filterType);
    if (filterCat  !== 'all') list = list.filter(t => t.category === filterCat);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(t =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        String(t.amount).includes(q)
      );
    }
    list.sort((a, b) => {
      let va = a[sortKey], vb = b[sortKey];
      if (sortKey === 'amount') { va = Number(va); vb = Number(vb); }
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return list;
  }, [transactions, filterType, filterCat, search, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  function handleDelete(id) {
    if (window.confirm('Delete this transaction?')) deleteTransaction(id);
  }

  const expCats = CATEGORIES.filter(c => !['salary','freelance','investment'].includes(c.id));
  const incCats = CATEGORIES.filter(c => ['salary','freelance','investment'].includes(c.id));
  const allCats = filterType === 'income' ? incCats : filterType === 'expense' ? expCats : CATEGORIES;

  const COLS = [
    { key: 'date',        label: 'Date' },
    { key: 'description', label: 'Description' },
    { key: 'category',    label: 'Category' },
    { key: 'type',        label: 'Type' },
    { key: 'amount',      label: 'Amount' },
  ];

  return (
    <div>
      <div className="page-header flex justify-between items-center" style={{ flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1>Transactions</h1>
          <p>{filtered.length} of {transactions.length} transactions</p>
        </div>
        {isAdmin && (
          <button className="btn btn-primary" onClick={() => setModal('add')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Transaction
          </button>
        )}
      </div>

      {/* Controls */}
      <div className="txn-controls">
        <div className="search-input-wrap">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className="search-input"
            placeholder="Search transactions…"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />
        </div>

        <select
          className="filter-select"
          value={filterType}
          onChange={e => { setFilterType(e.target.value); setFilterCat('all'); setPage(1); }}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          className="filter-select"
          value={filterCat}
          onChange={e => { setFilterCat(e.target.value); setPage(1); }}
        >
          <option value="all">All Categories</option>
          {allCats.map(c => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>

        {(search || filterType !== 'all' || filterCat !== 'all') && (
          <button
            className="btn btn-secondary"
            onClick={() => { setSearch(''); setFilterType('all'); setFilterCat('all'); setPage(1); }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {paginated.length === 0 ? (
          <div className="empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 9H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V11a2 2 0 0 0-2-2h-4" />
              <rect x="9" y="3" width="6" height="6" rx="1" />
            </svg>
            <h3>No transactions found</h3>
            <p>Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="txn-table">
              <thead>
                <tr>
                  {COLS.map(col => (
                    <th key={col.key} onClick={() => toggleSort(col.key)}>
                      {col.label}
                      <SortIcon dir={sortKey === col.key ? sortDir : null} />
                    </th>
                  ))}
                  {isAdmin && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {paginated.map(txn => {
                  const cat = getCategoryById(txn.category);
                  return (
                    <tr key={txn.id}>
                      <td style={{ whiteSpace: 'nowrap', color: 'var(--text-secondary)', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                        {formatDate(txn.date)}
                      </td>
                      <td style={{ fontWeight: 500 }}>{txn.description}</td>
                      <td>
                        <span
                          className="txn-category-badge"
                          style={{ background: `${cat.color}18`, color: cat.color }}
                        >
                          <span>{cat.icon}</span>
                          {cat.label}
                        </span>
                      </td>
                      <td>
                        <span className={`txn-type-badge ${txn.type}`}>
                          {txn.type}
                        </span>
                      </td>
                      <td>
                        <span className={`txn-amount ${txn.type}`}>
                          {txn.type === 'income' ? '+' : '−'}{formatCurrency(txn.amount)}
                        </span>
                      </td>
                      {isAdmin && (
                        <td>
                          <div className="txn-actions">
                            <button
                              className="btn-sm"
                              onClick={() => setModal({ mode: 'edit', txn })}
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                              </svg>
                              Edit
                            </button>
                            <button
                              className="btn-sm danger"
                              onClick={() => handleDelete(txn.id)}
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6l-1 14H6L5 6" />
                                <path d="M10 11v6M14 11v6M9 6V4h6v2" />
                              </svg>
                              Delete
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 20px', borderTop: '1px solid var(--border)',
          }}>
            <span className="pagination-info">
              Page {page} of {totalPages} · {filtered.length} results
            </span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                className="btn-sm"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{ opacity: page === 1 ? 0.4 : 1 }}
              >← Prev</button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let p = i + 1;
                if (totalPages > 5 && page > 3) p = page - 2 + i;
                if (p > totalPages) return null;
                return (
                  <button
                    key={p}
                    className="btn-sm"
                    onClick={() => setPage(p)}
                    style={{
                      background: p === page ? 'var(--accent-dim)' : undefined,
                      color: p === page ? 'var(--accent)' : undefined,
                      borderColor: p === page ? 'var(--accent)' : undefined,
                    }}
                  >{p}</button>
                );
              })}
              <button
                className="btn-sm"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                style={{ opacity: page === totalPages ? 0.4 : 1 }}
              >Next →</button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {modal === 'add' && (
        <TransactionModal mode="add" onClose={() => setModal(null)} />
      )}
      {modal?.mode === 'edit' && (
        <TransactionModal mode="edit" txn={modal.txn} onClose={() => setModal(null)} />
      )}
    </div>
  );
}
