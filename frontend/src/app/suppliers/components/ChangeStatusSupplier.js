import React from "react";

const ChangeStatusSupplier = ({ isOpen, onClose, onConfirm, status }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-60">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-1/3">
        <h3 className="text-lg font-bold text-white mb-4">
          Change status of this supplier?
        </h3>
        <p className="text-gray-400 mb-4">
          If you click “Confirm”, this supplier will be{" "}
          {status === 0 ? "deactivated" : "activated"}.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeStatusSupplier;
