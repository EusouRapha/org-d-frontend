import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:4000", // Substitua pela URL do seu backend
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
