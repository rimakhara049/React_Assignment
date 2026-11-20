import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Legend
} from 'recharts';

const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6'];

export default function ChartsSection({ transactions }) {
  // 1. Pie Chart: Expenses by Category
  const expenseMap = {};
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      expenseMap[t.category] = (expenseMap[t.category] || 0) + Number(t.amount);
    });
  const pieData = Object.entries(expenseMap).map(([name, value]) => ({ name, value }));

  // 2. Bar Chart: Total Income vs Expense
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + Number(t.amount), 0);
  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const barData = [
    { name: 'Financial Overview', Income: totalIncome, Expense: totalExpense }
  ];

  // 3. Line Chart: Per-Day Expenses Trend
  const dailyMap = {};
  transactions
    .filter((t) => t.type === 'expense')
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .forEach((t) => {
      dailyMap[t.date] = (dailyMap[t.date] || 0) + Number(t.amount);
    });
  const lineData = Object.entries(dailyMap).map(([date, amount]) => ({ date, amount }));

  return (
    <div className="charts-grid">
      {/* Pie Chart */}
      <div className="glass-card chart-box">
        <h3>Expenses by Category</h3>
        {pieData.length === 0 ? (
          <p className="empty-chart">No expense data to display</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#131927', borderColor: '#334155', color: '#fff' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Bar Chart */}
      <div className="glass-card chart-box">
        <h3>Income vs Expense</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#131927', borderColor: '#334155', color: '#fff' }} />
            <Legend />
            <Bar dataKey="Income" fill="#10b981" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Expense" fill="#ef4444" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div className="glass-card chart-box full-span">
        <h3>Daily Expense Trend</h3>
        {lineData.length === 0 ? (
          <p className="empty-chart">Add expenses across dates to view trend</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#131927', borderColor: '#334155', color: '#fff' }} />
              <Line type="monotone" dataKey="amount" name="Daily Spend (₹)" stroke="#818cf8" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}