import React, { useState, useEffect } from "react";
import API from "../../../../services/api";
import ChangeStatusExportOrder from "./ChangeStatusExportOrder";

const EditExportOrder = ({ exportOrder, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    export_order_id: "",
    customer_id: "",
    customer_name: "",
    product_id: "",
    product_name: "",
    order_date: "",
    shipping_date: "",
    shipping_address: "",
    shipping_status: "",
    quantity: "",
    subtotal: "",
    total_amount: "",
    status: "",
  });

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  // Initialize formData when exportOrder changes
  useEffect(() => {
    if (exportOrder) {
      setFormData({ ...exportOrder });
      setNewStatus(exportOrder.status || "Pending");
    }
  }, [exportOrder]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const updatedData = { ...formData, status: newStatus };
      const response = await API.put(
        `/export-orders/${formData.export_order_id}`,
        updatedData
      );
      onSave(response.data);
      alert("Export Order updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error saving export order:", error);
      alert("Failed to update export order.");
    }
  };

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
          {/* Left Form Fields */}
          <div>
            <label className="text-gray-400">Customer ID</label>
            <input
              type="text"
              name="customer_id"
              value={formData.customer_id || ""}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />
            <label className="text-gray-400">Product ID</label>
            <input
              type="text"
              name="product_id"
              value={formData.product_id || ""}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />
            <label className="text-gray-400">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity || ""}
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

          {/* Right Form Fields */}
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
            <label className="text-gray-400">Subtotal</label>
            <input
              type="number"
              name="subtotal"
              value={formData.subtotal || ""}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />
            <label className="text-gray-400">Total Amount</label>
            <input
              type="number"
              name="total_amount"
              value={formData.total_amount || ""}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />
            <label className="text-gray-400">Status</label>
            <div className="flex items-center space-x-4">
              {["Pending", "Shipped", "Completed"].map((status) => (
                <label key={status} className="text-white flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={newStatus === status}
                    onChange={() => handleStatusChange(status)}
                    className="mr-2"
                  />
                  {status}
                </label>
              ))}
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
