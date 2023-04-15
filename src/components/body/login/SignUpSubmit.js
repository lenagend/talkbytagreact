import React, { useState } from 'react';
import axios from "axios";
import {API_BASE_URL} from "../../../config/config";
import {useNavigate} from "react-router-dom";


function SignUpSubmit(){
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState('');
    const [passwordMismatchError, setPasswordMismatchError] = useState('');
    const [serverValidateError, setServerValidateError] = useState('');
    const [signupSuccess, setSignupSuccess] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'password') {
            setPasswordError(validatePassword(value));
        }
        
        if (name === 'confirmPassword'){
            if(formData.password != value){
                setPasswordMismatchError('비밀번호가 일치하지 않습니다.');
            }else{
                setPasswordMismatchError('');
            }
        }
    };

    const validatePassword = (password) => {
        if (password.length < 8 || password.length > 20) {
            return '비밀번호는 8자이상 20자 이하로 작성해주세요.';
        }
        if (!/(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return '비밀번호는 최소한 하나의 특수문자를 포함해야합니다.';
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_BASE_URL}/api/register`, formData);
            setSignupSuccess(true);
        } catch (error) {
            setServerValidateError(error.response.data);
            setTimeout(() => {
                setServerValidateError(null);
            }, 3000);
        }
    };

    return (
        <main>
            {signupSuccess && (
                <div className="alert alert-success" role="alert">
                    회원가입에 성공했습니다. <a href="/login" className="alert-link">로그인 하러가기</a>
                    . 감사합니다.
                </div>
            )}
            {serverValidateError && (
                <div className="alert alert-warning" role="alert">
                <strong>회원가입 실패!</strong> {serverValidateError}
            </div>
            )}
            <div className="container">
                <div className="row justify-content-center align-items-center vh-100 py-5">
                    <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5">
                        <div className="card card-body rounded-3 p-4 p-sm-5">
                            <div className="text-center">
                                <h1 className="mb-2">회원가입</h1>
                                <span className="d-block">이미 아이디가 있다면, <a
                                    href="/login">클릭 로그인</a></span>
                            </div>
                            <form className="mt-4" onSubmit={handleSubmit}>
                                <div className="mb-3 input-group-lg">
                                    <input type="email" className="form-control" placeholder="이메일 입력" name="username" value={formData.username} onChange={handleChange}/>
                                        <small>저희는 절대 당신의 개인정보를 공유하지 않습니다.</small>
                                </div>
                                <div className="mb-3 position-relative">
                                    <div className="input-group input-group-lg">
                                        <input className="form-control fakepassword" type="password" id="psw-input" name="password" value={formData.password} onChange={handleChange}
                                               placeholder="비밀번호 입력"/>
                                <span className="input-group-text p-0">
                                  <i className="fakepasswordicon fa-solid fa-eye-slash cursor-pointer p-2 w-40px"></i>
                                </span>
                                    </div>
                                    <div className="d-flex mt-1">
                                        {passwordError && (
                                            <div id="pswmeter-message" className="rounded">
                                                {passwordError}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="mb-3 input-group-lg">
                                    <input className="form-control" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="비밀번호 재입력"/>
                                    <div className="d-flex mt-1">
                                        {passwordMismatchError && (
                                            <div id="pswmeter-message" className="rounded">
                                                {passwordMismatchError}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-lg btn-primary">회원으로 가입</button>
                                </div>
                                <p className="mb-0 mt-3 text-center">©2023 <a target="_blank"
                                                                              href="/">TalkByTag.</a> All
                                    rights reserved</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SignUpSubmit;