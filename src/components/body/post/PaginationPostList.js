import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DisplayCreatedAt from "../../formats/DisplayCreatedAt";
import useFetchPosts from "./useFetchPosts";
import { LIMIT, OFFSET } from "../../../config/config";
import CommentButton from "../Comment/CommentButton";
import LikeButton from "../Like/LikeButton";

const PaginationPostList = ({ userInfo, sortType }) => {
    const [offset, setOffset] = useState(OFFSET);
    const [posts, setPosts] = useState([]);
    const [postCount, setPostCount] = useState(0);
    const [isLastPost, fetchPosts, fetchPostCount] = useFetchPosts(sortType);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageGroup, setPageGroup] = useState(1);
    const lastPage = Math.ceil(postCount / LIMIT);

    const handlePostClick = (event, postId) => {
        event.preventDefault();
        navigate(`/read/${postId}`, {state: {showPost: true}});
    };

    useEffect(() => {
        loadInitialPosts();
    }, [sortType, postCount]);

    const loadInitialPosts = async () => {
        setOffset(OFFSET);
        const initialPosts = await fetchPosts(offset, LIMIT);
        setPosts(initialPosts);
    };

    useEffect(() => {
        const getPostCount = async () => {
            const count = await fetchPostCount();
            setPostCount(count);
        };

        getPostCount();
    }, [sortType]);

    const renderPageButtons = () => {
        const pageCount = Math.ceil(postCount / LIMIT);
        const startPage = (pageGroup - 1) * 5 + 1;
        const endPage = Math.min(startPage + 4, pageCount);

        let buttons = [];
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <li key={i} className={`page-item ${i === currentPage ? "active" : ""}`}>
                    <button className="page-link" onClick={() => handlePageClick(i)}>
                        {i}
                    </button>
                </li>
            );
        }

        return buttons;
    };

    const handlePageClick = async (page) => {
        setCurrentPage(page);
        setPageGroup(Math.ceil(page / 5));
        const newPosts = await fetchPosts((page - 1) * LIMIT, LIMIT);
        setPosts(newPosts);
    };

    const handlePrevGroup = async () => {
        const newPageGroup = Math.max(pageGroup - 1, 1);
        const newPage = (newPageGroup - 1) * 5 + 1;
        setCurrentPage(newPage);
        setPageGroup(newPageGroup);
        const newPosts = await fetchPosts((newPage - 1) * LIMIT, LIMIT);
        setPosts(newPosts);
    };

    const handleNextGroup = async () => {
        const newPageGroup = Math.min(pageGroup + 1, Math.ceil(lastPage / 5));
        const newPage = (newPageGroup - 1) * 5 + 1;
        setCurrentPage(newPage);
        setPageGroup(newPageGroup);
        const newPosts = await fetchPosts((newPage - 1) * LIMIT, LIMIT);
        setPosts(newPosts);
    };

    return (
        <div className="card card-body">
            {postCount < 1 ? (
                <small>글이 없습니다.</small>
            ) : (
                <>
                    <table className="table" style={{ fontSize: "0.8rem" }}>
                        <thead>
                        <tr>
                            <th scope="col" style={{ width: "15%" }}>
                                <i className="bi bi-clock"></i>
                            </th>
                            <th scope="col" style={{ width: "5%" }}>
                                <i className="bi bi-hand-thumbs-up"></i>
                            </th>
                            <th scope="col" style={{ width: "60%" }}></th>
                            <th scope="col" style={{ width: "20%" }}>
                                <i className="bi bi-person"></i>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {posts.map((post, index) => (
                            <tr key={post.id}>
                                <td style={{ width: "20%" }}>
                                    <DisplayCreatedAt createdAt={post.createdAt} />
                                </td>
                                <td><LikeButton id={post.id} isPost={true} displayType="number"/></td>
                                <td style={{ width: "60%", textAlign: "left" }}>
                                    <a
                                        href="#!"
                                        onClick={(event) => handlePostClick(event, post.id)}
                                    >
                                        {post.title}
                                    </a>
                                    &nbsp;
                                    (
                                    <CommentButton
                                        commentCount={post.commentCount}
                                        postId={post.id}
                                        displayType="number"
                                    />
                                    )
                                </td>
                                <td style={{ width: "20%" }}>{post.nickname}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-center">
                            <li className="page-item">
                                <button
                                    className="page-link"
                                    onClick={handlePrevGroup}
                                    disabled={pageGroup === 1}
                                >
                                    <span aria-hidden="true">&laquo;</span>
                                </button>
                            </li>
                            {renderPageButtons()}
                            <li className="page-item">
                                <button
                                    className="page-link"
                                    onClick={handleNextGroup}
                                    disabled={pageGroup === Math.ceil(postCount / (LIMIT * 5))}
                                >
                                    <span aria-hidden="true">&raquo;</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </>
            )}
        </div>
    );

};

export default PaginationPostList;