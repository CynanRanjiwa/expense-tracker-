import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';  // Custom styles for dark theme

function App() {
    const [transactions, setTransactions] = useState([]);
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [income, setIncome] = useState(false);
    const [date, setDate] = useState('');

    // Fetch transactions when the component mounts
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
            // Ensure amount is parsed as float
            const newTransaction = {
                amount: parseFloat(amount),
                category,
                description,
                income,
                date,
            };

            // Make sure all fields are filled
            if (!amount || !category || !date) {
                alert("Please fill in all required fields.");
                return;
            }

            await axios.post('http://localhost:8000/transactions/', newTransaction);
            fetchTransactions();
            clearForm();
        } catch (error) {
            console.error("There was an error adding a transaction:", error);
        }
    };

    const deleteTransaction = async (transactionId) => {
        try {
            await axios.delete(`http://localhost:8000/transactions/${transactionId}`);
            fetchTransactions();
        } catch (error) {
            console.error("There was an error deleting the transaction:", error);
        }
    };

    const clearForm = () => {
        setAmount('');
        setCategory('');
        setDescription('');
        setIncome(false);
        setDate('');
    };

    return (
        <div className="app-container">
            <h1 className="app-title">Finance App</h1>
            <div className="form-container">
                <input
                    className="form-input"
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <input
                    className="form-input"
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <input
                    className="form-input"
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label className="form-label">
                    <input
                        className="form-checkbox"
                        type="checkbox"
                        checked={income}
                        onChange={(e) => setIncome(e.target.checked)}
                    />
                    Income?
                </label>
                <input
                    className="form-input"
                    type="date"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <button className="form-button" onClick={addTransaction}>Submit</button>
            </div>
            <div className="transactions-container">
                <h2 className="transactions-title">Transactions</h2>
                <table className="transactions-table">
                    <thead>
                        <tr>
                            <th>AMOUNT</th>
                            <th>CATEGORY</th>
                            <th>DESCRIPTION</th>
                            <th>INCOME</th>
                            <th>DATE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.amount}</td>
                                <td>{transaction.category}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.income ? "Yes" : "No"}</td>
                                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                <td>
                                    <button className="delete-button" onClick={() => deleteTransaction(transaction.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;
