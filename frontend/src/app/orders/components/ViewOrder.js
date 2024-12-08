import React from "react";

const ViewOrder = ({ order, onClose, onEdit }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-2/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Show Order  Detail</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-red-500 text-2xl"
          >
            ✖
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* ซ้าย */}
          <div>
            <label className="text-gray-400">Order ID</label>
            <input
              type="text"
              value={order.supplier_id || "N/A"}
              disabled
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />

            <label className="text-gray-400">Product ID</label>
            <input
              type="text"
              value={order.product_id || "N/A"}
              disabled
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />

            <label className="text-gray-400">Quantity</label>
            <input
              type="text"
              value={order.quantity || "N/A"}
              disabled
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />
            </div>

            

          {/* ขวา */}
          <div>
            <label className="text-gray-400">Subtotal</label>
            <input
              type="text"
              value={order.subtotal || "N/A"}
              disabled
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />

            <label className="text-gray-400">Total Amount</label>
            <input
              type="text"
              value={order.total_amount || "N/A"}
              disabled
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />

        <label className="block text-gray-400 mb-1 text-sm">Status</label>
        <div
        className={`inline-block text-white p-2 rounded text-center ${
            order.status === "Completed"
            ? "bg-green-500"
            : order.status === "Pending"
            ? "bg-yellow-500"
            : order.status === "Cancelled"
            ? "bg-red-500"
            : "bg-gray-500" // Default color for other statuses
        }`}
        >
        {order.status}
        </div>


          </div>
        </div>
        </div>
      </div>
      
  );
};

export default ViewOrder;
