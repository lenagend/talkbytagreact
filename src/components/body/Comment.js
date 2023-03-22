import React, {useEffect, useState} from "react";
import {API_BASE_URL, LIMIT, OFFSET} from "../../config/config";
import axios from "axios";

const Comment = ({ comment }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);

    const [replies, setReplies] = useState([]);

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

    return (
        <div>
        <li className="comment-item">
            <div className="d-flex position-relative">
                <div className="avatar avatar-xs">
                    <a href="#!"><img className="avatar-img rounded-circle" src="assets/images/avatar/05.jpg"
                                      alt=""/></a>
                </div>
                <div className="ms-2">
                    <div className="bg-light rounded-start-top-0 p-3 rounded">
                        <div className="d-flex justify-content-between">
                            <h6 className="mb-1"><a href="#!"> {comment.authorId} </a></h6>
                            <small className="ms-2">{new Date(comment.createdAt).toLocaleString()}</small>
                        </div>
                        <p className="small mb-0">{comment.contents}</p>
                    </div>
                    <ul className="nav nav-divider py-2 small">
                        <li className="nav-item">
                            <a className="nav-link" href="#!"> Like (3)</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#!" onClick={handleReplyClick}> Reply</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#!"> View 5 replies</a>
                        </li>
                    </ul>
                </div>
            </div>
            {/*Create Comment*/}
            {showReplyForm && (
            <div class="d-flex mb-3">
                <div className="avatar avatar-xs me-2">
                    <a href="#!"> <img className="avatar-img rounded-circle" src="assets/images/avatar/12.jpg" alt=""/> </a>
                </div>
                <form className="nav nav-item w-100 position-relative">
                <textarea data-autoresize className="form-control pe-5 bg-light" rows="1" id="contents" name="contents"

                          placeholder="댓글을 입력하세요..."/>
                    <button
                        className="nav-link bg-transparent px-3 position-absolute top-50 end-0 translate-middle-y border-0"
                        type="submit">
                        <i className="bi bi-send-fill"> </i>
                    </button>
                </form>
            </div>
            )}
            {/*Create Comment*/}
            {/*Reply List*/}
            <ul className="comment-wrap list-unstyled">
                {replies.map((reply) => (
                    <Comment key={reply.id} comment={reply}/>
                ))}
            </ul>
            {/*Reply List*/}

        </li>
        </div>
    );
}

export default Comment;