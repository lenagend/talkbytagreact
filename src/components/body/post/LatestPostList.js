import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {API_BASE_URL, LIMIT, OFFSET} from "../../../config/config";
import InfiniteScroll from 'react-infinite-scroll-component';
import AuthContext from "../../security/AuthContext";
import InfinityScrollPostContainer from "./InfinityScrollPostContainer";
import TablePagenationPostContainer from "./TablePaginationPostContainer";

const LatestPostList = () => {
    const [offset, setOffset] = useState(OFFSET);
    const limit = LIMIT;
    const [posts, setPosts] = useState([]);
    const [isLastPost, setIsLastPost] = useState(false);
    const { userInfo } = useContext(AuthContext);
    const [viewType, setViewType] = useState("scroll");

    useEffect(() => {
        const storedViewType = localStorage.getItem("viewType");
        if (storedViewType) {
            setViewType(storedViewType);
        }
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/posts?offset=${offset}&limit=${limit}&sortType=latest`);
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
        <div>
            {viewType === "scroll" ? (
                <InfinityScrollPostContainer posts={posts} userInfo={userInfo} fetchPosts={fetchPosts} isLastPost={isLastPost}/>
            ) : (
                <TablePagenationPostContainer posts={posts}/>
            )}
        </div>
    );
};

export default LatestPostList;
