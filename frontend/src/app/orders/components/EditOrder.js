import React, { useState } from "react";
import ChangeStatusOrder from "./ChangeStatusOrder"; // ใช้ ChangeStatusOrder เพื่อการยืนยันสถานะ

const EditOrder = ({ order, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    order_id: order.order_id,
    supplier_id: order.supplier_id || "",
    order_date: order.order_date || "",
    product_id: order.product_id || "",
    quantity: order.quantity || "",
    subtotal: order.subtotal || "",
    total_amount: order.total_amount || "",
    status: order.status || "",
  });

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newStatus, setNewStatus] = useState(formData.status); // สถานะที่ผู้ใช้เลือก

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData); // ส่งข้อมูลที่แก้ไขกลับไปยัง Main Component
  };

  const handleStatusChange = (status) => {
    setNewStatus(status);
    setIsPopupVisible(true); // เปิดหน้าต่างยืนยันสถานะ
  };

  const confirmStatusChange = () => {
    setFormData((prev) => ({ ...prev, status: newStatus }));
    setIsPopupVisible(false); // ปิดหน้าต่าง popup
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-2/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Edit Order Detail</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-red-500 text-2xl"
          >
            ✖
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Left Section */}
          <div>
            <label className="text-gray-400">Supplier ID</label>
            <input
              type="number"
              name="supplier_id"
              value={formData.supplier_id}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />

            <label className="text-gray-400">Product ID</label>
            <input
              type="number"
              name="product_id"
              value={formData.product_id}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />

            <label className="text-gray-400">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />
          </div>

          {/* Right Section */}
          <div>
            <label className="text-gray-400">Subtotal</label>
            <input
              type="number"
              name="subtotal"
              value={formData.subtotal}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />

            <label className="block text-gray-400 mb-1 text-sm">
            Status <span className="text-red-500">*Important</span>
            </label>
            <div className="flex items-center space-x-4">
            {/* Completed */}
            <label
                className={`flex items-center px-4 py-2 rounded ${
                formData.status === "Completed"
                    ? "bg-green-500 text-white"
                    : "bg-gray-500 text-white"
                }`}
            >
                <input
                type="radio"
                name="status"
                value="Completed"
                checked={formData.status === "Completed"}
                onChange={() => handleStatusChange("Completed")} // เปลี่ยนสถานะเป็น Completed
                className="mr-2"
                />
                Completed
            </label>

            {/* Pending */}
            <label
                className={`flex items-center px-4 py-2 rounded ${
                formData.status === "Pending"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-500 text-white"
                }`}
            >
                <input
                type="radio"
                name="status"
                value="Pending"
                checked={formData.status === "Pending"}
                onChange={() => handleStatusChange("Pending")} // เปลี่ยนสถานะเป็น Pending
                className="mr-2"
                />
                Pending
            </label>

            {/* Cancelled */}
            <label
                className={`flex items-center px-4 py-2 rounded ${
                formData.status === "Cancelled"
                    ? "bg-red-500 text-white"
                    : "bg-gray-500 text-white"
                }`}
            >
                <input
                type="radio"
                name="status"
                value="Cancelled"
                checked={formData.status === "Cancelled"}
                onChange={() => handleStatusChange("Cancelled")} // เปลี่ยนสถานะเป็น Cancelled
                className="mr-2"
                />
                Cancelled
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

      <ChangeStatusOrder
        isOpen={isPopupVisible}
        onClose={() => setIsPopupVisible(false)}
        onConfirm={confirmStatusChange} // อัปเดตสถานะเมื่อผู้ใช้ยืนยัน
        status={newStatus}
      />
    </div>
  );
};

export default EditOrder;