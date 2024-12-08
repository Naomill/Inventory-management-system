import React from "react";

const ViewExportOrder = ({ order, onClose }) => {
  if (!order) return null;  // ถ้าไม่มีข้อมูลให้ return null

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">Export Order Details</h2>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded mb-4"
        >
          Close
        </button>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <strong>Export Order ID:</strong> {order.export_order_id}
          </div>
          <div>
            <strong>Customer ID:</strong> {order.customer_id}
          </div>
          <div>
            <strong>Customer Name:</strong> {order.customer_name}
          </div>
          <div>
            <strong>Product ID:</strong> {order.product_id}
          </div>
          <div>
            <strong>Product Name:</strong> {order.product_name}
          </div>
          <div>
            <strong>Quantity:</strong> {order.quantity}
          </div>
          <div>
            <strong>Order Date:</strong> {new Date(order.order_date).toLocaleDateString()}
          </div>
          <div>
            <strong>Shipping Date:</strong> {new Date(order.shipping_date).toLocaleDateString()}
          </div>
          <div>
            <strong>Shipping Address:</strong> {order.shipping_address}
          </div>
          <div>
            <strong>Shipping Status:</strong> {order.shipping_status}
          </div>
          <div>
            <strong>Subtotal:</strong> {order.subtotal}
          </div>
          <div>
            <strong>Total Amount:</strong> {order.total_amount}
          </div>
          <div>
            <strong>Status:</strong> 
            <span
              className={`px-4 py-2 rounded ${
                order.status === "Active" ? "bg-green-500 text-white" : "bg-red-500 text-white"
              }`}
            >
              {order.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewExportOrder;
