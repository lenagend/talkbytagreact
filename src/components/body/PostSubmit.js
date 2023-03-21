import React from "react";
import {Editor} from "@tinymce/tinymce-react";
import { useState } from 'react';
import axios from "axios";
import {API_BASE_URL} from "../../config/config";
import {useNavigate} from "react-router-dom";

function PostSubmit( {post} ) {
    const [contents, setContents] = useState('');
    const [hashTag, setHashTag] = useState('');
    const navigate = useNavigate();


    const handleEditorChange = (contents) => {
        setContents(contents);

        // 해시태그를 찾기 위한 정규식
        const hashTagRegex = /(#[\wㄱ-ㅎㅏ-ㅣ가-힣]+)/g;

        // 해시태그를 포함한 HTML을 텍스트로 변환
        const parser = new DOMParser();
        const parsedHtml = parser.parseFromString(contents, 'text/html');
        const textContent = parsedHtml.body.textContent;
        // 텍스트에서 해시태그를 찾음
        const inputHashTags = textContent.match(hashTagRegex);

        if (inputHashTags) {
            let modifiedContents = contents;
            inputHashTags.forEach((tag) => {
                const tagWithBlueFont = `<span style="color:#008EE2; font-weight: bold">${tag}</span>`;
                modifiedContents = modifiedContents.replace(tag, tagWithBlueFont);
            });
            setContents(modifiedContents);
            setHashTag(inputHashTags.join(' '));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedHashTag = hashTag || "#freeTalk";

        if(!post){
            axios.post(`${API_BASE_URL}/api/posts`, { contents: contents, hashTag : updatedHashTag })
                .then(() => {
                    navigate('/');
                })
                .catch((err) => console.log(err));
        }else{
            const publishedValue = e.target.name === "delete" ? false : true;
            axios.put(`${API_BASE_URL}/api/posts/${post.id}`, {contents : contents,  published: publishedValue, hashTag: updatedHashTag})
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
                            menubar : false,
                            automatic_uploads: true,

                                }}
                        onEditorChange={handleEditorChange}/>
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