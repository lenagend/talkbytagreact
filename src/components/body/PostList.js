import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {API_BASE_URL} from "../../config/config";

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const offset = 0;
                const limit = 10;
                const response = await axios.get(`${API_BASE_URL}/api/posts?offset=${offset}&limit=${limit}`);
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }; 

        fetchPosts();
    }, []);

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
                                <p className="mb-0 small">{post.authorId}</p>
                            </div>
                        </div>
                        {/* Card feed action dropdown START */}
                        <div>
                            <form method="delete" action={`delete/${post.id}`}>
                                <button type="submit" className="btn btn-danger-soft">
                                    삭제하기
                                </button>
                            </form>
                        </div>
                        {/* Card feed action dropdown END */}
                    </div>
                    {/* Card header END */}
                    {/* Card body START */}
                    <div className="card-body">
                        <p dangerouslySetInnerHTML={{ __html: post.contents }}></p>
                        {/* Card img */}
                        {/* Feed react START */}
                        <ul className="nav nav-stack py-3 small">
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    href="#!"
                                    data-bs-container="body"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-html="true"
                                    data-bs-custom-class="tooltip-text-start"
                                    data-bs-title="Frances Guerrero<br> Lori Stevens<br> Billy Vasquez<br> Judy Nguyen<br> Larry Lawson<br> Amanda Reed<br> Louis Crawford"
                                >
                                    <i className="bi bi-hand-thumbs-up-fill pe-1"></i>Liked (<span>{post.viewCount}</span>)
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#!">
                                    <i className="bi bi-chat-fill pe-1"></i>Comments (<span>10</span>)
                                </a>
                            </li>
                            {/* Card share action START */}
                            <li className="nav-item dropdown ms-sm-auto">
                                <a className="nav-link mb-0" href="#" id="cardShareAction" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-reply-fill flip-horizontal ps-1"></i>Share
                                </a>
                                {/* Card share action dropdown menu */}
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="cardShareAction">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            <i className="bi bi-envelope fa-fw pe-2"></i>Send via Direct Message
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            <i className="bi bi-bookmark-check fa-fw pe-2"></i>Bookmark{' '}
                                        </a>
                                    </li>
                                    <li>
                                    <a className="dropdown-item" href="#">
                                        <i className="bi bi-link fa-fw pe-2"></i>Copy link to post
                                    </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    <i className="bi bi-share fa-fw pe-2"></i>Share post via …
                                </a>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    <i className="bi bi-pencil-square fa-fw pe-2"></i>Share to News Feed
                                </a>
                            </li>
                        </ul>
                    </li>
                    {/* Card share action END */}
                </ul>
            {/* Feed react END */}
                </div>
            {/* Card body END */}
                </div>
                ))}
        </div>
    );
};

export default PostList;
