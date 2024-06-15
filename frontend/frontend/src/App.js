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
        console.log('Adding expense:', { description, amount, date }); // Add console.log here
        try {
            const response = await axios.post(`${API_URL}/expenses/`, {
                description: description,
                amount: parseFloat(amount),
                date: date // Assuming date is already in ISO string format from the input field
            });
            console.log('Expense added successfully:', response.data); // Add console.log here
            fetchExpenses();
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
            fetchExpenses();
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    const expenseItems = expenses.map(expense => (
        <div key={expense.id} className="expense-item">
            <p>{expense.description} - ${expense.amount.toFixed(2)} ({new Date(expense.date).toLocaleDateString()})</p>
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
