// import React, { useState } from 'react';
// import axios from '../axios'; // Import axios configured instance

// const ExpenseForm = ({ onExpenseAdded }) => {
//   const [amount, setAmount] = useState('');
//   const [description, setDescription] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const response = await axios.post('/expenses', { amount, description });
//       console.log('Expense added:', response.data);
//       setAmount('');
//       setDescription('');
//       onExpenseAdded(response.data); // Notify parent component to refresh the list
//     } catch (err) {
//       setError('Error adding expense. Please try again.');
//       console.error('Error adding expense:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
//           Amount
//         </label>
//         <input
//           type="number"
//           id="amount"
//           placeholder="Amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
//           Description
//         </label>
//         <input
//           type="text"
//           id="description"
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           required
//         />
//       </div>
//       {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
//       <button
//         type="submit"
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         disabled={loading}
//       >
//         {loading ? 'Adding...' : 'Add Expense'}
//       </button>
//     </form>
//   );
// };

// export default ExpenseForm;

// import React, { useState } from 'react';
// import axios from '../axios';

// const ExpenseForm = () => {
//   const [amount, setAmount] = useState('');
//   const [description, setDescription] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post('/expenses', { amount, description })
//       .then(response => {
//         console.log('Expense added:', response.data);
//         // Reset form or update state
//         setAmount('');
//         setDescription('');
//       })
//       .catch(error => console.error('Error adding expense:', error));
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
//           Amount
//         </label>
//         <input
//           type="text"
//           id="amount"
//           placeholder="Amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
//           Description
//         </label>
//         <input
//           type="text"
//           id="description"
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         />
//       </div>
//       <button
//         type="submit"
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//       >
//         Add Expense
//       </button>
//     </form>
//   );
// };

// export default ExpenseForm;



import React, { useState } from 'react';
import axios from '../axios'; // Importing axios instance for API requests

const ExpenseForm = ({ onExpenseAdded }) => {
  // State variables to manage form inputs and feedback
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  // Form validation function
  const validateForm = () => {
    if (!amount || !description) {
      setError('Both fields are required.');
      return false;
    }
    if (isNaN(amount) || Number(amount) <= 0) {
      setError('Amount must be a positive number.');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(''); // Clear any existing errors
    setSuccess(''); // Clear previous success message

    if (!validateForm()) return; // Stop submission if form is invalid

    setLoading(true); // Set loading state
    try {
      const response = await axios.post('/expenses', { amount, description });
      console.log('Expense added:', response.data);
      setAmount(''); // Clear amount field
      setDescription(''); // Clear description field
      setSuccess('Expense added successfully!');
      if (onExpenseAdded) onExpenseAdded(response.data); // Notify parent component
    } catch (err) {
      setError('Error adding expense. Please try again.');
      console.error('Error adding expense:', err);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <input
          type="text"
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
      {success && <p className="text-green-500 text-xs italic mb-4">{success}</p>}
      <button
        type="submit"
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Expense'}
      </button>
    </form>
  );
};

export default ExpenseForm;