import React from "react";
import {Editor} from "@tinymce/tinymce-react";
import { useState } from 'react';
import axios from "axios";
import {API_BASE_URL} from "../../config/config";
import {useNavigate} from "react-router-dom";

function SubmitSubmit() {
    const [contents, setContents] = useState('');
    const [postSuccess, setPostSuccess] = useState(false);

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post(`${API_BASE_URL}/api/posts`, { contents })
            .then(() => {
                setPostSuccess(true);
                alert('글이 저장되었습니다.');
                navigate('/');
            })
            .catch((err) => console.log(err));

    }

        return (
            <div className="card card-body" style={{ flex: "0 0 auto" }}>
                <form className="w-100" onSubmit={handleSubmit}>
                    <div className="d-flex mb-3">
                        <Editor apiKey='vglh308z4bo97w3ria7yermxmd9lmy0vo4x13kq18kaim0sw' init={{ width : "100%", height : "1000px", branding : false, forced_root_block : false, menubar : false }}
                        onEditorChange={(newContent) => setContents(newContent)}/>
                    </div>
                    <ul className="nav nav-pills nav-stack small fw-normal">
                        <li className="nav-item ms-lg-auto">
                            <button type="submit" className="btn btn-success-soft">포스트</button>
                        </li>
                    </ul>
                    <input type="hidden" name="hashTag" id="hashTag" className="form-control" value="newHashTag"/>
                </form>
            </div>
        );

}

export default SubmitSubmit;