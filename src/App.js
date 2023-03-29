import './App.css';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Home from "./components/page/Home";
import Submit from "./components/page/Submit";
import Read from "./components/page/Read";
import Search from "./components/page/Search";
import Login from "./components/page/Login";
import {useEffect, useState} from "react";
import axios from "axios";
import PrivateRoute from "./components/security/PrivateRoute";
import {API_BASE_URL} from "./config/config";
import SignUp from "./components/page/SignUp";

function App() {
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

    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/read/:id" element={<Read />} />
            <Route path="/search/:q" element={<Search/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />}/>
            <Route exact path='/submit' element={<PrivateRoute isAuthenticated={isAuthenticated} originPath ="/submit"/>}>
                <Route exact path='/submit' element={<Submit/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
