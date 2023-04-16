import React, {useContext, useEffect, useState} from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {API_BASE_URL, IMAGE_SERVER_BASE_URL, LIMIT, OFFSET} from "../../../config/config";
import InfiniteScroll from 'react-infinite-scroll-component';
import LikeButton from "./LikeButton";
import AuthContext from "../../security/AuthContext";
import PostList from "./PostList";



const DeletedPostList = () => {
    const [offset, setOffset] = useState(OFFSET);
    const limit = LIMIT;
    const [posts, setPosts] = useState([]);
    const [isLastPost, setIsLastPost] = useState(false);
    const navigate = useNavigate();
    const { userInfo } = useContext(AuthContext);

    useEffect(() => {

        fetchPosts(false);

    }, []);

    const fetchPosts = async (published) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_BASE_URL}/api/posts/my?offset=${offset}&limit=${limit}&published=${published}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const postsData = response.data;

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


    const handleEdit = (post) => {
        navigate('/submit', {state : {post}});
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <InfiniteScroll next={fetchPosts} hasMore={!isLastPost} loader={
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
                    <div key={post.id} className="card" style={{marginBottom: '1rem'}}>
                        <div
                            className="card-header border-0 pb-0 d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                                <div className="avatar avatar-story me-2">
                                    <a href="#!">
                                        <img className="avatar-img rounded-circle"
                                             src={`${IMAGE_SERVER_BASE_URL}${post.profileImage}`} alt=""/>
                                    </a>
                                </div>
                                <div>
                                    <div className="nav nav-divider">
                                        <h6 className="nav-item card-title mb-0">
                                            <a href="#!">
                                                {post.hashTag}
                                            </a>
                                        </h6>
                                        <span
                                            className="nav-item small">{new Date(post.createdAt).toLocaleString()}</span>
                                    </div>
                                    <p className="mb-0 small" style={{textAlign: 'left'}}>{post.nickname}</p>
                                </div>
                            </div>
                            {userInfo.username === post.username && (
                                <div>
                                    <button type="submit" className="btn btn-danger-soft"
                                            onClick={() => handleEdit(post)}>
                                        수정/삭제
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="card-body">
                            <p dangerouslySetInnerHTML={{__html: post.contents}}></p>
                            <ul className="nav nav-stack py-3 small">
                                <li className="nav-item">
                                    <LikeButton id={post.id} isPost={true}/>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href={`/read/${post.id}`}>
                                        <i className="bi bi-chat-fill pe-1"></i>댓글
                                        (<span>{post.commentCount}</span>)
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </InfiniteScroll>
    );
};

export default DeletedPostList;
