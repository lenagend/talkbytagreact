const SettingSideNav = ({ setSelectedTab }) => {

    const handleTabClick = (e, tab) => {
      e.preventDefault();
      setSelectedTab(tab);
    };

    return (
        <div class="col-lg-3">
            <div class="d-flex align-items-center mb-4 d-lg-none">
                <button class="border-0 bg-transparent" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span class="btn btn-primary"><i class="fa-solid fa-sliders-h"></i></span>
                    <span class="h6 mb-0 fw-bold d-lg-none ms-2">설정</span>
                </button>
            </div>
            <nav class="navbar navbar-light navbar-expand-lg mx-0">
                <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar">
                    <div class="offcanvas-header">
                        <button type="button" class="btn-close text-reset ms-auto" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body p-0">
                        <div class="card w-100">
                            <div class="card-body">
                                <ul class="nav nav-tabs nav-pills nav-pills-soft flex-column fw-bold gap-2 border-0">
                                    <li class="nav-item" data-bs-dismiss="offcanvas">
                                        <a class="nav-link d-flex mb-0 active" href="#" onClick={(e) => handleTabClick(e, 'accountSettings')} data-bs-toggle="tab"> <img class="me-2 h-20px fa-fw" src="assets/images/icon/person-outline-filled.svg" alt="" /><span>내 계정 </span></a>
                                    </li>
                                    <li class="nav-item" data-bs-dismiss="offcanvas">
                                        <a class="nav-link d-flex mb-0" href="#nav-setting-tab-6" onClick={(e) => handleTabClick(e, 'closeAccount')} data-bs-toggle="tab"> <img class="me-2 h-20px fa-fw" src="assets/images/icon/trash-var-outline-filled.svg" alt="" /><span>회원탈퇴 </span></a>
                                    </li>
                                </ul>

                            </div>

                            <div class="card-footer text-center py-2">
                                <a class="btn btn-link text-secondary btn-sm" href="#!">View Profile </a>
                            </div>
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

                    <p class="small text-center mt-1">©2023 <a class="text-body" target="_blank" href="https://www.webestica.com/"> Webestica </a></p>
                </div>
            </nav>
        </div>
    );
}

export default SettingSideNav;