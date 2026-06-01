// src/shared/api/base.ts
import axios from 'axios';
import { tokenManager } from './token-manager';
import { apiUrl } from '@/shared/lib/config';

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value: string) => void;
    reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
    failedQueue.forEach(promise => {
        if (error) promise.reject(error);
        else promise.resolve(token!);
    });
    failedQueue = [];
};

export const baseApi = axios.create({ baseURL: apiUrl });

baseApi.interceptors.request.use((config) => {
    const token = tokenManager.getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

baseApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return baseApi(originalRequest);
                });
            }
            originalRequest._retry = true;
            isRefreshing = true;
            const refreshToken = tokenManager.getRefreshToken();

            if (!refreshToken) {
                tokenManager.clearTokens();
                if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('auth:logout'));
                }
                isRefreshing = false;
                return Promise.reject(error);
            }

            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/auth/refresh/`,
                    { refresh: refreshToken }
                );
                const { access } = response.data;
                tokenManager.setTokens(access, refreshToken);
                processQueue(null, access);
                originalRequest.headers.Authorization = `Bearer ${access}`;
                return baseApi(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError as Error, null);
                tokenManager.clearTokens();
                if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('auth:logout'));
                }
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
);