import React, {useState, useRef, useCallback, useContext} from 'react';
import axios from "axios";
import {API_BASE_URL} from "../../../config/config";
import {useNavigate} from "react-router-dom";
import ReactQuill  from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AuthContext from "../../security/AuthContext";

function PostSubmit( {post} ) {
    const [contents, setContents] = useState(post?.contents || '');
    const [hashTag, setHashTag] = useState('');
    const { userInfo, fetchUserInfo } = useContext(AuthContext);

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
            // 입력한 해시태그를 공백으로 구분된 문자열로 저장
            setHashTag(inputHashTags.join(' '));
        } else {
            // 해시태그가 없는 경우 hashTag를 빈 문자열로 설정
            setHashTag('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedHashTag = hashTag || "#잡담";

        if(!post){
            axios.post(`${API_BASE_URL}/api/posts`, { contents: contents, hashTag : updatedHashTag, username : userInfo.username })
                .then(() => {
                    fetchUserInfo();
                    navigate('/');
                })
                .catch((err) => console.log(err));
        }else{
            const publishedValue = e.target.name === "delete" ? false : true;
            axios.put(`${API_BASE_URL}/api/posts/${post.id}`, {contents : contents,  published: publishedValue, hashTag: updatedHashTag})
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
            <div className="card card-body" style={{ flex: "0 0 auto" }}>
                    <div className="d-flex mb-5">
                        <ReactQuill style={{ width: "100%", height: "600px"}}
                            ref={reactQuillRef}
                            theme="snow"
                            value={contents}
                            onChange={handleEditorChange}
                            modules={modules}
                                    placeholder="#로 시작하는 해쉬태그를 포함해 보세요! 여러개의 해쉬태그 또한 가능합니다."
                        />
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