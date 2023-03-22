import React, { useState, useEffect } from 'react';
import {API_BASE_URL} from "../../config/config";
import axios from "axios";

const Comments = ({postId}) => {
    const [contents, setContents] = useState(0);

    const handleInputChange = (event) => {
        setContents(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/api/comments`, { contents: contents, postId: postId });
            console.log('Comment posted:', response.data);
            // 새로운 댓글을 불러오는 등의 작업을 수행할 수 있습니다.
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    return (
        <div>
            {/*Create Comment*/}
        <div class="d-flex mb-3">
            <div className="avatar avatar-xs me-2">
                <a href="#!"> <img className="avatar-img rounded-circle" src="assets/images/avatar/12.jpg" alt=""/> </a>
            </div>
            <form className="nav nav-item w-100 position-relative" onSubmit={handleSubmit}>
                <textarea data-autoresize className="form-control pe-5 bg-light" rows="1" id="contents" name="contents"
                          onChange={handleInputChange}
                          placeholder="댓글을 입력하세요..."></textarea>
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
                <li className="comment-item">
                    <div className="d-flex position-relative">
                        <div className="avatar avatar-xs">
                            <a href="#!"><img className="avatar-img rounded-circle" src="assets/images/avatar/05.jpg"
                                              alt=""/></a>
                        </div>
                        <div className="ms-2">
                            <div className="bg-light rounded-start-top-0 p-3 rounded">
                                <div className="d-flex justify-content-between">
                                    <h6 className="mb-1"><a href="#!"> Frances Guerrero </a></h6>
                                    <small className="ms-2">5hr</small>
                                </div>
                                <p className="small mb-0">Removed demands expense account in outward tedious do.
                                    Particular way thoroughly unaffected projection.</p>
                            </div>
                            <ul className="nav nav-divider py-2 small">
                                <li className="nav-item">
                                    <a className="nav-link" href="#!"> Like (3)</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#!"> Reply</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#!"> View 5 replies</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
            {/*Comment List*/}

        </div>
    );
}

export default Comments;