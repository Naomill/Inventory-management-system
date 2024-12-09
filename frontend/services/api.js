import axios from 'axios';

const API = axios.create({
    baseURL: "http://localhost:5000/api", // ต้องตรงกับ URL Backend
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});