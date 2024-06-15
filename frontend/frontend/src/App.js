// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:8000';  // Replace with your FastAPI server URL

function App() {
    const [expenses, setExpenses] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await axios.get(`${API_URL}/expenses/`);
            setExpenses(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const handleAddExpense = async () => {
        try {
            const response = await axios.post(`${API_URL}/expenses/`, {
                description: description,
                amount: parseFloat(amount),
                date: date // Assuming date is already in ISO string format from the input field
            });
            setExpenses([...expenses, response.data]); // Add new expense to local state
            setDescription('');
            setAmount('');
            setDate('');
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    const handleDeleteExpense = async (id) => {
        try {
            await axios.delete(`${API_URL}/expenses/${id}`);
            setExpenses(expenses.filter(expense => expense.id !== id)); // Remove deleted expense from local state
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    const expenseItems = expenses.map(expense => (
        <div key={expense.id} className="expense-item">
            <p>
                <span>{expense.description}</span> - 
                <span>${expense.amount.toFixed(2)}</span> (
                <span>{new Date(expense.date).toLocaleDateString()}</span>)
            </p>
            <div>
                <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
            </div>
        </div>
    ));

    return (
        <div className="App">
            <h1>Expense Tracker</h1>
            <div className="add-expense">
                <h2>Add Expense</h2>
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <button onClick={handleAddExpense}>Add Expense</button>
            </div>
            <div className="expenses-list">
                <h2>Expenses</h2>
                {expenseItems}
            </div>
        </div>
    );
}

export default App;
