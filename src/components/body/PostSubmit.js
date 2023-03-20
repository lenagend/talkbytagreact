import React from "react";
import {Editor} from "@tinymce/tinymce-react";
import { useState } from 'react';
import axios from "axios";
import {API_BASE_URL} from "../../config/config";
import {useNavigate} from "react-router-dom";

function PostSubmit( {post} ) {
    const [contents, setContents] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!post){
            axios.post(`${API_BASE_URL}/api/posts`, { contents })
                .then(() => {
                    navigate('/');
                })
                .catch((err) => console.log(err));
        }else{
            const publishedValue = e.target.name === "delete" ? false : true;
            axios.put(`${API_BASE_URL}/api/posts/${post.id}`, {contents : contents,  published: publishedValue})
                .then(() => {
                    navigate('/');
                })
                .catch((err) => console.log(err));
        }


    }

        return (
            <div className="card card-body" style={{ flex: "0 0 auto" }}>
                    <div className="d-flex mb-3">
                        <Editor apiKey='vglh308z4bo97w3ria7yermxmd9lmy0vo4x13kq18kaim0sw'
                                initialValue={post ? post.contents : ''}
                                init={{ width : "100%",
                            height : 600,
                            plugins: 'image imagetools', // 이미지 관련 플러그인 추가
                            toolbar: 'image', // 툴바에 이미지 아이콘 추가
                            menubar : false,
                            automatic_uploads: true,
                            images_reuse_filename: true,
                            images_upload_url: `${API_BASE_URL}/api/posts/upload-image`,
                            images_upload_handler: async (blobInfo, success, failure) => {
                                const formData = new FormData();
                                formData.append('file', blobInfo.blob(), blobInfo.filename());

                                try {
                                    const response = await axios.post(`${API_BASE_URL}/api/posts/upload-image`, formData, {
                                        headers: { 'Content-Type': 'multipart/form-data' },
                                    });
                                    const imageLocation = `${API_BASE_URL}${response.data.location}`;
                                    console.log(imageLocation);
                                    success(imageLocation);
                                } catch (error) {
                                    failure('Failed to upload image');
                                }
                            },
                                }}
                        onEditorChange={(newContent) => setContents(newContent)}/>
                    </div>
                    <ul className="nav nav-pills nav-stack small fw-normal">
                        <li className="nav-item ms-lg-auto">
                            <button onClick={handleSubmit} className="btn btn-success-soft">{post ? '수정' : '포스트'}</button>
                            {post && (<button onClick={handleSubmit} name="delete" className="btn btn-danger-soft">삭제</button>)}
                        </li>
                    </ul>
            </div>
        );

}

export default PostSubmit;