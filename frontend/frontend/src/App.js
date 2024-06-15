// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [income, setIncome] = useState(false);
  const [date, setDate] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const response = await axios.get('http://localhost:8000/transactions/');
    setTransactions(response.data);
  };

  const addTransaction = async () => {
    await axios.post('http://localhost:8000/transactions/', {
      amount: parseFloat(amount),
      category,
      description,
      income,
      date,
    });
    fetchTransactions();
    clearForm();
  };

  const clearForm = () => {
    setAmount('');
    setCategory('');
    setDescription('');
    setIncome(false);
    setDate('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-8 text-center">Finance Tracker</h1>
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg text-center">
        <input
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg text-center"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg text-center"
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg text-center"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex items-center justify-center mb-4">
          <label className="mr-2">Income:</label>
          <input
            type="checkbox"
            checked={income}
            onChange={(e) => setIncome(e.target.checked)}
          />
        </div>
        <input
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg text-center"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          className="w-full p-3 bg-green-600 rounded-lg"
          onClick={addTransaction}
        >
          Add Transaction
        </button>
      </div>
      <div className="w-full max-w-md mt-8">
        <h2 className="text-2xl mb-4 text-center">Transaction History</h2>
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="p-4 mb-4 bg-gray-800 rounded-lg text-center"
          >
            <p>Amount: ${transaction.amount}</p>
            <p>Category: {transaction.category}</p>
            <p>Description: {transaction.description}</p>
            <p>Type: {transaction.income ? 'Income' : 'Expense'}</p>
            <p>Date: {transaction.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
