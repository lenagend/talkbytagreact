import React, {useContext} from 'react';
import AuthContext from "../security/AuthContext";

const NavRight = () => {
    const { logout, userInfo } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        window.location.href="/";
    };

    return (
        <div>
            <ul className="nav flex-nowrap align-items-center ms-sm-3 list-unstyled">
                <li className="nav-item ms-2 dropdown">
                    <a className="nav-link btn icon-md p-0" href="#" id="profileDropdown" role="button"
                       data-bs-auto-close="outside" data-bs-display="static" data-bs-toggle="dropdown"
                       aria-expanded="false">
                        <img className="avatar-img rounded-2" src={userInfo.profileImage} alt="" />
                    </a>
                    <ul className="dropdown-menu dropdown-animation dropdown-menu-end pt-3 small me-md-n3"
                        aria-labelledby="profileDropdown">
                        <li className="px-3">
                            <div className="d-flex align-items-center position-relative">
                                <div className="avatar me-3">
                                    <img className="avatar-img rounded-circle" src={userInfo.profileImage}
                                         alt="avatar" />
                                </div>
                                <div>
                                    <a className="h6 stretched-link" href="#">{userInfo.nickname}</a>
                                    <p className="small m-0">님, 환영합니다!</p>
                                </div>
                            </div>
                            <a className="dropdown-item btn btn-primary-soft btn-sm my-2 text-center"
                               href="my-profile.html">프로필 보기</a>
                        </li>

                        <li className="dropdown-divider"></li>
                        <li><a className="dropdown-item bg-danger-soft-hover" href="#!" onClick={handleLogout}>
                            <i className="bi bi-power fa-fw me-2"></i>프로필 보기</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    );

}

export default NavRight;