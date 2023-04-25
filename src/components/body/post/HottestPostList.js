import React, {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {API_BASE_URL, LIMIT, OFFSET} from "../../../config/config";
import InfiniteScroll from 'react-infinite-scroll-component';
import AuthContext from "../../security/AuthContext";
import Post from "./InfinityScrollPostContainer";
import InfinityScrollPostContainer from "./InfinityScrollPostContainer";



const HottestPostList = ({viewType}) => {
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

    return (
        <InfinityScrollPostContainer posts={posts} userInfo={userInfo} fetchPosts={fetchPosts} isLastPost={isLastPost}/>
    );
};

export default HottestPostList;
