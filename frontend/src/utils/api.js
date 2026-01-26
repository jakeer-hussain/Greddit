import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000",
});

api.interceptors.request.use(
    (config) => {
        const tokens = localStorage.getItem("authTokens");
        if (tokens) {
            const parsedTokens = JSON.parse(tokens);
            config.headers.Authorization = `Bearer ${parsedTokens.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
