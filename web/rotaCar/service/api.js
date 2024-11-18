import axios from "axios"

const api = axios.create({
    baseURL: "http://10.0.3.24:5000",
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;