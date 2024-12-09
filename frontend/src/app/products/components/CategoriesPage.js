"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import {
getCategories,
createCategory,
} from "../../../../services/categories";

import { updateCategoryStatus } from "../../../../services/categories";


const CategoriesPage = () => {
const [categories, setCategories] = useState([]);
const [showAddPopup, setShowAddPopup] = useState(false);
const [newCategoryData, setNewCategoryData] = useState({
    category_id: "",
    category_name: "",
    description: "",
    is_active: true,
});
const [loading, setLoading] = useState(false);

const [categoryToUpdate, setCategoryToUpdate] = useState(null);
const [showPopup, setShowPopup] = useState(false); // To control the popup visibility

// Fetch categories
useEffect(() => {
    const fetchCategories = async () => {
    setLoading(true);
    try {
        const data = await getCategories();
        console.log("Fetched categories:", data);
        setCategories(data);
    } catch (err) {
        console.error("Error fetching categories:", err);
    } finally {
        setLoading(false);
    }
    };
    fetchCategories();
}, []);

// Handle opening and closing popup
const handleOpenAddPopup = () => setShowAddPopup(true);
const handleCloseAddPopup = () => {
    setShowAddPopup(false);
    setNewCategoryData({
    category_id: "",
    category_name: "",
    description: "",
    is_active: true,
    });
};

// Handle adding a new category
const handleAddCategory = async () => {
    const { category_id, category_name, description, is_active } = newCategoryData;

    if (!category_id || !category_name || !description) {
        alert("Please fill out all fields.");
        return;
    }

    try {
        const newCategory = await createCategory({
            category_id,
            category_name,
            description,
            is_active,
        });

        setCategories((prev) => [...prev, newCategory]);
        setShowAddPopup(false);
        setNewCategoryData({
            category_id: "",
            category_name: "",
            description: "",
            is_active: true,
        });
        alert("Category added successfully!");
    } catch (err) {
        console.error("Error adding category:", err.message || err);
        alert("Failed to add category.");
    }
};

const handleToggleStatus = async (category) => {
    try {
        console.log("Toggling status for:", category);

        // ส่งคำขอไปที่ API เพื่ออัปเดตสถานะ
        const updatedCategory = await updateCategoryStatus(category.category_id, !category.is_active);

        // อัปเดต state นอกการ render
        setCategories((prevCategories) =>
            prevCategories.map((cat) =>
                cat.category_id === category.category_id
                    ? { ...cat, is_active: updatedCategory.is_active }
                    : cat
            )
        );
    } catch (error) {
        console.error("Error updating category status:", error);
    }
};


return (
    <div className="flex bg-[#22252A] text-white min-h-screen">
        <Navbar />
        <div className="flex-grow p-6 ml-64 overflow-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-100">Categories</h1>
                <button
                    onClick={handleOpenAddPopup}
                    className="bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-green-600 transition"
                >
                    Add Category
                </button>
            </div>
            

            {/* Loading Indicator */}
            {loading && <p className="text-gray-300">Loading...</p>}

            {/* Table */}
            <table className="table-auto w-full border-collapse border border-gray-700 rounded-lg bg-gray-800 text-sm">
                <thead>
                    <tr className="bg-gray-700">
                        <th className="border border-gray-700 px-4 py-2 text-left text-gray-300">
                            Category ID
                        </th>
                        <th className="border border-gray-700 px-4 py-2 text-left text-gray-300">
                            Category Name
                        </th>
                        <th className="border border-gray-700 px-4 py-2 text-left text-gray-300">
                            Description
                        </th>
                        <th className="border border-gray-700 px-4 py-2 text-left text-gray-300">
                            Status
                        </th>
                        <th className="border border-gray-700 px-4 py-2 text-left text-gray-300">
                            Actions
                        </th>
                    </tr>
                </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.category_id} className="hover:bg-gray-700">
                                <td className="border border-gray-700 px-4 py-2">{category.category_id}</td>
                                <td className="border border-gray-700 px-4 py-2">{category.category_name}</td>
                                <td className="border border-gray-700 px-4 py-2">{category.description || "N/A"}</td>
                                <td className="border border-gray-700 px-4 py-2">
                                    <span
                                        className={`px-2 py-1 rounded text-white ${
                                            category.is_active ? "bg-green-500" : "bg-red-500"
                                        }`}
                                    >
                                        {category.is_active ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="border border-gray-700 px-4 py-2">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mr-2"
                                        onClick={() => handleToggleStatus(category)}
                                    >
                                        {category.is_active ? "Set Inactive" : "Set Active"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
            </table>

            {/* Add Category Popup */}
            {showAddPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-white text-xl font-bold mb-4">Add New Category</h2>

                        {/* Category ID */}
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-1">Category ID:</label>
                            <input
                                type="text"
                                value={newCategoryData.category_id}
                                onChange={(e) =>
                                    setNewCategoryData({
                                        ...newCategoryData,
                                        category_id: e.target.value,
                                    })
                                }
                                className="bg-gray-700 text-gray-300 px-4 py-2 rounded w-full"
                                placeholder="Enter Category ID"
                            />
                        </div>

                        {/* Category Name */}
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-1">Category Name:</label>
                            <input
                                type="text"
                                value={newCategoryData.category_name}
                                onChange={(e) =>
                                    setNewCategoryData({
                                        ...newCategoryData,
                                        category_name: e.target.value,
                                    })
                                }
                                className="bg-gray-700 text-gray-300 px-4 py-2 rounded w-full"
                                placeholder="Enter Category Name"
                            />
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-1">Description:</label>
                            <textarea
                                value={newCategoryData.description}
                                onChange={(e) =>
                                    setNewCategoryData({
                                        ...newCategoryData,
                                        description: e.target.value,
                                    })
                                }
                                className="bg-gray-700 text-gray-300 px-4 py-2 rounded w-full"
                                placeholder="Enter Description"
                            ></textarea>
                        </div>

                        {/* Status */}
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-1">Status:</label>
                            <select
                                value={newCategoryData.is_active}
                                onChange={(e) =>
                                    setNewCategoryData({
                                        ...newCategoryData,
                                        is_active: e.target.value === "true",
                                    })
                                }
                                className="bg-gray-700 text-gray-300 px-4 py-2 rounded w-full"
                            >
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleCloseAddPopup}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddCategory}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                            >
                                Add Category
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
);

};

export default CategoriesPage;


