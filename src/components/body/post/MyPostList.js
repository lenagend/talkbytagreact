import React, {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {API_BASE_URL, IMAGE_SERVER_BASE_URL, LIMIT, OFFSET} from "../../../config/config";
import InfiniteScroll from 'react-infinite-scroll-component';
import LikeButton from "../Like/LikeButton";
import AuthContext from "../../../security/AuthContext";
import InfinityScrollPostList from "./InfinityScrollPostList";



const MyPostList = () => {
    const [offset, setOffset] = useState(OFFSET);
    const limit = LIMIT;
    const [posts, setPosts] = useState([]);
    const [isLastPost, setIsLastPost] = useState(false);
    const navigate = useNavigate();
    const { userInfo } = useContext(AuthContext);

    useEffect(() => {

        fetchPosts(true);

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
        <InfinityScrollPostList posts={posts} userInfo={userInfo} fetchPosts={fetchPosts} isLastPost={isLastPost}/>
    );
};

export default MyPostList;
