import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
import { PG } from '../types/user';

const API = axios.create({
    baseURL: API_BASE_URL,
});

export const getToken = () => { // Exported
    if (typeof window === "undefined") {
        return null;
    }
    const token = localStorage.getItem("userToken"); // Using 'userToken' as per previous context
    const expirationTime = localStorage.getItem("tokenExpiration");

    if (token && expirationTime) {
        const currentTime = new Date().getTime();
        if (currentTime > parseInt(expirationTime, 10)) {
            // Token expired, remove it
            localStorage.removeItem("userToken");
            localStorage.removeItem("tokenExpiration");
            localStorage.removeItem("userDetails"); // Also remove user details
            return null;
        }
        return token;
    }
    return null;
}

const getHeaders = () => {
    const token = getToken();
    return {
        headers: {
            "Cache-Control": "no-cache",
            "Authorization": `Bearer ${token}`
        }
    };
};

export const login = async (credentials: any): Promise<any> => {
    try {
        const res = await API.post('/auth/login', credentials, {
            headers: {
                "Cache-Control": "no-cache"
            }
        });
        console.log(res.data)
        if (res.data.token && res.data.user) {
            const { token, user } = res.data;
            // Calculate expiration time (24 hours from now)
            const expirationTime = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours in milliseconds

            localStorage.setItem('userToken', token); // Using 'userToken' as per previous context
            localStorage.setItem('tokenExpiration', expirationTime.toString());
            localStorage.setItem('userDetails', JSON.stringify(user)); // Using 'userDetails' as per previous context
        }
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const logoutUser = (): void => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('userDetails');
};

export const signup = async (userData: any): Promise<any> => {
    try {
        const { id, ...user } = userData;
        const res = await API.post('/auth/signup', user);
        console.log(res)
        const expirationTime = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours in milliseconds
        localStorage.setItem('userToken', res.data.token); // Using 'userToken' as per previous context
        localStorage.setItem('tokenExpiration', expirationTime.toString());
        localStorage.setItem('userDetails', JSON.stringify(res.data.user)); // Using 'userDetails' as per previous context
        return res;
    } catch (error) {
        throw error;
    }
}

// Axios Interceptor for Authorization
API.interceptors.request.use((config) => {
    const token = getToken(); // Retrieve token using getToken
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// PG Services
export const getAllPGs = () => API.get('/pgs', getHeaders());

export const addPG = (pgData: Omit<PG, 
  | '_id'
  | 'createdAt'
  | 'updatedAt'
  | 'owner_id'
  | 'manager_id'
  | 'occupied_inmates'
  | 'room_count_per_each_sharing'
>) => API.post('/pgs', { PGData: pgData }, getHeaders());

// Extend with other services as needed
