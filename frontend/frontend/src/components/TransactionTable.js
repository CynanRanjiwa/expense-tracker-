// import React from "react";

// function TransactionTable({ transactions, handleDeleteTransaction }) {
//   return (
//     <div className="flex flex-col justify-center items-center mt-16">
//       <table className="min-w-full mt-10 divide-y divide-gray-700 dark:bg-gray-800">
//         <thead className="bg-gray-600 dark:bg-gray-700">
//           <tr>
//             {/* Table headers */}
//             {["Amount", "Category", "Description", "Income", "Date", "Action"].map(header => (
//               <th
//                 key={header}
//                 className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
//               >
//                 {header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="bg-gray-700 dark:bg-gray-800 divide-y divide-gray-600 dark:divide-gray-700">
//           {/* Iterate over transactions and create a row for each */}
//           {transactions.map((tran) => (
//             <tr key={tran.id}>
//               <td className="px-6 py-4 text-gray-200 dark:text-white">
//                 {tran.amount}
//               </td>
//               <td className="px-6 py-4 text-gray-200 dark:text-white">
//                 {tran.category}
//               </td>
//               <td className="px-6 py-4 text-gray-200 dark:text-white">
//                 {tran.description}
//               </td>
//               <td className="px-6 py-4 text-gray-200 dark:text-white">
//                 {/* Display "Yes" or "No" based on is_income value */}
//                 {tran.is_income ? (
//                   <span className="bg-green-500 dark:bg-green-300 text-green-100 dark:text-green-800 px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
//                     Yes
//                   </span>
//                 ) : (
//                   <span className="bg-red-500 dark:bg-red-300 text-red-100 dark:text-red-800 px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
//                     No
//                   </span>
//                 )}
//               </td>
//               <td className="px-6 py-4 text-gray-200 dark:text-white">
//                 {tran.date}
//               </td>
//               <td className="px-6 py-4 text-left text-sm font-medium">
//                 {/* Delete button */}
//                 <button
//                   onClick={() => handleDeleteTransaction(tran.id)}
//                   className="text-red-600 hover:text-red-900"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default TransactionTable;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:8000/gettransactions/');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-gray-800 text-white p-8 rounded-md shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-center">Transaction History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap text-lg font-semibold">{transaction.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {transaction.is_income ? (
                    <span className="px-3 py-1 text-xs font-semibold bg-green-500 text-white rounded-full">Income</span>
                  ) : (
                    <span className="px-3 py-1 text-xs font-semibold bg-red-500 text-white rounded-full">Expense</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
