import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {API_BASE_URL} from "../../../config/config";
import AuthContext from "../../security/AuthContext";
import {useNavigate} from "react-router-dom";

const LikeButton = ({ id, isPost }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const { isAuthenticated, fetchUserInfo } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) { // 이 부분을 추가하세요.
            fetchIsLiked();
        }
        fetchLikeCount();

    }, [id, isPost]);

    const fetchIsLiked = () => {
        const token = localStorage.getItem('token');
        if(token){
            axios.get(`${API_BASE_URL}/api/${isPost ? 'posts' : 'comments'}/${id}/liked`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                setLiked(response.data);
            }).catch(error => {
                console.error('Error while checking liked status:', error);
            });
        }
    }

    const fetchLikeCount = () =>
    {
        axios
            .get(`${API_BASE_URL}/api/${isPost ? 'posts' : 'comments'}/${id}/likeCount`)
            .then((response) => {
                setLikeCount(response.data);
            })
            .catch((error) => {
                console.error('Error fetching like count:', error);
            });
    }

    const toggleLike = async () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { originPath: window.location.pathname } });
            return;
        }
        const token = localStorage.getItem('token');

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const url = isPost ? `${API_BASE_URL}/api/posts/${id}/like` : `${API_BASE_URL}/api/comments/${id}/like`;
            await axios.put(url, {}, config);
            fetchUserInfo();
            fetchIsLiked();
            fetchLikeCount();

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <a
            href="#!"
            className={`nav-link ${liked ? 'active' : ''}`}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleLike();
            }}
        >
            <i className="bi bi-hand-thumbs-up-fill pe-1"></i>
            좋아요 (<span>{likeCount}</span>)
        </a>
    );
};

export default LikeButton;
