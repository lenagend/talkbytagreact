import React, {useContext, useEffect, useState} from 'react';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {API_BASE_URL, IMAGE_SERVER_BASE_URL} from "../../../config/config";
import CommentContainer from "../Comment/CommentContainer";
import AuthContext from "../../../security/AuthContext";
import LikeButton from "../Like/LikeButton";
import CommentButton from "../Comment/CommentButton";


const PostRead = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { userInfo } = useContext(AuthContext);
    const [post, setPost] = useState([]);
    const [commentCounts, setCommentCounts] = useState(0)
    const location = useLocation();
    const initialShowPost = location.state?.showPost ?? true;
    const [showPost, setShowPost] = useState(initialShowPost);

    useEffect(() => {
        window.scrollTo(0, 0);

        fetchPosts();
        fetchCommentCounts();
        const newShowPost = location.state?.showPost ?? true;
        setShowPost(newShowPost);
    }, [id, location]);

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

    const handleTogglePost = (event) => {
        event.preventDefault();
        setShowPost(true);
    };

    return (
            <div key={post.id} className="card" style={{ marginBottom: '1rem' }}>
                <div className="card-header border-0 pb-0 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <div className="avatar avatar-story me-2">
                            <a href="#!">
                                <img className="avatar-img rounded-circle" src={`${IMAGE_SERVER_BASE_URL}${post.profileImage}`} alt="" />
                            </a>
                        </div>
                        <div>
                            <div className="nav nav-divider">
                                <h6 className="nav-item card-title mb-0">
                                    <a href="#!">
                                    {post.title}
                                    </a>
                                </h6>
                                <span className="nav-item small">{new Date(post.createdAt).toLocaleString()}</span>
                            </div>
                            <p className="mb-0 small" style={{textAlign: 'left'}}>{post.nickname}</p>
                        </div>
                    </div>
                    {userInfo.username === post.username && post.published && (
                        <div>
                            <button type="submit" className="btn btn-danger-soft" onClick={() => handleEdit(post)}>
                                수정/삭제
                            </button>
                        </div>
                    )}
                </div>
                <div className="card-body">
                    {post.published ? (
                        <>
                            {showPost ? (
                                <p dangerouslySetInnerHTML={{ __html: post.contents }}></p>
                            ) : (
                                <div className="alert alert-warning" role="alert">
                                    본문이 가려진 상태입니다. <a href="#!" className="alert-link" onClick={(event)=>{handleTogglePost(event)}}>본문보기</a>.
                                </div>
                            )}
                            <ul className="nav nav-stack py-3 small">
                                <li className="nav-item">
                                    <LikeButton id={post.id} isPost={true} />
                                </li>
                                <li className="nav-item">
                                    <CommentButton postId={post.id} commentCount={commentCounts}/>
                                </li>
                            </ul>
                                <CommentContainer postId={post.id} setCommentCounts={fetchCommentCounts}/>
                        </>
                    ) : (
                        <div>
                            <p>지워진 게시물입니다. </p>
                        </div>
                    )}
                </div>
            </div>

    );
};

export default PostRead;
