import React, { useState, useEffect } from 'react';
import {API_BASE_URL, LIMIT, OFFSET} from "../../config/config";
import axios from "axios";
import Comment from "./Comment";

const CommentContainer = ({postId, setCommentCounts}) => {
    const [contents, setContents] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const offset = `${OFFSET}`;
            const limit = `${LIMIT}`;
            const response = await axios.get(`${API_BASE_URL}/api/${postId}/comments`);
            const commentData = response.data;

            setComments(commentData);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleInputChange = (event) => {
        setContents(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/api/comments`, { contents: contents, postId: postId });
            console.log('Comment posted:', response.data);
            setCommentCounts();
            fetchComments();
            setContents('');
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    return (
        <div>
            {/*Create Comment*/}
        <div class="d-flex mb-3">
            <div className="avatar avatar-xs me-2">
                <a href="#!"> <img className="avatar-img rounded-circle" src="/assets/images/avatar/12.jpg" alt=""/> </a>
            </div>
            <form className="nav nav-item w-100 position-relative" onSubmit={handleSubmit}>
                <textarea data-autoresize className="form-control pe-5 bg-light" rows="1" id="contents" name="contents"
    onChange={handleInputChange} value={contents}
    placeholder="댓글을 입력하세요..."/>
                <button
                    className="nav-link bg-transparent px-3 position-absolute top-50 end-0 translate-middle-y border-0"
                    type="submit">
                    <i className="bi bi-send-fill"> </i>
                </button>
            </form>
        </div>
            {/*Create Comment*/}

            {/*Comment List*/}
            <ul className="comment-wrap list-unstyled">
                {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} setCommentCounts={setCommentCounts}/>
                ))}
            </ul>
            {/*Comment List*/}

        </div>
    );
}

export default CommentContainer;