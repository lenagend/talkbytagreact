import AuthContext from "../../security/AuthContext";
import React, {useContext, useCallback, useState} from "react";
import { useDropzone } from 'react-dropzone';
import axios from "axios";
import {API_BASE_URL} from "../../../config/config";
import MyDropzone from "../../tools/MyDropzone";


const AccountSettings = () => {
    const { userInfo, fetchUserInfo } = useContext(AuthContext);
    const [nickname, setNickname] = useState(userInfo.nickname);
    const [profileImage, setProfileImage] = useState(userInfo.profileImage);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [updateError, setUpdateError] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const handleNicknameChange = (e) => {
        setNickname(e.target.value)
    }

    const handleImageUpload = (file) => {
        setUploadedImage(file);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        let updatedProfileImage = profileImage;


        if(uploadedImage){
            const formData = new FormData();
            formData.append('file', uploadedImage);

            try {
                const response = await axios.post(`${API_BASE_URL}/api/upload-image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                updatedProfileImage = response.data.location;
            } catch (error) {
                setUpdateError(true);
                setTimeout(() => {
                    setUpdateError(false);
                }, 3000);
                console.error(error);
            }
        }

        try {
            const updatedUserInfo = {
                nickname,
                profileImage: updatedProfileImage,
            };
            const token = localStorage.getItem('token');
            const response = await axios.put(`${API_BASE_URL}/api/userInfo`, updatedUserInfo, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchUserInfo();
            setUpdateSuccess(true);
            setTimeout(() => {
                setUpdateSuccess(false);
            }, 3000);
            console.log(response.data);
        } catch (error) {
            if (error.response.status === 409) {
                setUpdateError("중복된 닉네임이 존재합니다.");
            } else {
                setUpdateError("에러");
            }
            setTimeout(() => {
                setUpdateError('');
            }, 3000);
            console.error(error);
        }

    }

    return(
                <div class="tab-pane active"  style={{textAlign : 'left'}}>
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
                    <div class="card mb-4">
                        <div class="card-header border-0 pb-0">
                            <h1 class="h5 card-title">사용자 정보 변경</h1>
                            <p class="mb-0"></p>
                        </div>
                        <div class="card-body">
                            <form class="row g-3" onSubmit={handleSubmit}>
                                <div class="col-sm-6">
                                    <label class="form-label">이메일</label>
                                    <input type="email" className="form-control" placeholder="이메일 입력" readOnly name="username" value={userInfo.username + ' 인증됨'}/>
                                </div>
                                <div class="col-sm-6">
                                    <label class="form-label">닉네임 </label>
                                    <input type="text" class="form-control" value={nickname} onChange={handleNicknameChange}/>
                                </div>
                                <div className="col-sm-6">
                                    <label className="form-label">프로필사진 </label>
                                    <ul className="nav nav-pills nav-stack small fw-normal">
                                        <li className="nav-item">
                                            <a className="nav-link bg-light py-1 px-2 mb-0" href="#!" data-bs-toggle="modal"
                                               data-bs-target="#feedActionPhoto"> <i
                                                className="bi bi-image-fill text-success pe-2"></i>업로드</a>
                                        </li>
                                        <li className="nav-item">
                                            {uploadedImage && <span className="badge bg-success">이미지를 불러온 상태입니다 ✓</span>}

                                        </li>
                                    </ul>
                                </div>
                                <div class="col-12 text-end">
                                    <button type="submit" class="btn btn-sm btn-primary mb-0">변경사항 저장</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header border-0 pb-0">
                            <h5 class="card-title">비밀번호 변경</h5>
                            <p class="mb-0">주기적인 변경으로 계정을 보호하세요.</p>
                        </div>
                        <div class="card-body">
                            <form class="row g-3">
                                <div class="col-12">
                                    <label class="form-label">현재 비밀번호</label>
                                    <input type="text" class="form-control" placeholder="" />
                                </div>
                                <div class="col-12">
                                    <label class="form-label">새로운 비밀번호</label>
                                    <div class="input-group">
                                        <input class="form-control fakepassword" type="password" id="psw-input" placeholder="비밀번호를 입력하세요." />
                        <span class="input-group-text p-0">
                          <i class="fakepasswordicon fa-solid fa-eye-slash cursor-pointer p-2 w-40px"></i>
                        </span>
                                    </div>
                                    <div id="pswmeter" class="mt-2"></div>
                                    <div id="pswmeter-message" class="rounded mt-1"></div>
                                </div>
                                <div class="col-12">
                                    <label class="form-label">비밀번호 확인</label>
                                    <input type="text" class="form-control" />
                                </div>
                                <div class="col-12 text-end">
                                    <button type="submit" class="btn btn-primary mb-0">비밀번호 변경</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="modal fade" id="feedActionPhoto" tabIndex="-1"
                         aria-labelledby="feedActionPhotoLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="feedActionPhotoLabel">프로필 사진 추가</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>

                                <div className="modal-body">
                                    <div>
                                        <label className="form-label">업로드 된 이미지</label>
                                      <MyDropzone onImageupload={handleImageUpload}
                                                  uploadedImage={uploadedImage}
                                                  setUploadedImage={setUploadedImage}
                                      />
                                    </div>

                                </div>

                                <div className="modal-footer ">
                                    <button type="button" className="btn btn-danger-soft me-2"
                                            data-bs-dismiss="modal"  onClick={() => setUploadedImage(null)}>취소
                                    </button>
                                    <button type="submit" className="btn btn-success-soft" data-bs-dismiss="modal">확인</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    );
}
export default AccountSettings;