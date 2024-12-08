import React from "react";

const ViewExportOrder = ({ exportOrder, onClose, onEdit }) => {
  // ตรวจสอบว่า exportOrder มีค่าและใช้ค่าปริยายหากไม่มี
  const {
    export_order_id = "N/A",
    product_name = "N/A",
    quantity = "N/A",
    order_date = "N/A",
    shipping_date = "N/A",
    shipping_address = "N/A",
    shipping_status = "N/A",
    transaction_status = "N/A",
    subtotal = "N/A",
    total_amount = "N/A",
    is_active = 0,
  } = exportOrder || {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-2/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Export Order Detail</h2>
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
            <label className="text-gray-400">Export Order ID</label>
            <input
              type="text"
              value={export_order_id}
              disabled
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />

            <label className="text-gray-400">Product Name</label>
            <input
              type="text"
              value={product_name}
              disabled
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />

            <label className="text-gray-400">Quantity</label>
            <input
              type="text"
              value={quantity}
              disabled
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />

            <label className="text-gray-400">Order Date</label>
            <input
              type="text"
              value={order_date}
              disabled
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />

            <label className="text-gray-400">Shipping Date</label>
            <input
              type="text"
              value={shipping_date}
              disabled
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />
          </div>

          {/* ขวา */}
          <div>
            <label className="text-gray-400">Shipping Address</label>
            <input
              type="text"
              value={shipping_address}
              disabled
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />

            <label className="text-gray-400">Shipping Status</label>
            <input
              type="text"
              value={shipping_status}
              disabled
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />

            <label className="text-gray-400">Transaction Status</label>
            <input
              type="text"
              value={transaction_status}
              disabled
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />

            <label className="text-gray-400">Subtotal</label>
            <input
              type="text"
              value={subtotal}
              disabled
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />

            <label className="text-gray-400">Total Amount</label>
            <input
              type="text"
              value={total_amount}
              disabled
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />

            <label className="block text-gray-400 mb-1 text-sm">Status</label>
            <div
              className={`inline-block text-white p-2 rounded text-center ${
                is_active === 1 ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {is_active === 1 ? "Active" : "Inactive"}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewExportOrder;
