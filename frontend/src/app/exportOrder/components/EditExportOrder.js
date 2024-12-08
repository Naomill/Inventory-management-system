import React, { useState, useEffect } from "react";
import ChangeStatusExportOrder from "./ChangeStatusExportOrder"; // Assume this is the component to handle status change popup

const EditExportOrder = ({ exportOrder, onClose, onSave }) => {
  // Initialize formData only if exportOrder is available
  const [formData, setFormData] = useState(() => {
    if (exportOrder) {
      return {
        product_name: exportOrder.product_name || "",
        quantity: exportOrder.quantity || 0,
        order_date: exportOrder.order_date || "",
        shipping_date: exportOrder.shipping_date || "",
        shipping_address: exportOrder.shipping_address || "",
        shipping_status: exportOrder.shipping_status || "",
        transaction_status: exportOrder.transaction_status || "",
        subtotal: exportOrder.subtotal || 0,
        total_amount: exportOrder.total_amount || 0,
        status: exportOrder.status || 0, // Active or Inactive
      };
    }
    return {}; // Return an empty object if exportOrder is undefined
  });

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newStatus, setNewStatus] = useState(formData.status);

  // Sync form data with exportOrder prop whenever it changes
  useEffect(() => {
    if (exportOrder) {
      setFormData({
        product_name: exportOrder.product_name || "",
        quantity: exportOrder.quantity || 0,
        order_date: exportOrder.order_date || "",
        shipping_date: exportOrder.shipping_date || "",
        shipping_address: exportOrder.shipping_address || "",
        shipping_status: exportOrder.shipping_status || "",
        transaction_status: exportOrder.transaction_status || "",
        subtotal: exportOrder.subtotal || 0,
        total_amount: exportOrder.total_amount || 0,
        status: exportOrder.status || 0,
      });
    }
  }, [exportOrder]); // Re-run when exportOrder prop changes

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save changes
  const handleSave = () => {
    onSave(formData);
  };

  // Handle status change popup
  const handleStatusChange = (status) => {
    setNewStatus(status);
    setIsPopupVisible(true);
  };

  const confirmStatusChange = () => {
    setFormData((prev) => ({ ...prev, status: newStatus }));
    setIsPopupVisible(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-2/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Edit Export Order</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-red-500 text-2xl"
          >
            ✖
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Left side */}
          <div>
            <label className="text-gray-400">Product Name</label>
            <input
              type="text"
              name="product_name"
              value={formData.product_name || ""}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />
            <label className="text-gray-400">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity || 0}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />
            <label className="text-gray-400">Order Date</label>
            <input
              type="date"
              name="order_date"
              value={formData.order_date || ""}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />
            <label className="text-gray-400">Shipping Address</label>
            <textarea
              name="shipping_address"
              value={formData.shipping_address || ""}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            ></textarea>
          </div>

          {/* Right side */}
          <div>
            <label className="text-gray-400">Shipping Date</label>
            <input
              type="date"
              name="shipping_date"
              value={formData.shipping_date || ""}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />
            <label className="text-gray-400">Shipping Status</label>
            <input
              type="text"
              name="shipping_status"
              value={formData.shipping_status || ""}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />
            <label className="text-gray-400">Transaction Status</label>
            <input
              type="text"
              name="transaction_status"
              value={formData.transaction_status || ""}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />
            <label className="text-gray-400">Subtotal</label>
            <input
              type="number"
              name="subtotal"
              value={formData.subtotal || 0}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />
            <label className="text-gray-400">Total Amount</label>
            <input
              type="number"
              name="total_amount"
              value={formData.total_amount || 0}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />
            <label className="block text-gray-400 mb-1 text-sm">
              Status <span className="text-red-500">*Important</span>
            </label>
            <div className="flex items-center space-x-4">
              <label className="text-white flex items-center">
                <input
                  type="radio"
                  name="status"
                  value={1}
                  checked={formData.status === 1}
                  onChange={() => handleStatusChange(1)}
                  className="mr-2"
                />
                Active
              </label>
              <label className="text-white flex items-center">
                <input
                  type="radio"
                  name="status"
                  value={0}
                  checked={formData.status === 0}
                  onChange={() => handleStatusChange(0)}
                  className="mr-2"
                />
                Inactive
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Status Change Popup */}
      <ChangeStatusExportOrder
        isOpen={isPopupVisible}
        onClose={() => setIsPopupVisible(false)}
        onConfirm={confirmStatusChange}
        status={newStatus}
      />
    </div>
  );
};

export default EditExportOrder;
