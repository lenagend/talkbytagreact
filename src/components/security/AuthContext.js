import { createContext, useState, useEffect } from 'react';
import axios from "axios";
import {API_BASE_URL} from "../../config/config";

const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    login: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get(`${API_BASE_URL}/api/verify`, { headers: { Authorization: `Bearer ${token}` } })
                .then(() => {
                    setIsAuthenticated(true);
                })
                .catch(() => {
                    setIsAuthenticated(false);
                    localStorage.removeItem('token');
                });
        }

    }, []);



    const login = async (username, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/login`, { username, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            setIsAuthenticated(true);

        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;