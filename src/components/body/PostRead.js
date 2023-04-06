import React, {useContext, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {API_BASE_URL} from "../../config/config";
import CommentContainer from "./CommentContainer";
import AuthContext from "../security/AuthContext";


const PostRead = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { userInfo } = useContext(AuthContext);

    const [post, setPost] = useState([]);
    const [commentCounts, setCommentCounts] = useState(0)

    useEffect(() => {
        fetchPosts();
        fetchCommentCounts();
    }, [id]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/posts/read/${id}`);
            setPost(response.data);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    const fetchCommentCounts = async () => {
        try{
            const response = await axios.get(`${API_BASE_URL}/api/comments/count/${id}`);
            setCommentCounts(response.data);
        }catch (error){
            console.error('Error fetching commentCount:', error);
        }
    }


    function handleEdit(post){
        navigate('/submit', {state : {post}});
    }


    return (
            <div key={post.id} className="card" style={{ marginBottom: '1rem' }}>
                {/* Card header START */}
                <div className="card-header border-0 pb-0 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        {/* Avatar */}
                        <div className="avatar avatar-story me-2">
                            <a href="#!">
                                <img className="avatar-img rounded-circle" src={post.profileImage} alt="" />
                            </a>
                        </div>
                        {/* Info */}
                        <div>
                            <div className="nav nav-divider">
                                <h6 className="nav-item card-title mb-0">
                                    <a href="#!">
                                    {post.hashTag}
                                    </a>
                                </h6>
                                <span className="nav-item small">{new Date(post.createdAt).toLocaleString()}</span>
                            </div>
                            <p className="mb-0 small" style={{textAlign: 'left'}}>{post.nickname}</p>
                        </div>
                    </div>
                    {userInfo.username === post.username && (
                        <div>
                            <button type="submit" className="btn btn-danger-soft" onClick={() => handleEdit(post)}>
                                수정/삭제
                            </button>
                        </div>
                    )}
                </div>
                {/* Card header END */}
                {/* Card body START */}
                <div className="card-body">
                    <p dangerouslySetInnerHTML={{ __html: post.contents }}></p>
                    <ul className="nav nav-stack py-3 small">
                        <li className="nav-item">
                            <a className="nav-link active"  href="#!" >
                                <i className="bi bi-hand-thumbs-up-fill pe-1"></i>Liked (<span>{post.viewCount}</span>)
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#!">
                                <i className="bi bi-chat-fill pe-1"></i>Comments (<span>{commentCounts}</span>)
                            </a>
                        </li>
                     </ul>
                    {/*Comment Start*/}
                    <CommentContainer postId={post.id} setCommentCounts={fetchCommentCounts}/>
                    {/*Comment End*/}
                </div>
        {/* Card body END */}
            </div>

    );
};

export default PostRead;
