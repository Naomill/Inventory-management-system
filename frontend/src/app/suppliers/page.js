"use client";

import { useState, useEffect } from "react";
import API from "../../../services/api";
import CreateSupplier from './components/CreateSupplier';
import ViewSupplier from './components/ViewSupplier';
import EditSupplier from "./components/EditSupplier";
import Navbar from "app/sideBar/Navbar";

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [isCreateSupplierVisible, setIsCreateSupplierVisible] = useState(false);

  // ดึงข้อมูลซัพพลายเออร์จาก API
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await API.get("/supplier");
        const sortedData = response.data.sort(
          (a, b) => a.supplier_id - b.supplier_id
        );
        setSuppliers(sortedData);
        setFilteredSuppliers(sortedData); // ตั้งค่าข้อมูลเริ่มต้นสำหรับการค้นหา
      } catch (err) {
        console.error(err);
      }
    };

    fetchSuppliers();
  }, []);

  const handleViewSupplier = async (id) => {
    try {
        const response = await API.get(`/supplier/${id}`);
        setSelectedSupplier(response.data);
    } catch (err) {
        console.error(err);
    }
};

  // ฟิลเตอร์ซัพพลายเออร์เมื่อ searchTerm เปลี่ยน
  useEffect(() => {
    const searchResults = suppliers.filter((supplier) =>
      supplier.supplier_id.toString().includes(searchTerm.trim())
    );
    setFilteredSuppliers(searchResults);
  }, [searchTerm, suppliers]);

  // อัปเดต searchTerm เมื่อผู้ใช้กรอกข้อมูลในช่องค้นหา
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
  };

  const handleSaveEdit = async (updatedSupplier) => {
    try {
      // เรียก API เพื่ออัปเดตข้อมูลในฐานข้อมูล
      await API.put(`/supplier/${updatedSupplier.supplier_id}`, updatedSupplier);
  
      // อัปเดต state ใน React หลังจากบันทึกสำเร็จ
      const updatedSuppliers = suppliers.map((sup) =>
        sup.supplier_id === updatedSupplier.supplier_id ? updatedSupplier : sup
      );
      setSuppliers(updatedSuppliers);
      setFilteredSuppliers(updatedSuppliers);
      setEditingSupplier(null); // ปิดหน้าต่าง Edit หลังบันทึกสำเร็จ
    } catch (err) {
      console.error("Unable to save supplier information:", err);
    }
  };

  const toggleCreateSupplier = () => {
    setIsCreateSupplierVisible(!isCreateSupplierVisible);  
  };

 // ฟังก์ชันรีเฟรชข้อมูล
 const refreshData = async () => {
  const response = await API.get("/supplier");
  setSuppliers(response.data);
};

  return (
    <div className="flex bg-gray-900 text-white min-h-screen">
      <Navbar />
      <div className="flex-grow p-6 ml-64 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Supplier Management</h1>

        {/* ค้นหาและปุ่มสร้าง */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search by Supplier ID"
              className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button
            onClick={toggleCreateSupplier}
            className={`px-4 py-2 rounded ${isCreateSupplierVisible ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
          >
            {isCreateSupplierVisible ? "Cancel" : "+ Create"}
          </button>
        </div>

        {isCreateSupplierVisible && (
          <CreateSupplier
            onSupplierCreated={refreshData}
          />
        )}

        {/* ตารางข้อมูล */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-700 px-4 py-2">Supplier ID</th>
                <th className="border border-gray-700 px-4 py-2">Supplier Name</th>
                <th className="border border-gray-700 px-4 py-2">Contact Name</th>
                <th className="border border-gray-700 px-4 py-2">Phone</th>
                <th className="border border-gray-700 px-4 py-2">Email</th>
                <th className="border border-gray-700 px-4 py-2">Address</th>
                <th className="border border-gray-700 px-4 py-2">Status</th>
                <th className="border border-gray-700 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier) => (
                <tr
                  key={supplier.supplier_id}
                  className="odd:bg-gray-800 even:bg-gray-700"
                >
                  <td className="border border-gray-700 px-4 py-2">
                    {supplier.supplier_id}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {supplier.supplier_name}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {supplier.contact_name}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {supplier.phone}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {supplier.email}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {supplier.address}
                  </td>
                  <td className="border border-gray-700 px-4 py-2 " >
                    <span
                      className={`px-4 py-2 rounded ${
                        supplier.is_active === 1
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {supplier.is_active === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="border border-gray-700 px-4 py-2 flex justify-center items-center">
                    {/* ปุ่ม Show */}
                    <button
                      onClick={() => handleViewSupplier(supplier.supplier_id)}
                      className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600  text-white  mr-4"
                    >
                      Show
                    </button>

                    {/* ปุ่ม Edit */}
                    <button
                      onClick={() => handleEdit(supplier)}
                      className="bg-yellow-500 px-4 py-2 rounded hover:bg-amber-500 text-white"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedSupplier && (
                <ViewSupplier
                    supplier={selectedSupplier}
                    onClose={() => setSelectedSupplier(null)}
                />
            )}

            
        </div>
        {editingSupplier && (
        <EditSupplier
          supplier={editingSupplier}
          onClose={() => setEditingSupplier(null)}
          onSave={handleSaveEdit}
        />
      )}
      </div>
    </div>
  );
};

export default SuppliersPage;
