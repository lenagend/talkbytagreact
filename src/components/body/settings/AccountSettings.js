import AuthContext from "../../security/AuthContext";
import React, {useContext, useCallback, useState} from "react";
import { useDropzone } from 'react-dropzone';


const AccountSettings = () => {
    const { userInfo } = useContext(AuthContext);
    const { nickname, setNickname } = useState('');

    const MyDropzone = () => {
        const onDrop = useCallback((acceptedFiles) => {
            // 이미지 업로드를 처리하는 함수를 여기에 추가하세요.
            console.log(acceptedFiles);
        }, []);

        const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

        return (
            <div {...getRootProps()} className="dropzone dropzone-default card shadow-none">
                <input {...getInputProps()} />
                <div className="dz-message">
                    <i className="bi bi-images display-3"></i>
                    <p>{isDragActive ? "드롭하여 업로드" : "드래그하거나 클릭해서 업로드하세요."}</p>
                </div>
            </div>
        );
    };

    const handleNicknameChange = (e) => {

    }

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return(
                <div class="tab-pane active"  style={{textAlign : 'left'}}>
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
                                    <input type="text" class="form-control" value={userInfo.nickname} onChange={handleNicknameChange}/>
                                </div>
                                <div className="col-sm-6">
                                    <label className="form-label">프로필사진 </label>
                                    <ul className="nav nav-pills nav-stack small fw-normal">
                                        <li className="nav-item">
                                            <a className="nav-link bg-light py-1 px-2 mb-0" href="#!" data-bs-toggle="modal"
                                               data-bs-target="#feedActionPhoto"> <i
                                                className="bi bi-image-fill text-success pe-2"></i>업로드</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-12 text-end">
                                    <button type="submit" class="btn btn-sm btn-primary mb-0">Save changes</button>
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
                                    <button type="submit" class="btn btn-primary mb-0">Update password</button>
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
                                      <MyDropzone />
                                    </div>

                                </div>

                                <div className="modal-footer ">
                                    <button type="button" className="btn btn-danger-soft me-2"
                                            data-bs-dismiss="modal">Cancel
                                    </button>
                                    <button type="button" className="btn btn-success-soft">Post</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    );
}
export default AccountSettings;