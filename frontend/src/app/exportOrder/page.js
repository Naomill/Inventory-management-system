"use client";

import { useState, useEffect } from "react";
import API from "../../../services/api";
import CreateExportOrder from "./components/CreateExportOrder";
import EditExportOrder from "./components/EditExportOrder";
import Navbar from "app/sideBar/Navbar";

const ExportOrdersPage = () => {
  const [exportOrders, setExportOrders] = useState([]);
  const [filteredExportOrders, setFilteredExportOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExportOrder, setSelectedExportOrder] = useState(null);
  const [editingExportOrder, setEditingExportOrder] = useState(null);
  const [isCreateExportOrderVisible, setIsCreateExportOrderVisible] =
    useState(false);

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

  const handleViewExportOrder = async (id) => {
    try {
      const response = await API.get(`/export-orders/${id}`);
      setSelectedExportOrder(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const searchResults = exportOrders.filter((exportOrder) =>
      exportOrder.export_order_id?.toString().includes(searchTerm.trim())
    );
    setFilteredExportOrders(searchResults);
  }, [searchTerm, exportOrders]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (exportOrder) => {
    console.log("Editing Export Order:", exportOrder);
    if (!exportOrder.export_order_id) {
        console.error("Export Order ID is missing in the selected data");
        return;
    }
    setEditingExportOrder(exportOrder);
};

const handleSaveEdit = async (updatedExportOrder) => {
    try {
        if (!updatedExportOrder.export_order_id) {
            console.error("Export Order ID is missing");
            return;
        }
        console.log("Updated Export Order:", updatedExportOrder);

        const url = `/export-orders/${updatedExportOrder.export_order_id}`;
        console.log("Generated URL:", url);

        await API.put(url, updatedExportOrder, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("Update successful");

        const updatedExportOrders = exportOrders.map((sup) =>
            sup.export_order_id === updatedExportOrder.export_order_id
                ? updatedExportOrder
                : sup
        );
        setExportOrders(updatedExportOrders);
        setFilteredExportOrders(updatedExportOrders);
        setEditingExportOrder(null);
    } catch (err) {
        console.error("Error Response:", {
            data: err.response?.data,
            status: err.response?.status,
            headers: err.response?.headers,
            message: err.message,
        });
    }
};

  const toggleCreateExportOrder = () => {
    setIsCreateExportOrderVisible(!isCreateExportOrderVisible);
  };

  const refreshData = async () => {
    try {
      const response = await API.get("/export-orders");
      const sortedData = response.data.sort(
        (a, b) => a.export_order_id - b.export_order_id
      );
      setExportOrders(sortedData);
      setFilteredExportOrders(sortedData);
    } catch (err) {
      console.error("Error refreshing data:", err);
    }
  };

  return (
    <div className="flex bg-gray-900 text-white min-h-screen">
      <Navbar />
      <div className="flex-grow p-6 ml-64 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Export Order Management</h1>

        {/* ค้นหาและปุ่มสร้าง */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search by Export order ID"
              className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button
            onClick={toggleCreateExportOrder}
            className={`px-4 py-2 rounded ${isCreateExportOrderVisible ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
          >
            {isCreateExportOrderVisible ? "Cancel" : "+ Create"}
          </button>
        </div>

        {isCreateExportOrderVisible && (
          <CreateExportOrder
            onExportOrderCreated={refreshData}
          />
        )}

        {/* ตารางข้อมูล */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-700 px-4 py-2">Export Order ID</th>
                <th className="border border-gray-700 px-4 py-2">Customer ID</th>
                <th className="border border-gray-700 px-4 py-2">Order Date</th>
                <th className="border border-gray-700 px-4 py-2">Shipping Date</th>
                <th className="border border-gray-700 px-4 py-2">Shipping Address</th>
                <th className="border border-gray-700 px-4 py-2">Shipping Status</th>
                <th className="border border-gray-700 px-4 py-2">Product ID</th>
                <th className="border border-gray-700 px-4 py-2">Quantity</th>
                <th className="border border-gray-700 px-4 py-2">Subtotal</th>
                <th className="border border-gray-700 px-4 py-2">Total Amount</th>
                <th className="border border-gray-700 px-4 py-2">Status</th>
                <th className="border border-gray-700 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredExportOrders.map((exportOrder) => (
                <tr
                  key={exportOrder.export_order_id}
                  className="odd:bg-gray-800 even:bg-gray-700"
                >
                  <td className="border border-gray-700 px-4 py-2">
                    {exportOrder.export_order_id}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {exportOrder.customer_id}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {exportOrder.order_date}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {exportOrder.shipping_date}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {exportOrder.shipping_address}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {exportOrder.shipping_status}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {exportOrder.product_id}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {exportOrder.quantity}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {exportOrder.subtotal}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {exportOrder.total_amount}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                        <span
                            className={`px-4 py-2 rounded text-white ${
                                exportOrder.status === "Completed"
                                ? "bg-green-500"
                                : exportOrder.status === "Pending"
                                ? "bg-yellow-500"
                                : exportOrder.status === "Cancelled"
                                ? "bg-red-500"
                                : "bg-gray-500"
                            }`}
                        >
                            {exportOrder.status}
                        </span>
                        </td>

                        <td className="border border-gray-700 px-4 py-2">
                        

                            {/* ปุ่ม Edit */}
                            <button
                            onClick={() => handleEdit(exportOrder)}
                            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 text-white"
                            >
                            Edit
                            </button>
                       
                        </td>

                </tr>
              ))}
            </tbody>
          </table>
    
        </div>
        {editingExportOrder && (
        <EditExportOrder
            exportOrder={editingExportOrder}
            onClose={() => setEditingExportOrder(null)}
            onSave={handleSaveEdit}
        />
      )}
      </div>
    </div>
  );
};

export default ExportOrdersPage;
