import React, {useCallback, useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";

const MyDropzone = ({ onImageUpload, uploadedImage, setUploadedImage }) => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');

    useEffect(() => {
        if (uploadedImage) {
            const previewUrl = URL.createObjectURL(uploadedImage);
            setImagePreviewUrl(previewUrl);
        } else {
            setImagePreviewUrl(null);
        }
    }, [uploadedImage]);

    const onDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];
            setUploadedImage(file);
            onImageUpload(file);
        },
        [onImageUpload, setUploadedImage]
    );

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