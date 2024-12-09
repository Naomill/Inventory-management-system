import React from "react";

const ViewExportOrder = ({ exportOrder, onClose, onEdit }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-2/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Show Export Order Detail</h2>
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
            <label className="text-gray-400">Customer ID</label>
            <input
              type="number"
              value={exportOrder.customer_id || "N/A"}
              disabled
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />

            <label className="text-gray-400">Shipping Date</label>
            <input
              type="text"
              value={exportOrder.shipping_data || "N/A"}
              disabled
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />

            <label className="text-gray-400">Shipping Address</label>
            <input
              type="text"
              value={exportOrder.shippiing_address || "N/A"}
              disabled
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />
            </div>

            <label className="text-gray-400">Shipping Status</label>
            <input
              type="text"
              value={exportOrder.shippiing_status || "N/A"}
              disabled
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />
            </div>

          {/* ขวา */}
          <div>
            <label className="text-gray-400">Product ID</label>
            <input
              type="text"
              value={exportOrder.product_id || "N/A"}
              disabled
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />

            <label className="text-gray-400">Quantity</label>
            <input
              type="text"
              value={exportOrder.quantity || "N/A"}
              disabled
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />

            <label className="text-gray-400">Subtotal</label>
            <input
              type="text"
              value={exportOrder.subtotal || "N/A"}
              disabled
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />

            <label className="text-gray-400">Total Amount</label>
            <input
              type="text"
              value={exportOrder.total_amount || "N/A"}
              disabled
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />

        <label className="block text-gray-400 mb-1 text-sm">Status</label>
        <div
        className={`inline-block text-white p-2 rounded text-center ${
            exportOrder.status === "Completed"
            ? "bg-green-500"
            : exportOrder.status === "Pending"
            ? "bg-yellow-500"
            : exportOrder.status === "Cancelled"
            ? "bg-red-500"
            : "bg-gray-500" // Default color for other statuses
        }`}
        >
        {exportOrder.status}
        </div>


          </div>
        </div>
        </div>
      
      
  );
};

export default ViewExportOrder;
