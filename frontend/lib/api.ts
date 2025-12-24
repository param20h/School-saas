import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (refreshToken) {
                    const response = await axios.post(`${API_URL}/auth/refresh`, {
                        refreshToken,
                    });

                    const { accessToken } = response.data;
                    localStorage.setItem('accessToken', accessToken);

                    // Retry original request with new token
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // Refresh failed, logout user
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;

// Auth API calls
export const authAPI = {
    register: (data: any) => api.post('/auth/register', data),
    login: (data: any) => api.post('/auth/login', data),
    getProfile: () => api.get('/auth/profile'),
    refreshToken: (refreshToken: string) => api.post('/auth/refresh', { refreshToken }),
};

// Student API calls
export const studentAPI = {
    getAll: () => api.get('/students'),
    getById: (id: string) => api.get(`/students/${id}`),
    create: (data: any) => api.post('/students', data),
    update: (id: string, data: any) => api.put(`/students/${id}`, data),
    delete: (id: string) => api.delete(`/students/${id}`),
};

// Attendance API calls
export const attendanceAPI = {
    mark: (data: any) => api.post('/attendance', data),
    getByStudent: (studentId: string, params?: any) =>
        api.get(`/attendance/student/${studentId}`, { params }),
    getByClass: (classId: string, params?: any) =>
        api.get(`/attendance/class/${classId}`, { params }),
};

// Fee API calls
export const feeAPI = {
    getByStudent: (studentId: string) => api.get(`/fees/student/${studentId}`),
    create: (data: any) => api.post('/fees', data),
    markPaid: (id: string) => api.put(`/fees/${id}/pay`),
};
