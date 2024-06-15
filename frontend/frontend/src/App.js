// src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [transactions, setTransactions] = useState([]);
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('http://localhost:8000/transactions/');
            setTransactions(response.data);
        } catch (error) {
            console.error("There was an error fetching transactions:", error);
        }
    };

    const addTransaction = async () => {
        try {
            await axios.post('http://localhost:8000/transactions/', {
                amount: parseFloat(amount),
                category,
                description,
            });
            fetchTransactions();
            clearForm();
        } catch (error) {
            console.error("There was an error adding a transaction:", error);
        }
    };

    const clearForm = () => {
        setAmount('');
        setCategory('');
        setDescription('');
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
            <h1 className="text-4xl mb-8 text-center">Expense Tracker</h1>
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
                        <p>Date: {new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
