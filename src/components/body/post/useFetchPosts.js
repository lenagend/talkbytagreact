import {useState} from "react";
import {API_BASE_URL} from "../../../config/config";
import axios from "axios";

const useFetchPosts = (sortType) => {
    const [isLastPost, setIsLastPost] = useState(false);

    const fetchPosts = async (offset, limit) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/posts?offset=${offset}&limit=${limit}&sortType=${sortType}`);
            const postsData = response.data;

            // 마지막 포스트 여부를 판단
            if (postsData.length < limit) {
                setIsLastPost(true);
            } else {
                setIsLastPost(false);
            }

            return postsData;
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const fetchPostCount = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/posts/count?published=true&sortType=${sortType}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching post count:', error);
        }
    };

    return [isLastPost, fetchPosts, fetchPostCount];
};

export default useFetchPosts;
