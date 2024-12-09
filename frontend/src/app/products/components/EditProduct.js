"use client";

import { useState } from "react";

const EditProduct = ({ product, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        product_name: product.product_name || "",
        category_id: product.category_id || "",
        sku: product.sku || "",
        quantity: product.quantity || 0,
        unit_price: product.unit_price || "",
        description: product.description || "",
    });
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        if (!formData.product_name.trim()) {
            return "Product Name is required.";
        }
        if (formData.unit_price === "" || formData.unit_price < 0) {
            return "Unit Price must be a positive number.";
        }
        if (formData.quantity < 0) {
            return "Quantity cannot be negative.";
        }
        return null;
    };

    const handleSave = () => {
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }
    
        const updatedProduct = {
            ...product, // ข้อมูลเดิมของสินค้า
            ...formData, // ข้อมูลใหม่ที่ผู้ใช้แก้ไข
        };
    
        console.log("Payload being sent to onSave:", updatedProduct);
    
        onSave(updatedProduct); // เรียกฟังก์ชัน onSave เพื่ออัปเดตข้อมูล
    };
    

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h3 className="text-white font-bold text-lg mb-4">Edit Product</h3>

                {error && (
                    <p className="text-red-500 mb-4">{error}</p>
                )}

                <div className="mb-4">
                    <label className="block text-gray-300">Product Name</label>
                    <input
                        type="text"
                        name="product_name"
                        value={formData.product_name}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 text-gray-300 px-3 py-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300">Category ID</label>
                    <input
                        type="number"
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 text-gray-300 px-3 py-2 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-300">SKU</label>
                    <input
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 text-gray-300 px-3 py-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 text-gray-300 px-3 py-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300">Unit Price</label>
                    <input
                        type="number"
                        name="unit_price"
                        value={formData.unit_price}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 text-gray-300 px-3 py-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 text-gray-300 px-3 py-2 rounded"
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
