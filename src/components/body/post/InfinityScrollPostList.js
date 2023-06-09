import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {IMAGE_SERVER_BASE_URL, LIMIT, OFFSET} from '../../../config/config';
import LikeButton from "../Like/LikeButton";
import CommentButton from "../Comment/CommentButton";
import InfiniteScroll from "react-infinite-scroll-component";
import DisplayCreatedAt from "../../formats/DisplayCreatedAt";
import useFetchPosts from "./useFetchPosts";
import EditDeleteButton from "./EditDeleteButton";

const InfinityScrollPostList = ({sortType, userInfo}) => {
    const [offset, setOffset] = useState(OFFSET);
    const [posts, setPosts] = useState([]);
    const [isLastPost, fetchPosts] = useFetchPosts(sortType);
    const navigate = useNavigate();

    useEffect(() => {
        loadInitialPosts();
    }, [sortType]);

    const loadInitialPosts = async () => {
        setOffset(OFFSET);
        const initialPosts = await fetchPosts(OFFSET, LIMIT);
        setPosts(initialPosts);
    };

    const loadMorePosts = async () => {
        const newPosts = await fetchPosts(offset + LIMIT, LIMIT);
        setPosts([...posts, ...newPosts]);
        setOffset(offset + LIMIT);
    };
    const handlePostClick = (postId) => {
        navigate(`/read/${postId}`, {state: {showPost: true}});
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <InfiniteScroll next={loadMorePosts} hasMore={!isLastPost} loader={
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
                                   <EditDeleteButton post={post} />
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

export default InfinityScrollPostList;
