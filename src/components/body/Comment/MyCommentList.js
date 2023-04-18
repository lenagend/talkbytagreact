import React, {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {API_BASE_URL, IMAGE_SERVER_BASE_URL, LIMIT, OFFSET} from "../../../config/config";
import InfiniteScroll from 'react-infinite-scroll-component';
import LikeButton from "../post/LikeButton";
import AuthContext from "../../security/AuthContext";
import Comment from "./Comment";



const MyPostList = () => {
    const [offset, setOffset] = useState(OFFSET);
    const limit = LIMIT;
    const [comments, setComments] = useState([]);
    const [isLastComment, setIsLastComment] = useState(false);
    const navigate = useNavigate();
    const { userInfo } = useContext(AuthContext);

    useEffect(() => {

        fetchComments();

    }, []);

    const fetchComments = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_BASE_URL}/api/comments/my?offset=${offset}&limit=${limit}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const commentData = response.data;

            // 마지막 포스트 여부를 판단
            if (commentData.length < limit) {
                setIsLastComment(true);
            }

            setComments([...comments, ...commentData]);
            setOffset(offset + limit);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCommentClick = (postId) => {
        navigate(`/read/${postId}`, {state: { showPost : true }} );
    };

    return (
        <InfiniteScroll next={fetchComments} hasMore={!isLastComment} loader={
            <div>
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Loading
            </div>
        } dataLength={comments.length} endMessage={
            <div className="alert alert-warning" role="alert">
                더 이상 댓글이 없습니다. <a href="#" onClick={scrollToTop} className="alert-link">위로 가기</a>
            </div>
        }>
            <div>
                    {comments.map((comment) => (
                        <div className="card"  style={{ marginBottom: '1rem', cursor: 'pointer' }}
                             onMouseEnter={(e) =>
                                 e.currentTarget.classList.add(
                                     'border',
                                     'border-2',
                                     'border-success'
                                 )
                             }
                             onMouseLeave={(e) =>
                                 e.currentTarget.classList.remove(
                                     'border',
                                     'border-2',
                                     'border-success'
                                 )
                             }
                            onClick={()=>{handleCommentClick(comment.postId)}}
                        >
                            <div className="card-body">
                                <div className="d-flex position-relative">
                                    <div className="avatar avatar-xs">
                                        <a href="#!"><img className="avatar-img rounded-circle" src={`${IMAGE_SERVER_BASE_URL}${comment.profileImage}`}
                                                          alt=""/></a>
                                    </div>
                                    <div className="ms-2">
                                        <div className="bg-light rounded-start-top-0 p-3 rounded">
                                            <div className="d-flex justify-content-between">
                                                <h6 className="mb-1"><a href="#!"> {comment.nickname} </a></h6>
                                                <small className="ms-2">{new Date(comment.createdAt).toLocaleString()}</small>
                                            </div>
                                            <p className="small mb-0">{comment.contents}</p>
                                        </div>
                                        <ul className="nav nav-divider py-2 small">
                                            <li className="nav-item">
                                                <LikeButton id={comment.id} isPost={false} />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </InfiniteScroll>
    );
};

export default MyPostList;
