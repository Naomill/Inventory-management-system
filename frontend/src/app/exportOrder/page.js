"use client";

import { useState, useEffect } from "react";
import API from "../../../services/api";
import CreateExportOrder from './components/CreateExportOrder'; 
import ViewExportOrder from './components/ViewExportOrder';
import EditExportOrder from "./components/EditExportOrder";

const ExportOrderPage = () => {
  const [exportOrders, setExportOrders] = useState([]);
  const [filteredExportOrders, setFilteredExportOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isCreateOrderVisible, setIsCreateOrderVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  // ดึงข้อมูล Export Orders จาก API
  useEffect(() => {
    const fetchExportOrders = async () => {
      try {
        const response = await API.get("/export-orders");
        const sortedData = response.data.sort(
          (a, b) => a.export_order_id - b.export_order_id
        );
        setExportOrders(sortedData);
        setFilteredExportOrders(sortedData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchExportOrders();
  }, []);

  // ฟิลเตอร์ข้อมูลเมื่อ searchTerm เปลี่ยน
  useEffect(() => {
    const searchResults = exportOrders.filter((order) =>
      order.export_order_id.toString().includes(searchTerm.trim())
    );
    setFilteredExportOrders(searchResults);
  }, [searchTerm, exportOrders]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewOrder = async (id) => {
    try {
      const response = await API.get(`/export-orders/${id}`);
      setSelectedOrder(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleCreateOrder = () => {
    setIsCreateOrderVisible(!isCreateOrderVisible);  
  };

  const refreshData = async () => {
    const response = await API.get("/export-orders");
    setExportOrders(response.data);
  };

  const handleEdit = (exportOrder) => {
    setEditingOrder(exportOrder);
  };

  const handleSaveEdit = async (updatedOrder) => {
    try {
      await API.put(`/export-orders/${updatedOrder.export_order_id}`, updatedOrder);
  
      const updatedOrders = exportOrders.map((ord) =>
        ord.export_order_id === updatedOrder.export_order_id ? updatedOrder : ord
      );
      setExportOrders(updatedOrders);
      setFilteredExportOrders(updatedOrders);
      setEditingOrder(null);
    } catch (err) {
      console.error("Unable to save export order:", err);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Export Orders</h1>

        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search by Export Order ID"
            className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button
            onClick={toggleCreateOrder}
            className={`px-4 py-2 rounded ${
              isCreateOrderVisible ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isCreateOrderVisible ? "Cancel" : "+ Create"}
          </button>
        </div>

        {isCreateOrderVisible && (
          <CreateExportOrder
            onOrderCreated={refreshData}
          />
        )}

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-700 px-4 py-2">Export Order ID</th>
                <th className="border border-gray-700 px-4 py-2">Customer ID</th>
                <th className="border border-gray-700 px-4 py-2">Customer Name</th>
                <th className="border border-gray-700 px-4 py-2">Product ID</th>
                <th className="border border-gray-700 px-4 py-2">Product Name</th>
                <th className="border border-gray-700 px-4 py-2">Quantity</th>
                <th className="border border-gray-700 px-4 py-2">Order Date</th>
                <th className="border border-gray-700 px-4 py-2">Shipping Date</th>
                <th className="border border-gray-700 px-4 py-2">Shipping Address</th>
                <th className="border border-gray-700 px-4 py-2">Shipping Status</th>
                <th className="border border-gray-700 px-4 py-2">Subtotal</th>
                <th className="border border-gray-700 px-4 py-2">Total Amount</th>
                <th className="border border-gray-700 px-4 py-2">Status</th>
                <th className="border border-gray-700 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredExportOrders.map((order) => (
                <tr key={order.export_order_id} className="odd:bg-gray-800 even:bg-gray-700">
                  <td className="border border-gray-700 px-4 py-2">{order.export_order_id}</td>
                  <td className="border border-gray-700 px-4 py-2">{order.customer_id}</td>
                  <td className="border border-gray-700 px-4 py-2">{order.customer_name}</td>
                  <td className="border border-gray-700 px-4 py-2">{order.product_id}</td>
                  <td className="border border-gray-700 px-4 py-2">{order.product_name}</td>
                  <td className="border border-gray-700 px-4 py-2">{order.quantity}</td>
                  <td className="border border-gray-700 px-4 py-2">{new Date(order.order_date).toLocaleDateString()}</td>
                  <td className="border border-gray-700 px-4 py-2">{new Date(order.shipping_date).toLocaleDateString()}</td>
                  <td className="border border-gray-700 px-4 py-2">{order.shipping_address}</td>
                  <td className="border border-gray-700 px-4 py-2">{order.shipping_status}</td>
                  <td className="border border-gray-700 px-4 py-2">{order.subtotal}</td>
                  <td className="border border-gray-700 px-4 py-2">{order.total_amount}</td>
                  <td className="border border-gray-700 px-4 py-2">
                    <span
                      className={`px-4 py-2 rounded ${
                        order.status === "Active" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="border border-gray-700 px-4 py-2 flex justify-center items-center">
                    <button
                      onClick={() => handleViewOrder(order.export_order_id)}
                      className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 text-white mr-4"
                    >
                      Show
                    </button>
                    <button
                      onClick={() => handleEdit(order)}
                      className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 text-white"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedOrder && (
            <ViewExportOrder
              order={selectedOrder}
              onClose={() => setSelectedOrder(null)}
            />
          )}
        </div>

        {editingOrder && (
          <EditExportOrder
            order={editingOrder}
            onClose={() => setEditingOrder(null)}
            onSave={handleSaveEdit}
          />
        )}
      </div>
    </div>
  );
};

export default ExportOrderPage;
