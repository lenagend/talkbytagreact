import React, {useContext, useEffect, useState} from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {API_BASE_URL, IMAGE_SERVER_BASE_URL, LIMIT, OFFSET} from "../../../config/config";
import InfiniteScroll from 'react-infinite-scroll-component';
import LikeButton from "./LikeButton";
import AuthContext from "../../../security/AuthContext";
import InfinityScrollPostList from "../post/InfinityScrollPostList";
import DisplayCreatedAt from "../../formats/DisplayCreatedAt";
import CommentButton from "../Comment/CommentButton";



const LikedList = () => {
    const [offset, setOffset] = useState(OFFSET);
    const limit = LIMIT;
    const [posts, setPosts] = useState([]);
    const [isLastPost, setIsLastPost] = useState(false);
    const navigate = useNavigate();
    const { userInfo } = useContext(AuthContext);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_BASE_URL}/api/posts/liked?offset=${offset}&limit=${limit}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const postsData = response.data;
            console.log(postsData);

            // 마지막 포스트 여부를 판단
            if (postsData.length < limit) {
                setIsLastPost(true);
            }

            setPosts([...posts, ...postsData]);
            setOffset(offset + limit);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handlePostClick = (postId) => {
        navigate(`/read/${postId}`, {state: {showPost: true}});
    };
    const handleEdit = (post) => {
        navigate('/submit', {state : {post}});
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    return (
        <InfiniteScroll  next={fetchPosts} hasMore={!isLastPost} loader={
            <div>
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Loading
            </div>
        } dataLength={posts.length} endMessage={
            <div className="alert alert-warning" role="alert">
                더 이상 게시글이 없습니다. <a href="#" onClick={scrollToTop} className="alert-link">위로 가기</a>
            </div>
        }>
            <div>
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="card"
                        style={{marginBottom: '1rem', cursor: 'pointer'}}
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
                        onClick={() => handlePostClick(post.id)}
                    >
                        <div className="card-header border-0 pb-0 d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                                <div className="avatar avatar-story me-2">
                                    <a href="#!">
                                        <img
                                            className="avatar-img rounded-circle"
                                            src={`${IMAGE_SERVER_BASE_URL}${post.profileImage}`}
                                            alt=""
                                        />
                                    </a>
                                </div>
                                <div>
                                    <div className="nav nav-divider">
                                        <h6 className="nav-item card-title mb-0" style={{maxWidth: "250px"}}>
                                            <a href="#!">{post.title}</a>
                                        </h6>
                                        <span className="nav-item small">
                                    {post.nickname}
                                  </span>
                                    </div>
                                    <p className="mb-0 small" style={{textAlign: 'left'}}>
                                        <DisplayCreatedAt createdAt={post.createdAt} />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <p dangerouslySetInnerHTML={{__html: post.contents}}></p>
                            <ul className="nav nav-stack py-3 small">
                                <li className="nav-item">
                                    <LikeButton id={post.id} isPost={true}/>
                                </li>
                                <li className="nav-item">
                                    <CommentButton postId={post.id} commentCount={post.commentCount}/>
                                </li>
                                {userInfo.username === post.username && (
                                    <li className="nav-item">
                                        <a
                                            href="#!"
                                            className="nav-link"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleEdit(post);
                                            }}
                                        >
                                            <i className="bi bi-pencil-fill"></i> 수정/삭제
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </InfiniteScroll>
    );
};

export default LikedList;
