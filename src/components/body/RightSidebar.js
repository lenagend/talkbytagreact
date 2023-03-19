import React from 'react';

class RightSidebar extends React.Component {
    render() {
        return(
                <div className="row g-4">
                    <div className="col-sm-6 col-lg-12">
                        <div className="card">
                            <div className="card-header pb-0 border-0">
                                <h5 className="card-title mb-0">Today’s news</h5>
                            </div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <h6 className="mb-0"><a href="blog-details.html">Ten questions you should answer
                                        truthfully</a></h6>
                                    <small>2hr</small>
                                </div>
                                <div className="mb-3">
                                    <h6 className="mb-0"><a href="blog-details.html">Five unbelievable facts about
                                        money</a></h6>
                                    <small>3hr</small>
                                </div>
                                <div className="mb-3">
                                    <h6 className="mb-0"><a href="blog-details.html">Best Pinterest Boards for learning
                                        about business</a></h6>
                                    <small>4hr</small>
                                </div>
                                <div className="mb-3">
                                    <h6 className="mb-0"><a href="blog-details.html">Skills that you can learn from
                                        business</a></h6>
                                    <small>6hr</small>
                                </div>
                                <a href="#!" role="button"
                                   className="btn btn-link btn-link-loader btn-sm text-secondary d-flex align-items-center"
                                   data-bs-toggle="button" aria-pressed="true">
                                    <div className="spinner-dots me-2">
                                        <span className="spinner-dot"></span>
                                        <span className="spinner-dot"></span>
                                        <span className="spinner-dot"></span>
                                    </div>
                                    View all latest news
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default RightSidebar;