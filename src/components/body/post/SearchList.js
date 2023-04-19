import React, {useContext, useEffect, useState} from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {API_BASE_URL, LIMIT, OFFSET} from "../../../config/config";
import InfiniteScroll from 'react-infinite-scroll-component';
import PostContainer from "./PostContainer";
import AuthContext from "../../security/AuthContext";



const SearchList = () => {
    const [offset, setOffset] = useState(OFFSET);
    const limit = LIMIT;
    const [posts, setPosts] = useState([]);
    const [isLastPost, setIsLastPost] = useState(false);
    const navigate = useNavigate();
    const { q } = useParams();
    const decodedSearchQuery = decodeURIComponent(q);
    const { userInfo } = useContext(AuthContext);
    const [type, setType] = useState('title');

    const fetchPosts = async (newOffset) => {
        try {
            const encodedSearchQuery = encodeURIComponent(decodedSearchQuery);
            const response = await axios.get(`${API_BASE_URL}/api/posts/search?type=${type}&q=${encodedSearchQuery}&offset=${newOffset}&limit=${limit}`);
            const postsData = response.data;

            // 마지막 포스트 여부를 판단
            if (!postsData || postsData.length < limit) {
                setIsLastPost(true);
            } else {
                setIsLastPost(false);
            }

            const fetchCommentCounts = async () => {
                const commentCountPromises = postsData.map(async (post) => {
                    const commentResponse = await axios.get(`${API_BASE_URL}/api/comments/count/${post.id}`);
                    return commentResponse.data;
                });

                const commentCounts = await Promise.all(commentCountPromises);
                return commentCounts;
            };

            const commentCounts = await fetchCommentCounts();

            const postsWithCommentCounts = postsData.map((post, index) => {
                return { ...post, commentCount: commentCounts[index] };
            });

            return postsWithCommentCounts;
        } catch (error) {
            console.error('Error fetching posts:', error);
            return [];
        }
    };

    const loadInitialPosts = async () => {
        setOffset(OFFSET);
        const initialPosts = await fetchPosts(OFFSET);
        setPosts(initialPosts);
    };

    useEffect(() => {
        loadInitialPosts();
    }, [q]);

    const loadMorePosts = async () => {
        const newOffset = offset + limit;
        const morePosts = await fetchPosts(newOffset);
        setPosts([...posts, ...morePosts]);
        setOffset(newOffset);
    };

    const handleEdit = (post) => {
        navigate('/submit', {state : {post}});
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    return (
        <InfiniteScroll  next={loadMorePosts} hasMore={!isLastPost} loader={
            <div>
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                 Loading
            </div>
        } dataLength={posts.length} endMessage={
            <div className="alert alert-warning" role="alert">
                더 이상 게시글이 없습니다. <a href="#" onClick={scrollToTop} className="alert-link">위로 가기</a>
            </div>
        }>
            <PostContainer posts={posts} userInfo={userInfo} />
        </InfiniteScroll>
    );
};

export default SearchList;
