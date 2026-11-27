import axios from "axios";

// Ket noi Product Service (Port 8081)
export const productApi = axios.create({
  baseURL: import.meta.env.VITE_PRODUCT_API_URL || "http://localhost:8081/api",
  timeout: 10000
});

// Ket noi Order Service (Port 8082)
export const orderApi = axios.create({
  baseURL: import.meta.env.VITE_ORDER_API_URL || "http://localhost:8082/api",
  timeout: 10000
});
