import React, {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {API_BASE_URL, LIMIT, OFFSET} from "../../../config/config";
import InfiniteScroll from 'react-infinite-scroll-component';
import AuthContext from "../../security/AuthContext";
import Post from "./PostContainer";
import PostContainer from "./PostContainer";



const HottestPostList = () => {
    const [offset, setOffset] = useState(OFFSET);
    const limit = LIMIT;
    const [posts, setPosts] = useState([]);
    const [isLastPost, setIsLastPost] = useState(false);
    const { userInfo } = useContext(AuthContext);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/posts?offset=${offset}&limit=${limit}&sortType=hot`);
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
            <PostContainer posts={posts} userInfo={userInfo} />
         </InfiniteScroll>
    );
};

export default HottestPostList;
