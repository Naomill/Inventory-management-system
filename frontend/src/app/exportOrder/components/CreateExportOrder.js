import React, { useState } from "react";
import API from "../../../../services/api";

const CreateExportOrder = ({ onOrderCreated }) => {
  const [formData, setFormData] = useState({
    customer_id: "",
    shipping_date: "",
    shipping_address: "",
    shipping_status: "",
    product_id: "",
    quantity: "",
    subtotal: "",
    total_amount: "",
    status: "Pending", // Default status
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "subtotal" || name === "total_amount" ? value || "0" : value, // Handle numeric fields
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Simple validation
    if (!formData.customer_id || !formData.product_id || !formData.quantity) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const response = await API.post("/export-orders", formData);
      console.log(response);  // Log the response for debugging
      onOrderCreated();  // Refresh the order list
      alert("Export Order created successfully!");
      
      // Reset the form after success
      setFormData({
        customer_id: "",
        shipping_date: "",
        shipping_address: "",
        shipping_status: "",
        product_id: "",
        quantity: "",
        subtotal: "",
        total_amount: "",
        status: "Pending", // Reset status to Pending
      });
    } catch (err) {
      console.error("Error creating export order:", err.response || err);
      alert("Failed to create export order.");
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Export Order</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <label className="block">Customer ID</label>
          <input
            type="text"
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            className="px-4 py-2 rounded bg-gray-800 text-white w-full"
            required
          />
        </div>

        <div>
          <label className="block">Product ID</label>
          <input
            type="text"
            name="product_id"
            value={formData.product_id}
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

        <div className="col-span-2">
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

        <div className="flex justify-end mt-4 col-span-2">
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
