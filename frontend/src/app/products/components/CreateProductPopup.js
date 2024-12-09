"use client";

import { useState } from "react";

const CreateProductPopup = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        product_name: "",
        sku: "",
        category_id: "",
        quantity: 0,
        unit_price: "",
        description: "",
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
        console.log("Form Data:", formData); // ตรวจสอบข้อมูล
        if (!formData.product_name.trim()) return "Product Name is required.";
        if (!formData.sku.trim()) return "SKU is required.";
        if (!formData.category_id) return "Category ID is required.";
        if (formData.quantity < 0) return "Quantity cannot be negative.";
        if (formData.unit_price === "" || formData.unit_price < 0) return "Unit Price must be positive.";
        return null;
    };

    const handleSave = () => {
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        onSave(formData); // Pass the new product data to parent
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h3 className="text-white font-bold text-lg mb-4">Add New Product</h3>

                {error && <p className="text-red-500 mb-4">{error}</p>}

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
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateProductPopup;
