import './App.css';
import { BrowserRouter, Route,  Routes } from "react-router-dom";
import Home from "./components/page/Home";
import Submit from "./components/page/Submit";
import Read from "./components/page/Read";
import Search from "./components/page/Search";
import Login from "./components/page/Login";
import PrivateRoute from "./security/PrivateRoute";
import SignUp from "./components/page/SignUp";
import {AuthProvider} from "./security/AuthContext";
import Settings from "./components/page/Settings";
import Liked from "./components/page/Liked";
import MyPosts from "./components/page/MyPosts";
import MyComments from "./components/page/MyComments";
import ErrorBoundary from "./error/ErrorBoundary";
import Error from "./components/page/Error";

function App() {
    return (
            <AuthProvider>
                <BrowserRouter>
                    <ErrorBoundary>
                    <Routes>
                        <Route path="/" element={<Home sortType='latest'/>} />
                        <Route path="/hot" element={<Home sortType='hot'/>} />
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
                        <Route exact path='/myPosts' element={<PrivateRoute originPath ="/myPosts"/>}>
                            <Route index element={<MyPosts />} />
                        </Route>
                        <Route exact path='/myComments' element={<PrivateRoute originPath ="/myComments"/>}>
                            <Route index element={<MyComments />} />
                        </Route>
                        <Route path="/error" element={<Error />} />
                    </Routes>
                    </ErrorBoundary>
                </BrowserRouter>
            </AuthProvider>
  );
}

export default App;
