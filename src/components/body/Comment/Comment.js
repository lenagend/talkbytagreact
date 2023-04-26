import React, {useContext, useEffect, useState} from "react";
import {API_BASE_URL, IMAGE_SERVER_BASE_URL, LIMIT, OFFSET} from "../../../config/config";
import axios from "axios";
import AuthContext from "../../../security/AuthContext";
import LikeButton from "../Like/LikeButton";

const Comment = ({ comment, setCommentCounts }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [contents, setContents] = useState('');
    const [replies, setReplies] = useState([]);
    const { userInfo, fetchUserInfo } = useContext(AuthContext);
    const profileImageSrc = `${IMAGE_SERVER_BASE_URL}${userInfo.profileImage}`;


    useEffect(() => {
        fetchReplies();
    }, []);

    const fetchReplies = async () => {
        try {
            const offset = `${OFFSET}`;
            const limit = `${LIMIT}`;
            const response = await axios.get(`${API_BASE_URL}/api/${comment.id}/replies`);
            const replyData = response.data;

            setReplies(replyData);
        } catch (error) {
            console.error('Error fetching replies:', error);
        }
    };

    const handleReplyClick = () => {
        setShowReplyForm(!showReplyForm);
    }

    const handleInputChange = (event) => {
        setContents(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/api/comments`, { contents: contents, postId: comment.postId, upperCommentId: comment.id, username: userInfo.username });
            console.log('ReadComment posted:', response.data);
            setShowReplyForm(!showReplyForm);
            setCommentCounts();
            fetchReplies();
            setContents('');
            fetchUserInfo();
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    return (
        <div>
        <li className="comment-item">
            <div className="d-flex position-relative">
                <div className="avatar avatar-xs">
                    <a href="#!"><img className="avatar-img rounded-circle" src={`${IMAGE_SERVER_BASE_URL}${comment.profileImage}`}
                                      alt=""/></a>
                </div>
                <div className="ms-2">
                    <div className="bg-light rounded-start-top-0 p-3 rounded">
                        <div className="d-flex justify-content-between">
                            <h6 className="mb-1"><a href="#!"> {comment.nickname} </a></h6>
                            <small className="ms-2">{new Date(comment.createdAt).toLocaleString()}</small>
                        </div>
                        <p className="small mb-0">{comment.contents}</p>
                    </div>
                    <ul className="nav nav-divider py-2 small">
                        <li className="nav-item">
                            <LikeButton id={comment.id} isPost={false} />
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#!" onClick={handleReplyClick}> 답글</a>
                        </li>
                    </ul>
                </div>
            </div>
            {showReplyForm && (
            <div class="d-flex mb-3">
                <div className="avatar avatar-xs me-2">
                    <a href="#!"> <img className="avatar-img rounded-circle" src={profileImageSrc} alt=""/> </a>
                </div>
                <form className="nav nav-item w-100 position-relative" onSubmit={handleSubmit}>
                <textarea data-autoresize className="form-control pe-5 bg-light" rows="1" id="contents" name="contents" value={contents}
                          onChange={handleInputChange}
                          placeholder="댓글을 입력하세요"/>
                    <button
                        className="nav-link bg-transparent px-3 position-absolute top-50 end-0 translate-middle-y border-0"
                        type="submit">
                        <i className="bi bi-send-fill"> </i>
                    </button>
                </form>
            </div>
            )}
            <ul className="comment-item-nested list-unstyled">
                {replies.map((reply) => (
                    <Comment key={reply.id} comment={reply} setCommentCounts={setCommentCounts}/>
                ))}
            </ul>

        </li>
        </div>
    );
}

export default Comment;