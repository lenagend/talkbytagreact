import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {API_BASE_URL} from "../../../config/config";
import AuthContext from "../../security/AuthContext";
import {useNavigate} from "react-router-dom";

const CommentButton = ({postId, commentCount}) => {
    const navigate = useNavigate();

    const handleCommentClick = (event, postId) => { 
        event.preventDefault();
        event.stopPropagation();
        navigate(`/read/${postId}`, {state: { showPost : false }} );
    };

    return (
        <a className="nav-link" href="#!" onClick={(event) => handleCommentClick(event, postId)}>
            <i className="bi bi-chat-fill pe-1"></i>댓글 (<span>{commentCount}</span>)
        </a>
    );
};

export default CommentButton;
