import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {API_BASE_URL} from "../../config/config";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../security/AuthContext";


const LoginSubmit = ({originPath}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);

    const { login } = useContext(AuthContext);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await login(username, password);

        if (success) {
            navigate(originPath ? originPath : "/");
        } else {
           setLoginError(true);
            setTimeout(() => {
                setLoginError(false);
            }, 3000);
        }

    };

    return (
        <main>
            {loginError && (
                <div className="alert alert-warning" role="alert">
                    <strong>로그인 실패!</strong> 아이디와 비밀번호를 확인해주세요.
                </div>
            )}
            <div className="container">
                <div className="row justify-content-center align-items-center vh-100 py-5">
                    <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5">
                        <div className="card card-body text-center p-4 p-sm-5">
                            <h1 className="mb-2">로그인</h1>
                            <p className="mb-0">아이디가 아직 없다면, <a href="/signup">클릭 회원가입</a>
                            </p>
                            <form className="mt-sm-4" onSubmit={handleSubmit}>
                                <div className="mb-3 input-group-lg">
                                    <input type="email" className="form-control" placeholder="이메일 입력" onChange={handleUsernameChange} name="username" value={username}/>
                                </div>
                                <div className="mb-3 position-relative">
                                    <div className="input-group input-group-lg">
                                        <input className="form-control fakepassword" type="password" id="psw-input" onChange={handlePasswordChange} name="password" value={password}
                                               placeholder="비밀번호 입력"/>
                <span className="input-group-text p-0">  <i className="fakepasswordicon fa-solid fa-eye-slash cursor-pointer p-2 w-40px"></i>    </span>
                                    </div>
                                </div>
                                <div className="mb-3 d-sm-flex justify-content-between">
                                    <div>
                                        <input type="checkbox" className="form-check-input" id="rememberCheck"/>
                                            <label className="form-check-label" htmlFor="rememberCheck">Remember
                                                me?</label>
                                    </div>
                                    <a href="forgot-password.html">Forgot password?</a>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-lg btn-primary">Login</button>
                                </div>
                                <p className="mb-0 mt-3">©2023 <a target="_blank"
                                                                  href="https://www.webestica.com/">Webestica.</a> All
                                    rights reserved</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default LoginSubmit;