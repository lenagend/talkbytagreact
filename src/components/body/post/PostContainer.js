import React, {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {API_BASE_URL, LIMIT, OFFSET} from "../../../config/config";
import InfiniteScroll from 'react-infinite-scroll-component';
import AuthContext from "../../../security/AuthContext";
import Post from "./InfinityScrollPostList";
import InfinityScrollPostList from "./InfinityScrollPostList";
import TablePagenationPostContainer from "./PaginationPostList";



const PostContainer = ({sortType, viewType}) => {
    const { userInfo } = useContext(AuthContext);

    return (
        <div>
            {viewType === "scroll" ? (
                <InfinityScrollPostList sortType={sortType} userInfo={userInfo}/>
            ) : (
                <TablePagenationPostContainer sortType={sortType} userInfo={userInfo}/>
            )}
        </div>
    );
};

export default PostContainer;
