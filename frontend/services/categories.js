import axios from "axios";

// Create an instance of Axios with a base URL
const api = axios.create({ // ใช้ชื่อ `api` ตลอดไฟล์นี้
    baseURL: "http://localhost:5000/api", // URL ของ Backend
    timeout: 5000, // ตั้งค่าการหมดเวลา
    headers: {
        "Content-Type": "application/json",
    },
});

// Function to fetch categories
export const getCategories = async () => {
    const response = await api.get("/categories");
    console.log("Fetched categories:", response.data); // ตรวจสอบว่าข้อมูลถูกส่งมาหรือไม่
    return response.data;
};

// Function to create a new category
export const createCategory = async (categoryData) => {
    const response = await api.post("/categories", categoryData); // เปลี่ยนเป็น `api`
    console.log("Created category:", response.data); // เพิ่ม log เพื่อตรวจสอบข้อมูล
    return response.data;
};

// Function to delete a category
export const deleteCategory = async (id) => {
    try {
        console.log(`Deleting category ID: ${id}`);
        const response = await api.delete(`/categories/${id}`); // เปลี่ยนเป็น `api`
        console.log("Deleted category:", response.data); // เพิ่ม log เพื่อตรวจสอบข้อมูล
        return response.data;
    } catch (error) {
        console.error("Error in deleteCategory API call:", error.message);
        throw error;
    }
};

// Update a category
export const updateCategory = async (id, updatedData) => {
    try {
        console.log(`Updating category ID: ${id}`, updatedData); // Debugging log
        const response = await api.put(`/categories/${id}`, updatedData); // เปลี่ยนจาก `API` เป็น `api`
        console.log("Updated category response:", response.data); // Debugging log
        return response.data;
    } catch (error) {
        console.error("Error in updateCategory:", error.response?.data || error.message);
        throw error;
    }
};


