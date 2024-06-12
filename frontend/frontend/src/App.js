import "./App.css"; // Importing the CSS for styling
import { useState, useEffect } from "react";
import api from "./api/api"; // Importing the API service
import ConfirmationDialog from "./components/ConfirmationDialog";
import TransactionForm from "./components/TransactionForm";
import TransactionTable from "./components/TransactionTable";

function App() {
  // State to hold the list of transactions
  const [transactions, setTransactions] = useState([]);
  // State to manage the visibility of the confirmation dialog
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  // State to hold the ID of the transaction to be deleted
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  // Function to fetch transactions from the API
  const fetchTransactions = async () => {
    try {
      const response = await api.get("/gettransaction/");
      setTransactions(response.data); // Update the state with the fetched data
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // useEffect to fetch transactions when the component mounts
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Function to handle when a transaction delete is initiated
  const handleDeleteTransaction = (transactionId) => {
    setConfirmationVisible(true);
    setTransactionToDelete(transactionId);
  };

  // Function to confirm deletion of a transaction
  const confirmDelete = async () => {
    if (transactionToDelete !== null) {
      try {
        await api.delete(`/deletetransaction/${transactionToDelete}`);
        fetchTransactions(); // Refresh the transactions list after deletion
      } catch (error) {
        console.error(`Error deleting transaction ${transactionToDelete}:`, error);
      } finally {
        setConfirmationVisible(false);
        setTransactionToDelete(null);
      }
    }
  };

  // Function to cancel the delete operation
  const cancelDelete = () => {
    setConfirmationVisible(false);
    setTransactionToDelete(null);
  };

  return (
    <>
      <div className="w-full">
        {/* Navigation Bar */}
        <nav className="flex flex-row justify-between items-center px-6 py-5 border-b border-slate-400">
          <div id="logo">Finance App</div>
        </nav>
        {/* Transaction Form Component */}
        <TransactionForm fetchTransactions={fetchTransactions} />
        {/* Transaction Table Component */}
        <TransactionTable
          transactions={transactions}
          handleDeleteTransaction={handleDeleteTransaction}
        />
      </div>
      {/* Confirmation Dialog Component */}
      <ConfirmationDialog
        visible={confirmationVisible}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
}

export default App;
