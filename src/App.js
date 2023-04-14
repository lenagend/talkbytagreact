import './App.css';
import { BrowserRouter, Route,  Routes } from "react-router-dom";
import Home from "./components/page/Home";
import Submit from "./components/page/Submit";
import Read from "./components/page/Read";
import Search from "./components/page/Search";
import Login from "./components/page/Login";
import PrivateRoute from "./components/security/PrivateRoute";
import SignUp from "./components/page/SignUp";
import {AuthProvider} from "./components/security/AuthContext";
import Settings from "./components/page/Settings";
import Liked from "./components/page/Liked";

function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/read/:id" element={<Read />} />
                    <Route path="/search/:q" element={<Search/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />}/>
                    <Route exact path='/submit' element={<PrivateRoute originPath ="/submit"/>}>
                        <Route index element={<Submit />} />
                    </Route>
                    <Route exact path='/settings' element={<PrivateRoute originPath ="/settings"/>}>
                        <Route index element={<Settings />} />
                    </Route>
                    <Route exact path='/liked' element={<PrivateRoute originPath ="/liked"/>}>
                        <Route index element={<Liked />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
  );
}

export default App;
