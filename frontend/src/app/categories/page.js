"use client";

import { useState, useEffect } from "react";
import Navbar from "../sideBar/Navbar";
import { getCategories, createCategory, updateCategory } from "../../../services/categories";

const page = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    // Add Popup States
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [newCategoryData, setNewCategoryData] = useState({
        category_name: "",
        description: "",
    });

    // Edit Popup States
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState(null);
    const [editCategoryData, setEditCategoryData] = useState({
        category_name: "",
        description: "",
    });

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };
        fetchCategories();
    }, []);
    

    // Handle opening and closing Add Popup
    const handleOpenAddPopup = () => setShowAddPopup(true);
    const handleCloseAddPopup = () => {
        setShowAddPopup(false);
        setNewCategoryData({ category_name: "", description: "" });
    };

    // Handle opening and closing Edit Popup
    const handleOpenEditPopup = (category) => {
        setShowEditPopup(true);
        setCategoryToEdit(category);
        setEditCategoryData({
            category_name: category.category_name,
            description: category.description || "",
        });
    };
    const handleCloseEditPopup = () => {
        setShowEditPopup(false);
        setCategoryToEdit(null);
        setEditCategoryData({ category_name: "", description: "" });
    };

    const [searchTerm, setSearchTerm] = useState("");    
    // Filter products by search term
    const filteredCategory = categories.filter((category) =>
        category.category_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.category_id.toString().includes(searchTerm)
    );

    // Handle adding a new category
    const handleAddCategory = async () => {
        const { category_name, description } = newCategoryData;

        if (!category_name || !description) {
            alert("Please fill out all fields.");
            return;
        }

        try {
            const newCategory = await createCategory({ category_name, description });
            setCategories((prev) => [...prev, newCategory]);
            handleCloseAddPopup();
            alert("Category added successfully!");
        } catch (err) {
            console.error("Error adding category:", err);
            alert("Failed to add category.");
        }
    };

    // Handle editing a category
    const handleEditCategory = async () => {
        if (!editCategoryData.category_name || !editCategoryData.description) {
            alert("Please fill out all fields.");
            return;
        }
    
        try {
            const updatedCategory = await updateCategory(categoryToEdit.category_id, editCategoryData);
            setCategories((prev) =>
                prev.map((cat) =>
                    cat.category_id === categoryToEdit.category_id ? updatedCategory : cat
                )
            );
            setShowEditPopup(false);
            alert("Category updated successfully!");
            window.location.reload();
        } catch (err) {
            console.error("Error updating category:", err);
            alert("Failed to update category.");
        }
    };

    return (
        <div className="flex bg-gray-900 text-white min-h-screen">
            <Navbar />
            <div className="flex-grow p-6 ml-64 overflow-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-100">Categories</h1>
                </div>

                {loading && <p className="text-gray-300">Loading...</p>}

                {/* Search Bar */}
                <div className="flex items-center justify-between mb-4">
                    <input
                        type="text"
                        placeholder="Search by Category ID or Category Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-gray-800 text-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-gray-700 w-1/3"
                    />
                    <button
                        onClick={handleOpenAddPopup}
                        className="bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-green-600 transition"
                    >
                        Add Category
                    </button>
                </div>

                <table className="table-auto w-full border-collapse border border-gray-700 rounded-lg bg-gray-800 text-sm">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="border border-gray-700 px-4 py-2">Category ID</th>
                            <th className="border border-gray-700 px-4 py-2">Category Name</th>
                            <th className="border border-gray-700 px-4 py-2">Description</th>
                            <th className="border border-gray-700 px-4 py-2">Status</th>
                            <th className="border border-gray-700 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategory.map((category) => (
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
                                        onClick={() => handleOpenEditPopup(category)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    {/* <button
                                        onClick={() => handleToggleStatus(category)}
                                        className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded"
                                    >
                                        {category.is_active ? "Set Inactive" : "Set Active"}
                                    </button> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Add Category Popup */}
                {showAddPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/3">
                            <h2 className="text-xl font-bold mb-4">Add New Category</h2>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-1">Category Name</label>
                                <input
                                    type="text"
                                    value={newCategoryData.category_name}
                                    onChange={(e) =>
                                        setNewCategoryData({ ...newCategoryData, category_name: e.target.value })
                                    }
                                    className="bg-gray-700 px-4 py-2 rounded w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-1">Description</label>
                                <textarea
                                    value={newCategoryData.description}
                                    onChange={(e) =>
                                        setNewCategoryData({ ...newCategoryData, description: e.target.value })
                                    }
                                    className="bg-gray-700 px-4 py-2 rounded w-full"
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button onClick={handleCloseAddPopup} className="bg-gray-500 px-4 py-2 rounded">
                                    Cancel
                                </button>
                                <button onClick={handleAddCategory} className="bg-green-500 px-4 py-2 rounded">
                                    Add Category
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Category Popup */}
                {showEditPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/3">
                            <h2 className="text-xl font-bold mb-4">Edit Category</h2>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-1">Category Name</label>
                                <input
                                    type="text"
                                    value={editCategoryData.category_name}
                                    onChange={(e) =>
                                        setEditCategoryData({ ...editCategoryData, category_name: e.target.value })
                                    }
                                    className="bg-gray-700 px-4 py-2 rounded w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-1">Description</label>
                                <textarea
                                    value={editCategoryData.description}
                                    onChange={(e) =>
                                        setEditCategoryData({ ...editCategoryData, description: e.target.value })
                                    }
                                    className="bg-gray-700 px-4 py-2 rounded w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-1">Status</label>
                                <select
                                    value={editCategoryData.is_active ? "Active" : "Inactive"}
                                    onChange={(e) =>
                                        setEditCategoryData({ ...editCategoryData, is_active: e.target.value === "Active" })
                                    }
                                    className="bg-gray-700 px-4 py-2 rounded w-full"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button onClick={handleCloseEditPopup} className="bg-gray-500 px-4 py-2 rounded">
                                    Cancel
                                </button>
                                <button onClick={handleEditCategory} className="bg-blue-500 px-4 py-2 rounded">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default page;