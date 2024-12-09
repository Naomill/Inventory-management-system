"use client";

import { useState } from "react";
import { addProduct } from "../../../../services/products";

const AddProductForm = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        product_name: "",
        sku: "",
        category_id: "",
        description: "",
        quantity: "",
        unit_price: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
    
        const formattedData = {
            ...formData,
            category_id: parseInt(formData.category_id, 10),
            quantity: parseInt(formData.quantity, 10),
            unit_price: parseFloat(formData.unit_price),
        };
    
        try {
            const newProduct = await addProduct(formattedData);
            onSuccess(newProduct);
            onClose();
        } catch (error) {
            setError(error.message || 'Failed to add product');
        } finally {
            setLoading(false);
        }
    };
    
    

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white rounded-lg shadow-lg p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">เพิ่มสินค้าใหม่</h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="product_name" className="block text-sm font-medium mb-1">
                            ชื่อสินค้า
                        </label>
                        <input
                            type="text"
                            id="product_name"
                            name="product_name"
                            value={formData.product_name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="sku" className="block text-sm font-medium mb-1">
                            SKU
                        </label>
                        <input
                            type="text"
                            id="sku"
                            name="sku"
                            value={formData.sku}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="category_id" className="block text-sm font-medium mb-1">
                            หมวดหมู่สินค้า (Category ID)
                        </label>
                        <input
                            type="number"
                            id="category_id"
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium mb-1">
                            รายละเอียดสินค้า
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium mb-1">
                            จำนวน
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="unit_price" className="block text-sm font-medium mb-1">
                            ราคาต่อหน่วย
                        </label>
                        <input
                            type="number"
                            id="unit_price"
                            name="unit_price"
                            value={formData.unit_price}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            ยกเลิก
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-4 py-2 rounded text-white ${
                                loading ? "bg-blue-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                            }`}
                        >
                            {loading ? "กำลังบันทึก..." : "บันทึกสินค้า"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductForm;
