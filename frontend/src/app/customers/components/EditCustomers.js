import React, { useState, useEffect } from "react";
import API from '../../../../services/api';

const EditCustomers = ({ customer, onClose, onSave }) => { // เพิ่ม onSave เป็น prop
  const [formData, setFormData] = useState({
      customer_id: customer.customer_id,
      customer_name: customer.customer_name || "",
      contact_name: customer.contact_name || "",
      phone: customer.phone || "",
      email: customer.email || "",
      address: customer.address || "",
      is_active: customer.is_active || 0,
  });

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
          ...prev,
          [name]: name === "is_active" ? Number(value) : value, // แปลง is_active เป็นตัวเลข
      }));
  };

  const handleSave = async () => {
      try {
          console.log("Sending data to API:", formData);

          const response = await API.put(`/customers/${formData.customer_id}`, formData);

          if (response.status === 200) {
              alert("Customer updated successfully");
              onSave(formData); // เรียก onSave พร้อมส่งข้อมูลที่แก้ไขกลับไป
          } else {
              console.error("Error response:", response.data);
              alert("Failed to update customer.");
          }
      } catch (error) {
          console.error("Error updating customer:", error);
          alert("Failed to update customer.");
      }
  };
  

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-2/3">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-white">Edit Customer Detail</h2>
                    <button onClick={onClose} className="text-white hover:text-red-500 text-2xl">
                        ✖
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-gray-400">Customer Name</label>
                        <input
                            type="text"
                            name="customer_name"
                            value={formData.customer_name}
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
                            <label className="text-white flex items-center">
                                <input
                                    type="radio"
                                    name="is_active"
                                    value={1}
                                    checked={formData.is_active === 1}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                Active
                            </label>
                            <label className="text-white flex items-center">
                                <input
                                    type="radio"
                                    name="is_active"
                                    value={0}
                                    checked={formData.is_active === 0}
                                    onChange={handleInputChange}
                                    className="mr-2"
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
        </div>
    );
};

export default EditCustomers;
