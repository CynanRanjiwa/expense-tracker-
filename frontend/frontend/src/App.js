// import logo from './logo.svg';
import './App.css';
import React from 'react';
// import ExpenseForm from './components/ExpenseForm';
// import ExpenseList from './components/ExpenseList';
// function App() {
//   return (
//     <div className="App">
//       <h1>Expense Tracker</h1>
//       <ExpenseForm />
//       <ExpenseList />
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
// export default App;


import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import axios from './axios'; // Import axios configured instance

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('/expenses');
        setExpenses(response.data);
      } catch (err) {
        setError('Error fetching expenses. Please try again.');
        console.error('Error fetching expenses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const handleExpenseAdded = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  return (
    <div className="App">
      <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>
      <ExpenseForm onExpenseAdded={handleExpenseAdded} />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-xs italic">{error}</p>
      ) : (
        <ExpenseList expenses={expenses} />
      )}
    </div>
  );
}

export default App;


