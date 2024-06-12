import React, { useState } from "react";
import api from "../api/api"; // Importing the API service for making HTTP requests

// The TransactionForm component receives fetchTransaction as a prop
function TransactionForm({ fetchTransaction }) {
  // useState hook to manage the form data state
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    is_income: false,
    date: "",
  });

  // Function to handle changes in form inputs
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    // Determine the new value based on the input type
    const newValue = type === "checkbox" ? checked : value;

    // Update the formData state with the new value
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      // Send a POST request to add a new transaction
      await api.post("/addtransaction/", formData);

      // Fetch updated transactions after successful submission
      fetchTransaction();

      // Reset the form fields after submission
      setFormData({
        amount: "",
        category: "",
        description: "",
        is_income: false,
        date: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-16">
      <form onSubmit={handleFormSubmit}>
        {/* Amount Field */}
        <div className="w-full">
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="w-full p-3 mt-2"
          />
        </div>

        {/* Category Field */}
        <div className="w-full">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-3 mt-2"
          />
        </div>

        {/* Description Field */}
        <div className="w-full">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-3 mt-2"
          />
        </div>

        {/* Income Checkbox */}
        <div className="w-full">
          <label htmlFor="is_income">Income?</label>
          <input
            type="checkbox"
            id="is_income"
            name="is_income"
            checked={formData.is_income}
            onChange={handleInputChange}
            className="mt-2"
          />
        </div>

        {/* Date Field */}
        <div className="w-full">
          <label htmlFor="date">Date</label>
          <input
            type="text"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full p-3 mt-2"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-2 py-3 bg-blue-500 text-center mt-4 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;
