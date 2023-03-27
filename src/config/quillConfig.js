export const modules = {
    toolbar: {
        container: [
            // Add the necessary toolbar options
            ['bold', 'italic', 'underline'],
            ['link', 'image', 'video'],
        ],
        handlers: {
            image: (quillRef, uploadImage) => {
                // Use a custom image handler to handle image uploads
                const input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                input.click();

                input.onchange = async () => {
                    const file = input.files[0];
                    // Upload the image to the server
                    const uploadedImageUrl = await uploadImage(file);

                    // Add a small delay before inserting the image into the editor
                    setTimeout(() => {
                        const range = quillRef.current.getEditor().getSelection(true);
                        if (range) {
                            quillRef.current.getEditor().insertEmbed(range.index, 'image', uploadedImageUrl);
                        }
                    }, 0);
                };
            },
        },
    },
};

export const formats = [
    'bold', 'italic', 'underline',
    'link', 'image', 'video',
];