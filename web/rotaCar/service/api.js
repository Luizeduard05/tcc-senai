import axios from "axios"

const api = axios.create({
    baseURL: "https://10.0.3.208:5000",
});

export default api;