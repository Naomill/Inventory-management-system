import React, { useState } from "react";
import API from "../../../../services/api";

const CreateExportOrder = ({ onOrderCreated }) => {
  // สร้าง state สำหรับฟอร์ม
  const [formData, setFormData] = useState({
    product_name: "",
    quantity: "",
    order_date: "",
    shipping_date: "",
    shipping_address: "",
    shipping_status: "",
    subtotal: "",
    total_amount: "",
    status: "Pending",  // ค่าเริ่มต้น
  });

  // ฟังก์ชันสำหรับอัพเดตข้อมูลในฟอร์ม
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ฟังก์ชันสำหรับบันทึกข้อมูลลง API
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await API.post("/export-orders", formData);
      // เรียกใช้ฟังก์ชัน onOrderCreated เพื่อรีเฟรชข้อมูล
      onOrderCreated();
      alert("Export Order created successfully!");
      // รีเซ็ตฟอร์มหลังการบันทึกข้อมูล
      setFormData({
        product_name: "",
        quantity: "",
        order_date: "",
        shipping_date: "",
        shipping_address: "",
        shipping_status: "",
        subtotal: "",
        total_amount: "",
        status: "Pending",
      });
    } catch (err) {
      console.error("Error creating export order:", err);
      alert("Failed to create export order.");
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Export Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Product Name</label>
          <input
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            className="px-4 py-2 rounded bg-gray-800 text-white w-full"
            required
          />
        </div>

        <div>
          <label className="block">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="px-4 py-2 rounded bg-gray-800 text-white w-full"
            required
          />
        </div>

        <div>
          <label className="block">Order Date</label>
          <input
            type="date"
            name="order_date"
            value={formData.order_date}
            onChange={handleChange}
            className="px-4 py-2 rounded bg-gray-800 text-white w-full"
            required
          />
        </div>

        <div>
          <label className="block">Shipping Date</label>
          <input
            type="date"
            name="shipping_date"
            value={formData.shipping_date}
            onChange={handleChange}
            className="px-4 py-2 rounded bg-gray-800 text-white w-full"
            required
          />
        </div>

        <div>
          <label className="block">Shipping Address</label>
          <input
            type="text"
            name="shipping_address"
            value={formData.shipping_address}
            onChange={handleChange}
            className="px-4 py-2 rounded bg-gray-800 text-white w-full"
            required
          />
        </div>

        <div>
          <label className="block">Shipping Status</label>
          <input
            type="text"
            name="shipping_status"
            value={formData.shipping_status}
            onChange={handleChange}
            className="px-4 py-2 rounded bg-gray-800 text-white w-full"
            required
          />
        </div>

        <div>
          <label className="block">Subtotal</label>
          <input
            type="number"
            name="subtotal"
            value={formData.subtotal}
            onChange={handleChange}
            className="px-4 py-2 rounded bg-gray-800 text-white w-full"
            required
          />
        </div>

        <div>
          <label className="block">Total Amount</label>
          <input
            type="number"
            name="total_amount"
            value={formData.total_amount}
            onChange={handleChange}
            className="px-4 py-2 rounded bg-gray-800 text-white w-full"
            required
          />
        </div>

        <div>
          <label className="block">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="px-4 py-2 rounded bg-gray-800 text-white w-full"
            required
          >
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
          >
            Create Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateExportOrder;
