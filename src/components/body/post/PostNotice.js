import React from 'react';

class PostNotice extends React.Component {
    render() {
        return(
                <div className="row g-4">
                    <div className="col-sm-6 col-lg-12">
                        <div className="card">
                            <div className="card-header pb-0 border-0">
                                <h5 className="card-title mb-0">작성방법</h5>
                            </div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <h6 className="mb-0"><a href="blog-details.html">본문중 @으로 시작하는 단어는 해시태그가 됩니다. </a></h6>
                                    <small>&middot;</small>
                                </div>
                                <div className="mb-3">
                                    <h6 className="mb-0"><a href="blog-details.html">해시태그가 없을시 @FreeTalk가 해시태그가 됩니다.</a></h6>
                                    <small>&middot;</small>
                                </div>
                                <div className="mb-3">
                                    <h6 className="mb-0"><a href="blog-details.html">에디터에 이미지를 드래그하여 삽입 가능합니다.</a></h6>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default PostNotice;