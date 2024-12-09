import React, { useState } from "react";
import ChangeStatusSupplier from "./ChangeStatusSupplier"; // ใช้ ChangeStatusSupplier เพื่อการยืนยันสถานะ

const EditSupplier = ({ supplier, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    supplier_id: supplier.supplier_id,
    supplier_name: supplier.supplier_name || "",
    contact_name: supplier.contact_name || "",
    phone: supplier.phone || "",
    email: supplier.email || "",
    address: supplier.address || "",
    is_active: supplier.is_active || 0,
  });

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newStatus, setNewStatus] = useState(formData.is_active); // สถานะที่ผู้ใช้เลือก

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
    setFormData((prev) => ({ ...prev, is_active: newStatus }));
    setIsPopupVisible(false); // ปิดหน้าต่าง popup
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-2/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Edit Supplier Detail</h2>
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
            <label className="text-gray-400">Supplier Name</label>
            <input
              type="text"
              name="supplier_name"
              value={formData.supplier_name}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />

            <label className="text-gray-400">Contact Name</label>
            <input
              type="text"
              name="contact_name"
              value={formData.contact_name}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />

            <label className="text-gray-400">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />
          </div>

          {/* Right Section */}
          <div>
            <label className="text-gray-400">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />

            <label className="text-gray-400">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            ></textarea>

            <label className="block text-gray-400 mb-1 text-sm">
              Status <span className="text-red-500">*Important</span>
            </label>
            <div className="flex items-center space-x-4">
              {/* Active Button */}
              <label
                className={`flex items-center px-4 py-2 rounded ${
                  formData.is_active === 1
                    ? "bg-green-500 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                <input
                  type="radio"
                  name="is_active"
                  value={1}
                  checked={formData.is_active === 1}
                  onChange={() => handleStatusChange(1)} // เปลี่ยนสถานะเป็น Active
                  className="mr-2 hidden"
                />
                Active
              </label>

              {/* Inactive Button */}
              <label
                className={`flex items-center px-4 py-2 rounded ${
                  formData.is_active === 0
                    ? "bg-red-500 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                <input
                  type="radio"
                  name="is_active"
                  value={0}
                  checked={formData.is_active === 0}
                  onChange={() => handleStatusChange(0)} // เปลี่ยนสถานะเป็น Inactive
                  className="mr-2 hidden"
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

      <ChangeStatusSupplier
        isOpen={isPopupVisible}
        onClose={() => setIsPopupVisible(false)}
        onConfirm={confirmStatusChange} // อัปเดตสถานะเมื่อผู้ใช้ยืนยัน
        status={newStatus}
      />
    </div>
  );
};

export default EditSupplier;