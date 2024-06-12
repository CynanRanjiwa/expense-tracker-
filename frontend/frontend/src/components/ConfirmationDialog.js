import React from "react";

const ConfirmationDialog = ({ visible, onConfirm, onCancel }) => {
  if (!visible) {
    return null; // If the dialog is not visible, return null to render nothing
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
        <p className="mb-4">Are you sure you want to delete this transaction?</p>
        <div className="flex justify-end">
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 mr-2 rounded"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
