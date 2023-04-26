import React from "react";
import {useNavigate} from "react-router-dom";

const EditDeleteButton = ({post}) => {
    const navigate = useNavigate();

    const handleEdit = (post) => {
        navigate('/submit', {state: {post}});
    }

    return(
        <a
            href="#!"
            className="nav-link"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleEdit(post);
            }}
        >
            <i className="bi bi-pencil-fill"></i> 수정/삭제
        </a>
    );
}
export default EditDeleteButton;