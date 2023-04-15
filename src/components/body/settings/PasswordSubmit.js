import React, {useState} from "react";
import axios from "axios";
import {API_BASE_URL} from "../../../config/config";

const PasswordSubmit = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [updateError, setUpdateError] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(null);

    async function handleChangePassword(e) {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setUpdateError("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            setTimeout(() => {
                setUpdateError('');
            }, 3000);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_BASE_URL}/api/change-password`, {
                currentPassword,
                newPassword,
            } , {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setUpdateSuccess(true);
                setTimeout(() => {
                    setUpdateSuccess('');
                }, 3000);
            }else{
                setUpdateError(response.data);
                setTimeout(() => {
                    setUpdateError('');
                }, 3000);
            }
        } catch (error) {
            console.error(error);
            setUpdateError(error.response.data);
            setTimeout(() => {
                setUpdateError('');
            }, 3000);
        }
    }

    return (
        <div>
            {updateSuccess && (
                <div className="alert alert-success" role="alert">
                    사용자 정보 변경이 <strong>완료되었습니다</strong>

                </div>
            )}
            {updateError && (
                <div className="alert alert-warning" role="alert">
                    <strong>정보변경 실패!</strong> {updateError}
                </div>
            )}
        <div className="card">
            <div className="card-header border-0 pb-0">
                <h5 className="card-title">비밀번호 변경</h5>
                <p className="mb-0">주기적인 변경으로 계정을 보호하세요.</p>
            </div>
            <div className="card-body">
                <form className="row g-3" onSubmit={handleChangePassword}>
                    <div className="col-12">
                        <label className="form-label">현재 비밀번호</label>
                        <div className="input-group">
                            <input
                                className="form-control fakepassword"
                                type="password"
                                id="psw-input"
                                placeholder="현재 비밀번호를 입력하세요"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                            <span className="input-group-text p-0">
                                <i className="fakepasswordicon fa-solid fa-eye-slash cursor-pointer p-2 w-40px"></i>
                              </span>
                        </div>
                    </div>
                    <div className="col-12">
                        <label className="form-label">새로운 비밀번호</label>
                        <div className="input-group">
                            <input
                                className="form-control fakepassword"
                                type="password"
                                id="psw-input"
                                placeholder="새로운 비밀번호를 입력하세요"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <span className="input-group-text p-0">
                                <i className="fakepasswordicon fa-solid fa-eye-slash cursor-pointer p-2 w-40px"></i>
                              </span>
                        </div>
                        <div id="pswmeter" className="mt-2"></div>
                        <div id="pswmeter-message" className="rounded mt-1"></div>
                    </div>
                    <div className="col-12">
                        <label className="form-label">비밀번호 확인</label>
                        <div className="input-group">
                        <input
                            type="password"
                            className="form-control fakepassword"
                            placeholder="비밀번호 확인을 입력하세요"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                            <span className="input-group-text p-0">
                                <i className="fakepasswordicon fa-solid fa-eye-slash cursor-pointer p-2 w-40px"></i>
                              </span>
                        </div>
                    </div>
                    <div className="col-12 text-end">
                        <button type="submit" className="btn btn-primary mb-0">비밀번호 변경</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
}
export default PasswordSubmit;