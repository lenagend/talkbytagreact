import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {API_BASE_URL, LIMIT, OFFSET} from "../../config/config";


const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const offset = `${OFFSET}`;
                const limit = `${LIMIT}`;
                const response = await axios.get(`${API_BASE_URL}/api/posts?offset=${offset}&limit=${limit}`);
                const postsData = response.data;

                const fetchCommentCounts = async () => {
                    const commentCountPromises = postsData.map(async (post) => {
                        const commentResponse = await axios.get(`${API_BASE_URL}/api/comments/count/${post.id}`);
                        return commentResponse.data;
                    });

                    const commentCounts = await Promise.all(commentCountPromises);
                    return commentCounts
                }

                const commentCounts = await fetchCommentCounts();

                const postsWithCommentCounts = postsData.map((post, index) => {
                    return { ...post, commentCount: commentCounts[index] };
                });

                setPosts(postsWithCommentCounts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }; 

        fetchPosts();
    }, []);

    const navigate = useNavigate();

    function handleEdit(post){
        navigate('/submit', {state : {post}});
    }


    return (
        <div>
            {posts.map((post) => (
                <div key={post.id} className="card" style={{ marginBottom: '1rem' }}>
                    {/* Card header START */}
                    <div className="card-header border-0 pb-0 d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                            {/* Avatar */}
                            <div className="avatar avatar-story me-2">
                                <a href="#!">
                                    <img className="avatar-img rounded-circle" src="assets/images/avatar/04.jpg" alt="" />
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
                                <p className="mb-0 small" style={{textAlign: 'left'}}>{post.authorId}</p>
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-danger-soft" onClick={() => handleEdit(post)}>
                                수정/삭제
                            </button>
                        </div>
                    </div>
                    {/* Card header END */}
                    {/* Card body START */}
                    <div className="card-body">
                        <Link to={`/read/${post.id}`}>
                        <p dangerouslySetInnerHTML={{ __html: post.contents }}></p>
                        </Link>
                        <ul className="nav nav-stack py-3 small">
                            <li className="nav-item">
                                <a className="nav-link active"  href="#!" >
                                    <i className="bi bi-hand-thumbs-up-fill pe-1"></i>Liked (<span>{post.viewCount}</span>)
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#!">
                                    <i className="bi bi-chat-fill pe-1"></i>Comments (<span>{post.commentCount}</span>)
                                </a>
                            </li>
                </ul>
                </div>
            {/* Card body END */}
                </div>
                ))}
        </div>
    );
};

export default PostList;
