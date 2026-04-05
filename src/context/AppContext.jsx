import { createContext, useContext, useReducer, useEffect } from 'react';
import { INITIAL_TRANSACTIONS } from '../data/mockData';

// ── State shape ─────────────────────────────────────────────
const DEFAULT_STATE = {
  transactions: INITIAL_TRANSACTIONS,
  role: 'admin',           // 'admin' | 'viewer'
  theme: 'dark',           // 'dark'  | 'light'
  activePage: 'dashboard', // 'dashboard' | 'transactions' | 'insights'
};

// ── Reducer ─────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {

    case 'SET_ROLE':
      return { ...state, role: action.payload };

    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' };

    case 'SET_PAGE':
      return { ...state, activePage: action.payload };

    case 'ADD_TRANSACTION': {
      const updated = [action.payload, ...state.transactions];
      return { ...state, transactions: updated };
    }

    case 'EDIT_TRANSACTION': {
      const updated = state.transactions.map(t =>
        t.id === action.payload.id ? action.payload : t
      );
      return { ...state, transactions: updated };
    }

    case 'DELETE_TRANSACTION': {
      const updated = state.transactions.filter(t => t.id !== action.payload);
      return { ...state, transactions: updated };
    }

    case 'LOAD_FROM_STORAGE':
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

// ── Context ──────────────────────────────────────────────────
const AppContext = createContext(null);

// ── Provider ─────────────────────────────────────────────────
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('finflow_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Only restore transactions, role, and theme (not page)
        dispatch({
          type: 'LOAD_FROM_STORAGE',
          payload: {
            transactions: parsed.transactions || INITIAL_TRANSACTIONS,
            role:  parsed.role  || 'admin',
            theme: parsed.theme || 'dark',
          },
        });
      }
    } catch (_) {
      // ignore parse errors
    }
  }, []);

  // Persist to localStorage on state changes
  useEffect(() => {
    try {
      localStorage.setItem('finflow_state', JSON.stringify({
        transactions: state.transactions,
        role:  state.role,
        theme: state.theme,
      }));
    } catch (_) {
      // ignore quota errors
    }
  }, [state.transactions, state.role, state.theme]);

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  // ── Action creators ────────────────────────────────────────
  const actions = {
    setRole:    role    => dispatch({ type: 'SET_ROLE', payload: role }),
    toggleTheme: ()    => dispatch({ type: 'TOGGLE_THEME' }),
    setPage:    page    => dispatch({ type: 'SET_PAGE', payload: page }),
    addTransaction: txn => dispatch({ type: 'ADD_TRANSACTION', payload: {
      ...txn,
      id: Date.now().toString(),
    }}),
    editTransaction: txn => dispatch({ type: 'EDIT_TRANSACTION', payload: txn }),
    deleteTransaction: id => dispatch({ type: 'DELETE_TRANSACTION', payload: id }),
  };

  return (
    <AppContext.Provider value={{ state, ...actions }}>
      {children}
    </AppContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
