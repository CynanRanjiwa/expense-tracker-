import React, { useEffect, useState } from 'react';
import axios from '../axios'; // Import axios configured instance

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/expense')
    .then (response => setExpenses(response.data))
    .catch(err => console.error('Error fetching expenses. Please try again.', error));
    []
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

  return (
    <div className="container mx-auto">
      <h2 className="text-xl font-bold mb-4">Expense List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-xs italic">{error}</p>
      ) : (
        <ul className="list-disc pl-5">
          {expenses.map((expense, index) => (
            <li key={index} className="mb-2">
              <span className="font-semibold">{expense.amount}:</span> {expense.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
