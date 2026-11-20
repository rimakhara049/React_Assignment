import { useState, useEffect } from 'react';
import ChartsSection from './components/ChartsSection';
import './App.css';

const SAMPLE_DATA = [
  { id: 1, title: 'Freelance Web Project', amount: 25000, type: 'income', category: 'Salary', date: '2026-11-01' },
  { id: 2, title: 'Metro Smart Card Recharge', amount: 600, type: 'expense', category: 'Transport', date: '2026-11-03' },
  { id: 3, title: 'Groceries & Produce', amount: 2400, type: 'expense', category: 'Food', date: '2026-11-05' },
  { id: 4, title: 'Internet & Electricity Bill', amount: 1850, type: 'expense', category: 'Utilities', date: '2026-11-10' },
  { id: 5, title: 'Online Course Subscription', amount: 1200, type: 'expense', category: 'Education', date: '2026-11-14' }
];

export default function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('expense_tracker_data');
    return saved ? JSON.parse(saved) : SAMPLE_DATA;
  });

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);

  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('2026-11');

  useEffect(() => {
    localStorage.setItem('expense_tracker_data', JSON.stringify(transactions));
  }, [transactions]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim() || !amount || Number(amount) <= 0) return;

    const newRecord = {
      id: Date.now(),
      title: title.trim(),
      amount: Number(amount),
      type,
      category,
      date
    };

    setTransactions([newRecord, ...transactions]);
    setTitle('');
    setAmount('');
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const monthlyTransactions = transactions.filter((t) =>
    selectedMonth ? t.date.startsWith(selectedMonth) : true
  );

  const filteredTransactions = monthlyTransactions.filter((t) => {
    const matchesCat = filterCategory === 'All' || t.category === filterCategory;
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const totalIncome = monthlyTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = monthlyTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const exportCSV = () => {
    const headers = ['ID,Title,Type,Category,Amount,Date'];
    const rows = filteredTransactions.map(
      (t) => `${t.id},"${t.title}",${t.type},${t.category},${t.amount},${t.date}`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `expenses_${selectedMonth || 'all'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="tracker-container">
      <header className="top-bar">
        <div>
          <h1>Fin<span>Pulse</span> Expense Tracker</h1>
          <p>Monthly analytics, visual insights & CSV reporting</p>
        </div>
        <div className="header-actions">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="month-picker"
          />
          <button onClick={exportCSV} className="btn-export">
            ⬇ Export CSV
          </button>
        </div>
      </header>

      {/* Monthly Summary Cards */}
      <section className="summary-grid">
        <div className="glass-card stat-card">
          <span>Net Monthly Balance</span>
          <h2 className={balance >= 0 ? 'text-green' : 'text-red'}>₹{balance.toLocaleString()}</h2>
        </div>
        <div className="glass-card stat-card">
          <span>Monthly Income</span>
          <h2 className="text-green">+₹{totalIncome.toLocaleString()}</h2>
        </div>
        <div className="glass-card stat-card">
          <span>Monthly Expenses</span>
          <h2 className="text-red">-₹{totalExpense.toLocaleString()}</h2>
        </div>
      </section>

      {/* Add Transaction Form */}
      <form onSubmit={handleAdd} className="glass-card add-form">
        <input
          type="text"
          placeholder="Description (e.g., Grocery, Salary)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense (-)</option>
          <option value="income">Income (+)</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
          <option value="Education">Education</option>
          <option value="Shopping">Shopping</option>
          <option value="Salary">Salary</option>
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <button type="submit" className="btn-primary">+ Add Record</button>
      </form>

      {/* Charts */}
      <ChartsSection transactions={monthlyTransactions} />

      {/* Search & Category Filter */}
      <div className="glass-card filter-bar">
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
          <option value="Education">Education</option>
          <option value="Shopping">Shopping</option>
          <option value="Salary">Salary</option>
        </select>
      </div>

      {/* Transaction Table */}
      <div className="glass-card table-wrapper">
        <table className="tx-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-row">No transactions found for this filter.</td>
              </tr>
            ) : (
              filteredTransactions.map((t) => (
                <tr key={t.id}>
                  <td>{t.date}</td>
                  <td><strong>{t.title}</strong></td>
                  <td><span className="pill">{t.category}</span></td>
                  <td>
                    <span className={`badge ${t.type}`}>
                      {t.type.toUpperCase()}
                    </span>
                  </td>
                  <td className={t.type === 'income' ? 'text-green' : 'text-red'}>
                    {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString()}
                  </td>
                  <td>
                    <button onClick={() => handleDelete(t.id)} className="btn-del">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}