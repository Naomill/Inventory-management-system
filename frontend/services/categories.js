import axios from "axios";

// Create an instance of Axios with a base URL
const api = axios.create({ // ใช้ชื่อ `api` ตลอดไฟล์นี้
    baseURL: "http://localhost:5001/api", // URL ของ Backend
    timeout: 5001, // ตั้งค่าการหมดเวลา
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

// Function to update category status
export const updateCategoryStatus = async (id, newStatus) => {
    try {
        console.log(`Sending request to update status: {id: ${id}, newStatus: ${newStatus}}`);
        const response = await api.patch(`/categories/${id}/status`, { is_active: newStatus });
        console.log("Response from server:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error in updateCategoryStatus:", error.response?.data || error.message);
        throw error;
    }
};
