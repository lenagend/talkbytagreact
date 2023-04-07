import {useContext} from "react";
import AuthContext from "../security/AuthContext";
import {Link} from "react-router-dom";

const LeftSidebar = ({selectedTab, setSelectedTab }) => {
    const { userInfo } = useContext(AuthContext);
    const profileImageSrc = userInfo.profileImage;

        return(
            <div class="col-lg-3">
                <div class="d-flex align-items-center d-lg-none">
                    <button class="border-0 bg-transparent" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSideNavbar" aria-controls="offcanvasSideNavbar">
                        <span class="btn btn-primary"><i class="fa-solid fa-sliders-h"></i></span>
                        <span class="h6 mb-0 fw-bold d-lg-none ms-2">My profile</span>
                    </button>
                </div>

                <nav class="navbar navbar-expand-lg mx-0 ">
                    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasSideNavbar">
                        <div class="offcanvas-header">
                            <button type="button" class="btn-close text-reset ms-auto" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>

                        <div class="offcanvas-body d-block px-2 px-lg-0">
                            <div class="card overflow-hidden">
                                <div class="h-50px"  style={{
                                    backgroundImage: 'url(/assets/images/bg/01.jpg)',
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat'
                                }}></div>
                                <div class="card-body pt-0">
                                    <div class="text-center">
                                        <div class="avatar avatar-lg mt-n5 mb-3">
                                            <a href="#!">
                                                <img class="avatar-img rounded border border-white border-3" src={profileImageSrc} alt="" />
                                            </a>
                                        </div>
                                        <h5 class="mb-0"> <a href="#!">{userInfo ? userInfo.nickname : null}</a> </h5>
                                        <p class="mt-3">{userInfo && userInfo.modifiedAt ? '환영합니다~!' : '아래의 설정버튼을 눌러 프로필을 만들어 보세요!'}</p>
                                        <div class="hstack gap-2 gap-xl-3 justify-content-center">
                                            <div>
                                                <h6 class="mb-0">{userInfo.postCount}</h6>
                                                <small>포스트</small>
                                            </div>
                                            <div class="vr"></div>
                                            <div>
                                                <h6 class="mb-0">{userInfo.commentCount}</h6>
                                                <small>댓글</small>
                                            </div>
                                            <div class="vr"></div>
                                            <div>
                                                <h6 class="mb-0">0</h6>
                                                <small>좋아요</small>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                        <ul class="nav nav-link-secondary flex-column fw-bold gap-2">

                                            <li class="nav-item">
                                                <Link class="nav-link" to="/settings"> <img class="me-2 h-20px fa-fw" src="/assets/images/icon/cog-outline-filled.svg" alt="" /><span>설정 </span></Link>
                                            </li>
                                        </ul>
                                </div>
                                <div class="card-footer text-center py-2">
                                    <a class="btn btn-link btn-sm" href="my-profile.html">View Profile </a>
                                </div>
                            </div>
                            <ul class="nav small mt-4 justify-content-center lh-1">
                                <li class="nav-item">
                                    <a class="nav-link" href="my-profile-about.html">About</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="settings.html">Settings</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" target="_blank" href="https://support.webestica.com/login">Support </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" target="_blank" href="docs/index.html">Docs </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="help.html">Help</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="privacy-and-terms.html">Privacy & terms</a>
                                </li>
                            </ul>
                            <p class="small text-center mt-1">©2023 <a class="text-body" target="_blank" href="https://www.webestica.com/"> TalkByTag </a></p>
                        </div>
                    </div>
                </nav>
            </div>
        );
}

export default LeftSidebar;