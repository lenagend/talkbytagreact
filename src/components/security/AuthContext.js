import { createContext, useState, useEffect } from 'react';
import axios from "axios";
import {API_BASE_URL} from "../../config/config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get(`${API_BASE_URL}/api/verify`, { headers: { Authorization: `Bearer ${token}` } })
                .then(() => {
                    setIsAuthenticated(true);
                    fetchUserInfo();
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
            fetchUserInfo();

            return true;
        } catch (error) {
            console.error('Login failed:', error);

            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };


    const fetchUserInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_BASE_URL}/api/userInfo`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserInfo(response.data);
        } catch (error) {
            console.log("유저정보를 불러오는데 실패했습니다", error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout, login, userInfo, setUserInfo,  fetchUserInfo, }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;