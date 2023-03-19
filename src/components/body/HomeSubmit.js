import React from "react";
import { useNavigate } from "react-router-dom";

function HomeSubmit(){

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/submit');
    };

        return (
            <div className="card card-body" style={{ flex: "0 0 auto" }}>
                <form className="w-100" action="/submit" method="post">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="avatar avatar-xs me-2">
                            <a href="#"> <img className="avatar-img rounded-circle" src="assets/images/avatar/03.jpg" alt=""/></a>
                        </div>
                        <textarea onClick={handleClick} className="form-control pe-4 border-0 vertical-centered-placeholder" rows="2" data-autoresize
                                  placeholder="이곳에 포스팅 하세요!!"></textarea>
                        <button type="button" style={{ minWidth : "100px"}} onClick={handleClick} className="btn btn-success-soft">포스트</button>

                    </div>

                </form>
            </div>
        );

}

export default HomeSubmit;