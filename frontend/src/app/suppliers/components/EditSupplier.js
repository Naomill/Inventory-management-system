import React, { useState } from "react";
import API from '../../../../services/api';

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

  const [showModal, setShowModal] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "is_active") {
      setPendingStatus(Number(value)); // เก็บสถานะที่ผู้ใช้กำลังจะเปลี่ยน
      setShowModal(true); // แสดง Modal
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const confirmStatusChange = () => {
    setFormData((prev) => ({
      ...prev,
      is_active: pendingStatus,
    }));
    setShowModal(false); // ปิด Modal
  };

  const cancelStatusChange = () => {
    setShowModal(false); // ปิด Modal โดยไม่เปลี่ยนสถานะ
  };

  const handleSave = async () => {
    try {
      const response = await API.put(`/supplier/${formData.supplier_id}`, formData);

      if (response.status === 200) {
        alert("Supplier updated successfully");
        onSave(formData);
      } else {
        alert("Failed to update supplier.");
      }
    } catch (error) {
      alert("Failed to update supplier.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-2/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Edit Supplier Detail</h2>
          <button onClick={onClose} className="text-white hover:text-red-500 text-2xl">
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  className="mr-2 hidden"
                />
                Inactive
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600">
            Save Changes
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-1/3 text-center">
            <h2 className="text-xl font-bold text-white mb-4">Change status of this supplier?</h2>
            <p className="text-gray-300 mb-6">If you click "Confirm", the status will be updated.</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={cancelStatusChange}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmStatusChange}
                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditSupplier;
