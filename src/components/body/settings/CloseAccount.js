import React, {useContext, useState} from "react";
import axios from "axios";
import {API_BASE_URL} from "../../../config/config";
import {useNavigate} from "react-router-dom";
import AuthContext from "../../../security/AuthContext";

const CloseAccount = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [updateError, setUpdateError] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState('');
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const handleUnpublishPostsAndComments = async (event) => {
        event.preventDefault();

        try {
            // 토큰이 저장된 곳에서 토큰을 가져옵니다. (예: 로컬 스토리지)
            const token = localStorage.getItem('token');

            // 사용자의 모든 게시물과 댓글을 unpublish 처리합니다.
            await axios.put(`${API_BASE_URL}/api/posts/unpublish`, null, {
                headers: { Authorization: `Bearer ${token}` },
            });
            await axios.put(`${API_BASE_URL}/api/comments/unpublish`, null, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUpdateSuccess('게시물과 댓글 삭제가 완료되었습니다.');
            setTimeout(() => {
                setUpdateSuccess('');
            }, 3000);
        } catch (error) {
            console.error('Error:', error);
            setUpdateError('게시물과 댓글 삭제에 실패했습니다.');
            setTimeout(() => {
                setUpdateError('');
            }, 3000);
        }
    };

    const handleDeleteAccount = async (event) => {
        event.preventDefault();

        if (!isChecked) {
            setUpdateError('삭제 동의에 체크해주세요.');
            setTimeout(() => {
                setUpdateError('');
            }, 3000);
            return;
        }

        try {
            const token = localStorage.getItem('token');

            // 회원 탈퇴 API 호출
            await axios.delete(`${API_BASE_URL}/api/user/delete`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // 로그아웃 처리 및 회원 탈퇴 성공 메시지
            setUpdateSuccess('회원탈퇴가 완료되었습니다.');
            setTimeout(() => {
                setUpdateSuccess('');
                logout();
            }, 3000);
            // 회원 탈퇴 후 리다이렉트 등 추가 작업
        } catch (error) {
            console.error('Error:', error);
            setUpdateError('회원 탈퇴에 실패했습니다.');
            setTimeout(() => {
                setUpdateError('');
            }, 3000);
        }
    };

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    return(
        <div>
            {updateSuccess && (
                <div className="alert alert-success" role="alert">
                    {updateSuccess}

                </div>
            )}
            {updateError && (
                <div className="alert alert-warning" role="alert">
                    {updateError}
                </div>
            )}
        <div class="tab-pane active show"  style={{textAlign : 'left'}}>
            <div class="card">
                <div class="card-header border-0 pb-0">
                    <h5 class="card-title">계정을 삭제합니다</h5>
                    <p class="mb-0">많이 즐기셨기를 바랍니다.</p>
                </div>
                <div class="card-body">
                    <h6>떠나기 전에...</h6>
                    <ul>
                        <li>작성했던 모든 게시물 삭제하기 <a href="#" onClick={handleUnpublishPostsAndComments}>클릭</a> </li>
                        <li>삭제하지 않고 계정을 삭제하면 게시물은 익명작성자 형태로 보관됩니다.</li>
                    </ul>
                    <div class="form-check form-check-md my-4">
                        <input class="form-check-input" type="checkbox" value="" id="deleteaccountCheck" onChange={handleCheckboxChange}/>
                            <label class="form-check-label" for="deleteaccountCheck">네, 삭제하겠습니다.</label>
                    </div>
                    <a onClick={handleDeleteAccount} href="#" class="btn btn-danger btn-sm mb-0">지우겠습니다</a>
                </div>
            </div>
        </div>
        </div>
);
}
export default CloseAccount;