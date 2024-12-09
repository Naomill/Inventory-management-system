import axios from "axios";

// Create an instance of Axios with a base URL
const API = axios.create({
    baseURL: "http://localhost:5001/api", // URL ของ Backend
    timeout: 5001, // ตั้งค่าการหมดเวลา
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
export const updateProduct = async (productId, updatedProduct) => {
    const response = await API.put(`/products/${productId}`, updatedProduct);
    return response.data;
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