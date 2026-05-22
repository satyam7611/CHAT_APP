import axios from "axios";

// Access the API base URL from Vite environment variables
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Create a pre-configured Axios instance
const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true, // Always attach cookies (JWTs) automatically
});
console.log("Base url is :",baseURL)

// Example: You could also add interceptors here if needed for global error handling
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
