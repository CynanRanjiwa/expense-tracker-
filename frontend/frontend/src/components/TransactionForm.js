// import React, { useState } from "react";
// import api from "../api/api"; // Importing the API service for making HTTP requests

// // The TransactionForm component receives fetchTransaction as a prop
// function TransactionForm({ fetchTransaction }) {
//   // useState hook to manage the form data state
//   const [formData, setFormData] = useState({
//     amount: "",
//     category: "",
//     description: "",
//     is_income: false,
//     date: "",
//   });

//   // Function to handle changes in form inputs
//   const handleInputChange = (event) => {
//     const { name, value, type, checked } = event.target;

//     // Determine the new value based on the input type
//     const newValue = type === "checkbox" ? checked : value;

//     // Update the formData state with the new value
//     setFormData({
//       ...formData,
//       [name]: newValue,
//     });
//   };

//   // Function to handle form submission
//   const handleFormSubmit = async (event) => {
//     event.preventDefault(); // Prevent the default form submission behavior

//     try {
//       // Send a POST request to add a new transaction
//       await api.post("/addtransaction/", formData);

//       // Fetch updated transactions after successful submission
//       fetchTransaction();

//       // Reset the form fields after submission
//       setFormData({
//         amount: "",
//         category: "",
//         description: "",
//         is_income: false,
//         date: "",
//       });
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col justify-center items-center mt-16">
//       <form onSubmit={handleFormSubmit}>
//         {/* Amount Field */}
//         <div className="w-full">
//           <label htmlFor="amount">Amount</label>
//           <input
//             type="text"
//             id="amount"
//             name="amount"
//             value={formData.amount}
//             onChange={handleInputChange}
//             className="w-full p-3 mt-2"
//           />
//         </div>

//         {/* Category Field */}
//         <div className="w-full">
//           <label htmlFor="category">Category</label>
//           <input
//             type="text"
//             id="category"
//             name="category"
//             value={formData.category}
//             onChange={handleInputChange}
//             className="w-full p-3 mt-2"
//           />
//         </div>

//         {/* Description Field */}
//         <div className="w-full">
//           <label htmlFor="description">Description</label>
//           <input
//             type="text"
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleInputChange}
//             className="w-full p-3 mt-2"
//           />
//         </div>

//         {/* Income Checkbox */}
//         <div className="w-full">
//           <label htmlFor="is_income">Income?</label>
//           <input
//             type="checkbox"
//             id="is_income"
//             name="is_income"
//             checked={formData.is_income}
//             onChange={handleInputChange}
//             className="mt-2"
//           />
//         </div>

//         {/* Date Field */}
//         <div className="w-full">
//           <label htmlFor="date">Date</label>
//           <input
//             type="text"
//             id="date"
//             name="date"
//             value={formData.date}
//             onChange={handleInputChange}
//             className="w-full p-3 mt-2"
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full px-2 py-3 bg-blue-500 text-center mt-4 text-white rounded"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default TransactionForm;


import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = () => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    isIncome: false,
    date: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/addtransaction/', formData);
      alert('Transaction added successfully!');
      setFormData({
        amount: '',
        category: '',
        description: '',
        isIncome: false,
        date: ''
      });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-md shadow-md text-white text-center">
      <h2 className="text-3xl font-bold mb-4">Add New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            type="text"
            name="amount"
            id="amount"
            value={formData.amount}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-black bg-white placeholder-gray-500 focus:outline-none focus:shadow-outline"
            placeholder="Enter amount (e.g., 100)"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-black bg-white placeholder-gray-500 focus:outline-none focus:shadow-outline"
            placeholder="Enter category (e.g., Food)"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-black bg-white placeholder-gray-500 focus:outline-none focus:shadow-outline"
            placeholder="Enter description (optional)"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="isIncome">
            Income?
          </label>
          <input
            type="checkbox"
            name="isIncome"
            id="isIncome"
            checked={formData.isIncome}
            onChange={handleChange}
            className="mr-2 leading-tight"
          />
          <span className="text-sm text-gray-400">Check for income</span>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-black bg-white placeholder-gray-500 focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
