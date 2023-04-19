import React, {useState, useRef, useCallback, useContext} from 'react';
import axios from "axios";
import {API_BASE_URL} from "../../../config/config";
import {useNavigate} from "react-router-dom";
import ReactQuill  from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AuthContext from "../../security/AuthContext";

function PostSubmit( {post} ) {
    const [contents, setContents] = useState(post?.contents || '');
    const [title, setTitle] = useState(post?.title || '');
    const { userInfo, fetchUserInfo } = useContext(AuthContext);
    const [submitError, setSubmitError] = useState('');

    const navigate = useNavigate();

    const handleEditorChange = (contents) => {
        setContents(contents);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!title){
            setSubmitError('제목을 입력해주세요.');
            window.scrollTo(0, 0);
            setTimeout(() => {
                setSubmitError('');
            }, 3000);
            return;
        }
        if(!contents){
            setSubmitError('본문을 입력해주세요.');
            window.scrollTo(0, 0);
            setTimeout(() => {
                setSubmitError('');
            }, 3000);
            return;
        }

        if(!post){
            axios.post(`${API_BASE_URL}/api/posts`, { contents: contents, title : title, username : userInfo.username })
                .then(() => {
                    fetchUserInfo();
                    navigate('/');
                })
                .catch((err) => console.log(err));
        }else{
            const publishedValue = e.target.name === "delete" ? false : true;
            axios.put(`${API_BASE_URL}/api/posts/${post.id}`, {contents : contents,  published: publishedValue, title: title})
                .then(() => {
                    fetchUserInfo();
                    navigate('/');
                })
                .catch((err) => console.log(err));
        }
    }

    const reactQuillRef = useRef(null);

    const customImageHandler = useCallback(async () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();
            formData.append('file', file);
            formData.append('imageType', 'post'); // 하위폴더

            try {
                const response = await axios.post(`${API_BASE_URL}/api/upload-image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const data = response.data;
                const quill = reactQuillRef.current.getEditor();
                const range = quill.getSelection();
                quill.insertEmbed(range.index, 'image', `${API_BASE_URL}${data.location}`);
            } catch (error) {
                console.error('Error uploading image', error);
            }
        };
    }, []);

    const modules = {
        toolbar: {
            container: [
                // Add your toolbar options here
                ['bold', 'italic', 'underline', 'strike'],
                ['image'],
            ],
            handlers: {
                image: customImageHandler,
            },
        },
    };

    return (
        <div>
        {submitError && (
            <div className="alert alert-warning" role="alert">
                <strong>제출 실패!</strong> {submitError}
            </div>
        )}
            <div className="card" style={{ flex: "0 0 auto" }}>
                <div className="card-header">
                    <input type="text" className="form-control" value={title} onChange={handleTitleChange} />
                </div>
                    <div className="card-body">
                        <ReactQuill style={{ width: "100%", height: "520px"}}
                            ref={reactQuillRef}
                            theme="snow"
                            value={contents}
                            onChange={handleEditorChange}
                            modules={modules}
                        />
                    </div>
                <div className="card-footer mt-5">
                    <ul className="nav nav-pills nav-stack small fw-normal">
                        <li className="nav-item ms-lg-auto">
                            <button onClick={handleSubmit} className="btn btn-success-soft">{post ? '수정' : '포스트'}</button>
                            {post && (<button onClick={handleSubmit} name="delete" className="btn btn-danger-soft">삭제</button>)}
                        </li>
                    </ul>
                </div>

            </div>
        </div>
        );

}

export default PostSubmit;