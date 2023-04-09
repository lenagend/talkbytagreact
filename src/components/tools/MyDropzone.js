import React, {useCallback, useState} from "react";
import axios from "axios";
import {API_BASE_URL} from "../../config/config";
import {useDropzone} from "react-dropzone";

const MyDropzone = () => {

    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);

    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        setUploadedImage(file);
        setImagePreviewUrl(URL.createObjectURL(file));

        // 서버에 이미지 업로드
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/upload-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }

    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} className="dropzone dropzone-default card shadow-none">
            <input {...getInputProps()} />
            <div className="dz-message">
                {uploadedImage ? (
                    <img src={imagePreviewUrl} alt="Uploaded" style={{ width: '100%', marginTop: '1rem' }} />
                ) : (
                    <>
                        <i className="bi bi-images display-3"></i>
                        <p>드래그하거나 클릭해서 업로드하세요.</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default MyDropzone;