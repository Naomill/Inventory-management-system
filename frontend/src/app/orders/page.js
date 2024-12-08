"use client";

import { useState, useEffect } from "react";
import API from "../../../services/api";
import CreateOrder from './components/CreateOrder';
import ViewOrder from './components/ViewOrder';
import EditOrder from "./components/EditOrder";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [isCreateOrderVisible, setIsCreateOrderVisible] = useState(false);

  // ดึงข้อมูลซัพพลายเออร์จาก API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await API.get("/orders");
        const sortedData = response.data.sort(
          (a, b) => a.order_id - b.order_id
        );
        setOrders(sortedData);
        setFilteredOrders(sortedData); // ตั้งค่าข้อมูลเริ่มต้นสำหรับการค้นหา
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  const handleViewOrder = async (id) => {
    try {
        const response = await API.get(`/orders/${id}`);
        setSelectedOrder(response.data);
    } catch (err) {
        console.error(err);
    }
};

  // ฟิลเตอร์ซัพพลายเออร์เมื่อ searchTerm เปลี่ยน
  useEffect(() => {
    const searchResults = orders.filter((order) =>
        order.order_id.toString().includes(searchTerm.trim())
    );
    setFilteredOrders(searchResults);
  }, [searchTerm,orders]);

  // อัปเดต searchTerm เมื่อผู้ใช้กรอกข้อมูลในช่องค้นหา
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
  };

  const handleSaveEdit = async (updatedOrder) => {
    try {
      // เรียก API เพื่ออัปเดตข้อมูลในฐานข้อมูล
      await API.put(`/orders/${updatedOrder.order_id}`, updatedOrder);
  
      // อัปเดต state ใน React หลังจากบันทึกสำเร็จ
      const updatedOrders = orders.map((sup) =>
        sup.order_id === updatedOrder.order_id ? updatedOrder : sup
      );
      setOrders(updatedOrders);
      setFilteredOrders(updatedOrders);
      setEditingOrder(null); // ปิดหน้าต่าง Edit หลังบันทึกสำเร็จ
    } catch (err) {
      console.error("Unable to save order information:", err);
    }
  };

  const toggleCreateOrder = () => {
    setIsCreateOrderVisible(!isCreateOrderVisible);  
  };

 // ฟังก์ชันรีเฟรชข้อมูล
 const refreshData = async () => {
  const response = await API.get("/orders");
  setOrders(response.data);
};

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Order Management</h1>

        {/* ค้นหาและปุ่มสร้าง */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search by Order ID"
              className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button
            onClick={toggleCreateOrder}
            className={`px-4 py-2 rounded ${isCreateOrderVisible ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
          >
            {isCreateOrderVisible ? "Cancel" : "+ Create"}
          </button>
        </div>

        {isCreateOrderVisible && (
          <CreateOrder
            onOrderCreated={refreshData}
          />
        )}

        {/* ตารางข้อมูล */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-700 px-4 py-2">Order ID</th>
                <th className="border border-gray-700 px-4 py-2">Supplier ID</th>
                <th className="border border-gray-700 px-4 py-2">Supplier Name</th>
                <th className="border border-gray-700 px-4 py-2">Product ID</th>
                <th className="border border-gray-700 px-4 py-2">Product Name</th>
                <th className="border border-gray-700 px-4 py-2">Order Date</th>
                <th className="border border-gray-700 px-4 py-2">Quantity</th>
                <th className="border border-gray-700 px-4 py-2">Subtotal</th>
                <th className="border border-gray-700 px-4 py-2">Total Amount</th>
                <th className="border border-gray-700 px-4 py-2">Status</th>
                <th className="border border-gray-700 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.order_id}
                  className="odd:bg-gray-800 even:bg-gray-700"
                >
                  <td className="border border-gray-700 px-4 py-2">
                    {order.order_id}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {order.supplier_id}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {order.supplier_name}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {order.product_id}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {order.product_name}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {order.order_date}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {order.quantity}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {order.subtotal}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {order.total_amount}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                        <span
                            className={`px-4 py-2 rounded text-white ${
                            order.status === "Completed"
                                ? "bg-green-500"
                                : order.status === "Pending"
                                ? "bg-yellow-500"
                                : order.status === "Cancelled"
                                ? "bg-red-500"
                                : "bg-gray-500"
                            }`}
                        >
                            {order.status}
                        </span>
                        </td>

                  <td className="border border-gray-700 px-4 py-2 flex justify-center items-center">
                    {/* ปุ่ม Show */}
                    <button
                      onClick={() => handleViewOrder(order.order_id)}
                      className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600  text-white  mr-4"
                    >
                      Show
                    </button>

                    {/* ปุ่ม Edit */}
                    <button
                      onClick={() => handleEdit(order)}
                      className="bg-yellow-500 px-4 py-2 rounded hover:bg-amber-500 text-white"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedOrder && (
                <ViewOrder
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                />
            )}

            
        </div>
        {editingOrder && (
        <EditOrder
            order={editingOrder}
            onClose={() => setEditingOrder(null)}
            onSave={handleSaveEdit}
        />
      )}
      </div>
    </div>
  );
};

export default OrdersPage;
