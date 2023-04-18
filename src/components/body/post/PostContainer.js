import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IMAGE_SERVER_BASE_URL } from '../../../config/config';
import LikeButton from "./LikeButton";
import CommentButton from "../Comment/CommentButton";

const PostContainer = ({ posts, userInfo }) => {
    const navigate = useNavigate();

    const handlePostClick = (postId) => {
        navigate(`/read/${postId}`, {state: { showPost : true }} );
    };

    const handleEdit = (post) => {
        navigate('/submit', {state : {post}});
    }

    return (
        <div>
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="card"
                    style={{ marginBottom: '1rem', cursor: 'pointer' }}
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
                                    <h6 className="nav-item card-title mb-0">
                                        <a href="#!">{post.hashTag}</a>
                                    </h6>
                                    <span className="nav-item small">
                    {new Date(post.createdAt).toLocaleString()}
                  </span>
                                </div>
                                <p className="mb-0 small" style={{ textAlign: 'left' }}>
                                    {post.nickname}
                                </p>
                            </div>
                        </div>
                        {userInfo.username === post.username && (
                            <div>
                                <button
                                    type="submit"
                                    className="btn btn-danger-soft"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        handleEdit(post);
                                    }}
                                >
                                    수정/삭제
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="card-body">
                        <p dangerouslySetInnerHTML={{ __html: post.contents }}></p>
                        <ul className="nav nav-stack py-3 small">
                            <li className="nav-item">
                                <LikeButton id={post.id} isPost={true} />
                            </li>
                            <li className="nav-item">
                                <CommentButton postId={post.id} commentCount={post.commentCount} />
                            </li>
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostContainer;
