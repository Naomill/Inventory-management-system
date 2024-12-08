"use client";

import { useState, useEffect } from "react";
import API from "../../../services/api";
import CreateCustomers from './components/CreateCustomers'; 
import ViewCustomer from './components/ViewCustomers';
import EditCustomer from "./components/EditCustomers";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isCreateCustomerVisible, setIsCreateCustomerVisible] = useState(false);  // สถานะควบคุมการแสดงฟอร์ม
  const [editingCustomer, setEditingCustomer] = useState(null);

  // ดึงข้อมูลลูกค้าจาก API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await API.get("/customers");
        const sortedData = response.data.sort(
          (a, b) => a.customer_id - b.customer_id
        );
        setCustomers(sortedData);
        setFilteredCustomers(sortedData); // ตั้งค่าข้อมูลเริ่มต้นสำหรับการค้นหา
      } catch (err) {
        console.error(err);
      }
    };

    fetchCustomers();
  }, []);

  // ฟิลเตอร์ลูกค้าเมื่อ searchTerm เปลี่ยน
  useEffect(() => {
    const searchResults = customers.filter((customer) =>
      customer.customer_id.toString().includes(searchTerm.trim())
    );
    setFilteredCustomers(searchResults);
  }, [searchTerm, customers]);

  // อัปเดต searchTerm เมื่อผู้ใช้กรอกข้อมูลในช่องค้นหา
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewCustomer = async (id) => {
    try {
      const response = await API.get(`/customers/${id}`);
      setSelectedCustomer(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ฟังก์ชันเปิด/ปิดหน้า Create Customer
  const toggleCreateCustomer = () => {
    setIsCreateCustomerVisible(!isCreateCustomerVisible);  
  };

  // ฟังก์ชันรีเฟรชข้อมูล
  const refreshData = async () => {
    const response = await API.get("/customers");
    setCustomers(response.data);
  };
  const handleEdit = (customer) => {
    setEditingCustomer(customer);
  };

  const handleSaveEdit = async (updatedCustomer) => {
    try {
      // เรียก API เพื่ออัปเดตข้อมูลในฐานข้อมูล
      await API.put(`/customers/${updatedCustomer.customer_id}`, updatedCustomer); // Corrected this line
  
      // อัปเดต state ใน React หลังจากบันทึกสำเร็จ
      const updatedCustomers = customers.map((cust) =>
        cust.customer_id === updatedCustomer.customer_id ? updatedCustomer : cust
      );
      setCustomers(updatedCustomers);
      setFilteredCustomers(updatedCustomers);
      setEditingCustomer(null); // ปิดหน้าต่าง Edit หลังบันทึกสำเร็จ
    } catch (err) {
      console.error("Unable to save customer information:", err);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Customer Management</h1>

        {/* ค้นหาและปุ่มสร้าง */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search by Customer ID"
              className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          {/* ปุ่ม Create/Cancel */}
          <button
            onClick={toggleCreateCustomer}
            className={`px-4 py-2 rounded ${isCreateCustomerVisible ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
          >
            {isCreateCustomerVisible ? "Cancel" : "+ Create"}
          </button>
        </div>

        {/* ถ้า isCreateCustomerVisible เป็นจริง จะแสดงฟอร์ม CreateCustomers */}
        {isCreateCustomerVisible && (
          <CreateCustomers
            onCustomerCreated={refreshData}
          />
        )}

        {/* ตารางข้อมูล */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-700 px-4 py-2">Customer ID</th>
                <th className="border border-gray-700 px-4 py-2">Customer Name</th>
                <th className="border border-gray-700 px-4 py-2">Contact Name</th>
                <th className="border border-gray-700 px-4 py-2">Phone</th>
                <th className="border border-gray-700 px-4 py-2">Email</th>
                <th className="border border-gray-700 px-4 py-2">Address</th>
                <th className="border border-gray-700 px-4 py-2">Status</th>
                <th className="border border-gray-700 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.customer_id}
                  className="odd:bg-gray-800 even:bg-gray-700"
                >
                  <td className="border border-gray-700 px-4 py-2">
                    {customer.customer_id}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {customer.customer_name}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {customer.contact_name}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {customer.phone}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {customer.email}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {customer.address}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    <span
                      className={`px-4 py-2 rounded ${
                        customer.is_active === 1
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {customer.is_active === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="border border-gray-700 px-4 py-2 flex justify-center items-center">
                    {/* ปุ่ม Show */}
                    <button
                      onClick={() => handleViewCustomer(customer.customer_id)}
                      className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 text-white mr-4"
                    >
                      Show
                    </button>

                    {/* ปุ่ม Edit */}
                    <button
                      onClick={() => handleEdit(customer)}
                      className="bg-yellow-500 px-4 py-2 rounded hover:bg-amber-500 text-white"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedCustomer && (
            <ViewCustomer
              customer={selectedCustomer}
              onClose={() => setSelectedCustomer(null)}
            />
          )}
        </div>
        
        {editingCustomer && (
  <EditCustomer
    customer={editingCustomer}
    onClose={() => setEditingCustomer(null)}
    onSave={handleSaveEdit}
  />

      )}        
      </div>
    </div>
  );
};

export default CustomersPage;