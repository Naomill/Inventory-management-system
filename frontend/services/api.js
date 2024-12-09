import axios from 'axios';

const API = axios.create({
    baseURL: "http://localhost:5000/api", // Backend URL
    timeout: 5000, // Timeout 5 วินาที
    headers: {
        "Content-Type": "application/json",
    },
});


export default API;