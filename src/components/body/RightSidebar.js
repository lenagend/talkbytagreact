import React, {useContext, useEffect, useState} from 'react';
import AuthContext from "../security/AuthContext";
import axios from "axios";
import {API_BASE_URL} from "../../config/config";
import {Link} from "react-router-dom";

const RightSidebar = () =>  {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/posts?offset=0&limit=10&sortType=hot`);
            const postsData = response.data;

            setPosts(postsData);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

        return(
                <div className="row g-4">
                    <div className="col-sm-6 col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <div>
                                    <span className="badge bg-danger text-danger bg-opacity-10 small">Today's Hot10</span>
                                </div>
                            </div>
                            <div className="card-body">
                                {posts.map((post) => (
                                    <div className="d-flex">
                                        <h6 style={{width : '2rem'}}><i className="bi bi-hand-thumbs-up-fill text-success"></i>{post.likes}</h6>
                                        <p className="small">
                                            <Link to={`/read/${post.id}`}>
                                            {post.title.length > 16 ? post.title.slice(0, 16) + '...' : post.title}
                                            </Link>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
        );
}

export default RightSidebar;