import React, {useContext, useEffect, useState} from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {API_BASE_URL, IMAGE_SERVER_BASE_URL, LIMIT, OFFSET} from "../../../config/config";
import InfiniteScroll from 'react-infinite-scroll-component';
import LikeButton from "./LikeButton";
import AuthContext from "../../security/AuthContext";
import LatestPostList from "./LatestPostList";
import InfinityScrollPostContainer from "./InfinityScrollPostContainer";



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
        <InfinityScrollPostContainer posts={posts} userInfo={userInfo} fetchPosts={fetchPosts} isLastPost={isLastPost}/>
    );
};

export default DeletedPostList;
