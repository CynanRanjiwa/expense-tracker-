import React from "react";

function TransactionTable({ transactions, handleDeleteTransaction }) {
  return (
    <div className="flex flex-col justify-center items-center mt-16">
      <table className="min-w-full mt-10 divide-y divide-gray-700 dark:bg-gray-800">
        <thead className="bg-gray-600 dark:bg-gray-700">
          <tr>
            {/* Table headers */}
            {["Amount", "Category", "Description", "Income", "Date", "Action"].map(header => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-gray-700 dark:bg-gray-800 divide-y divide-gray-600 dark:divide-gray-700">
          {/* Iterate over transactions and create a row for each */}
          {transactions.map((tran) => (
            <tr key={tran.id}>
              <td className="px-6 py-4 text-gray-200 dark:text-white">
                {tran.amount}
              </td>
              <td className="px-6 py-4 text-gray-200 dark:text-white">
                {tran.category}
              </td>
              <td className="px-6 py-4 text-gray-200 dark:text-white">
                {tran.description}
              </td>
              <td className="px-6 py-4 text-gray-200 dark:text-white">
                {/* Display "Yes" or "No" based on is_income value */}
                {tran.is_income ? (
                  <span className="bg-green-500 dark:bg-green-300 text-green-100 dark:text-green-800 px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    Yes
                  </span>
                ) : (
                  <span className="bg-red-500 dark:bg-red-300 text-red-100 dark:text-red-800 px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    No
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-gray-200 dark:text-white">
                {tran.date}
              </td>
              <td className="px-6 py-4 text-left text-sm font-medium">
                {/* Delete button */}
                <button
                  onClick={() => handleDeleteTransaction(tran.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;

