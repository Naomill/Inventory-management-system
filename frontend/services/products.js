import axios from "axios";

// Create an instance of Axios with a base URL
const API = axios.create({
    baseURL: "http://localhost:5000/api", // URL ของ Backend
    timeout: 5000, // ตั้งค่าการหมดเวลา
    headers: {
        "Content-Type": "application/json",
    },
});

// Fetch all products
export const getProducts = async () => {
    try {
        const response = await API.get("/products");
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

// Create a new product
export const createProduct = async (productData) => {
    try {
        const response = await API.post("/products", productData);
        return response.data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

// Update a product
export const updateProduct = async (productId, updatedData) => {
    try {
        if (!updatedData.category_id) {
            throw new Error("Category ID is missing");
        }
        const response = await axios.put(`http://localhost:5001/api/products/${productId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error in updateProduct API:", error.response?.data || error.message);
        throw error;
    }
};


export const updateProductStatus = async (productId, isActive) => {
    try {
        const response = await API.patch(`/products/${productId}/status`, { is_active: isActive });
        return response.data;
    } catch (error) {
        console.error("Error in updateProductStatus API:", error.response?.data || error.message);
        throw error;
    }
};