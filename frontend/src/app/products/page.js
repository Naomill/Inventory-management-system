"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";
import CreateProductPopup from "./components/CreateProductPopup";
import { getProducts, createProduct, updateProductStatus, updateProduct } from "../../../services/products";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState("")    ;
    const [showPopup, setShowPopup] = useState(false);
    const [productToUpdate, setProductToUpdate] = useState(null);
    const [productToEdit, setProductToEdit] = useState(null);

    // Fetch products from the backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };
        fetchProducts();
    }, []);

    const handleProductCreated = async (newProduct) => {
        try {
            console.log("Sending new product:", newProduct); // ดูข้อมูลก่อนส่ง
            const createdProduct = await createProduct(newProduct);
            console.log("Created product:", createdProduct); // ดูผลลัพธ์จาก API
            alert("Product created successfully!");
            window.location.reload(); // รีเฟรชหน้าใหม่หลังสร้างเสร็จ
        } catch (err) {
            console.error("Error creating product:", err.message || err);
            alert("Failed to create product. Please try again.");
        }
    };
    
    // Handle status button click
    const handleStatusClick = (product) => {
        setProductToUpdate(product);
        setShowPopup(true);
    };

    // Confirm status change
    const handleConfirmStatusChange = async () => {
        if (!productToUpdate) {
            console.error("No product selected for status update.");
            return;
        }

        console.log("Updating product status:", productToUpdate);

        try {
            const updatedProduct = await updateProductStatus(
                productToUpdate.product_id,
                !productToUpdate.is_active
            );

            console.log("Product status updated successfully:", updatedProduct);

            alert(`Status updated successfully to ${updatedProduct.is_active ? "Active" : "Inactive"}`);

            // Reload the page to reflect changes
            window.location.reload();
        } catch (err) {
            console.error("Error updating product status:", err.message || err);
            alert("Failed to update product status. Please try again.");
        }
    };

    // Cancel status change
    const handleCancelStatusChange = () => {
        setShowPopup(false);
        setProductToUpdate(null);
    };

    // Handle edit button click
    const handleEditClick = (product) => {
        setProductToEdit(product);
    };

    // Handle product edit save
    const handleProductEdited = async (updatedProduct) => {
        try {
            console.log("Sending payload to API:", updatedProduct);
    
            // เรียกใช้ฟังก์ชัน updateProduct จาก services/products.js
            const response = await updateProduct(updatedProduct.product_id, updatedProduct);
    
            console.log("Response from API:", response);
    
            // อัปเดต State หลังจากแก้ไขสำเร็จ
            setProducts((prevProducts) =>
                prevProducts.map((p) =>
                    p.product_id === updatedProduct.product_id ? response.product : p
                )
            );
    
            alert("Product updated successfully!");
            setProductToEdit(null);
                        
            // Reload the page to reflect changes
            window.location.reload();
        } catch (err) {
            console.error("Error updating product:", err.response ? err.response.data : err.message);
            alert("Failed to update product. Please try again.");
        }
    };

    

    // Filter products by search term
    const filteredProducts = products.filter((product) =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex bg-[#22252A] text-white min-h-screen">
            <Navbar />
            <div className="flex-grow p-6 ml-64 overflow-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-100">Products</h1>
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-green-600 transition"
                    >
                        {showAddForm ? "Cancel" : "Add new product"}
                    </button>
                </div>


                {/* Search Bar */}
                <div className="mb-4 flex items-center">
                    <input
                        type="text"
                        placeholder="Search by Product Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-gray-800 text-gray-300 px-4 py-2 rounded-l focus:outline-none focus:ring focus:ring-gray-700 w-1/3"
                    />
                </div>

                {/* Product Table */}
                <table className="table-auto w-full border-collapse border border-gray-700 rounded-lg shadow-lg bg-gray-800 text-sm">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="border border-gray-700 px-2 py-1 text-left text-gray-300">Product ID</th>
                            <th className="border border-gray-700 px-2 py-1 text-left text-gray-300">Product Name</th>
                            <th className="border border-gray-700 px-2 py-1 text-left text-gray-300">Category</th>
                            <th className="border border-gray-700 px-2 py-1 text-left text-gray-300">SKU</th>
                            <th className="border border-gray-700 px-2 py-1 text-left text-gray-300">Qty</th>
                            <th className="border border-gray-700 px-2 py-1 text-left text-gray-300">Unit Price</th>
                            <th className="border border-gray-700 px-2 py-1 text-left text-gray-300">Description</th>
                            <th className="border border-gray-700 px-2 py-1 text-left text-gray-300">Created At</th>
                            <th className="border border-gray-700 px-2 py-1 text-left text-gray-300">Updated At</th>
                            <th className="border border-gray-700 px-2 py-1 text-left text-gray-300">Status</th>
                            <th className="border border-gray-700 px-2 py-1 text-left text-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.product_id} className="hover:bg-gray-700">
                                <td className="border border-gray-700 px-2 py-1">{product.product_id}</td>
                                <td className="border border-gray-700 px-2 py-1">{product.product_name}</td>
                                <td className="border border-gray-700 px-2 py-1">{product.category_name || "N/A"}</td>
                                <td className="border border-gray-700 px-2 py-1">{product.sku || "N/A"}</td>
                                <td className="border border-gray-700 px-2 py-1">{product.quantity || 0}</td>
                                <td className="border border-gray-700 px-2 py-1">{product.unit_price || "N/A"}</td>
                                <td className="border border-gray-700 px-2 py-1">{product.description || "N/A"}</td>
                                <td className="border border-gray-700 px-2 py-1">{product.created_at || "N/A"}</td>
                                <td className="border border-gray-700 px-2 py-1">{product.updated_at || "N/A"}</td>
                                <td className="border border-gray-700 px-2 py-1">
                                    <button
                                        onClick={() => handleStatusClick(product)}
                                        className={`px-2 py-1 rounded text-white font-bold ${
                                            product.is_active
                                                ? "bg-green-500 hover:bg-green-600"
                                                : "bg-red-500 hover:bg-red-600"
                                        }`}
                                    >
                                        {product.is_active ? "Active" : "Inactive"}
                                    </button>
                                </td>
                                <td className="border border-gray-700 px-2 py-1">
                                    <button
                                        onClick={() => handleEditClick(product)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Status Change Popup */}
                {showPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                            <p className="text-white mb-4">Change status of this product?</p>
                            <p className="text-gray-300 mb-6">
                                If you click "Confirm", this product will be{" "}
                                {productToUpdate?.is_active ? "deactivated" : "activated"}.
                            </p>
                            <div className="flex justify-center space-x-4">
                                <button
                                    onClick={handleCancelStatusChange}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmStatusChange}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {/* Create Product Form */}
                {showAddForm && (
                    <CreateProductPopup
                        onClose={() => setShowAddForm(false)}
                        onSave={handleProductCreated}
                    />
                )}

                {/* Edit Product Form */}
                {productToEdit && (
                    <EditProduct
                        product={productToEdit}
                        onClose={() => setProductToEdit(null)} // ฟังก์ชันปิดฟอร์ม
                        onSave={handleProductEdited} // ฟังก์ชันแก้ไข
                    />

                )}
            </div>
        </div>
    );
};

export default ProductsPage;