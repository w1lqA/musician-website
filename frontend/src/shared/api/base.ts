// src/shared/api/client.ts
import axios from 'axios';

export const baseApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

baseApi.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});