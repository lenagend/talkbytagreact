import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const offset = 0;
                const limit = 10;
                const response = await axios.get(`http://localhost:8080/api/posts?offset=${offset}&limit=${limit}`);
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
                <div key={post.id} style={{ marginBottom: '1rem' }}>
                    <p>{post.contents}</p>
                </div>
            ))}
        </div>
    );
};

export default PostList;
