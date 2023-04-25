import React from 'react';
import {useNavigate} from 'react-router-dom';
import {IMAGE_SERVER_BASE_URL} from '../../../config/config';
import LikeButton from "./LikeButton";
import CommentButton from "../Comment/CommentButton";
import InfiniteScroll from "react-infinite-scroll-component";
import DisplayCreatedAt from "../../formats/DisplayCreatedAt";

const TablePagenationPostContainer = ({posts, userInfo, fetchPosts, isLastPost}) => {
    const navigate = useNavigate();

    const handlePostClick = (event, postId) => {
        event.preventDefault();
        navigate(`/read/${postId}`, {state: {showPost: true}});
    };

    const handleEdit = (post) => {
        navigate('/submit', {state: {post}});
    }


    return (
        <div className="card card-body">
            <table className="table" style={{fontSize: "0.8rem"}}>
                <thead>
                <tr>
                    <th scope="col" style={{width: "15%"}}>
                        <i className="bi bi-clock"></i>
                    </th>
                    <th  scope="col" style={{width: "5%"}}>
                        <i className="bi bi-hand-thumbs-up"></i>
                    </th>
                    <th scope="col" style={{width: "60%"}}></th>
                    <th scope="col" style={{width: "20%"}}>
                        <i className="bi bi-person"></i>
                    </th>
                </tr>
                </thead>
                <tbody>
                {posts.map((post, index) => (
                    <tr key={post.id}>
                        <td style={{width: "20%"}}>
                            <DisplayCreatedAt createdAt={post.createdAt} />
                        </td>
                        <td>
                            {post.likes != 0 && post.likes}
                        </td>
                        <td style={{width: "60%", textAlign : "left"}}>
                            <a href="#!" onClick={(event) => handlePostClick(event, post.id)}>{post.title}</a>
                            &nbsp;
                            ({post.commentCount})
                        </td>
                        <td style={{width: "20%"}}>{post.nickname}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    );
};

export default TablePagenationPostContainer;
