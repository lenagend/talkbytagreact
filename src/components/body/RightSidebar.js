import React from 'react';

const RightSidebar = () =>  {
        return(
                <div className="row g-4">
                    <div className="col-sm-6 col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <div>
                                    <span className="badge bg-danger text-danger bg-opacity-10 small">Hot10</span>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="d-flex">
                                    <h6><i className="bi bi-hand-thumbs-up-fill text-success"></i> 50</h6>
                                    <p className="small">People have shown interest recently</p>
                                </div>
                                <div className="d-flex">
                                    <h6><i className="bi bi-hand-thumbs-up-fill text-success"></i> 50</h6>
                                    <p className="small">People have shown interest recently</p>
                                </div>
                                <div className="d-flex">
                                    <h6><i className="bi bi-hand-thumbs-up-fill text-success"></i> 50</h6>
                                    <p className="small">People have shown interest recently</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
}

export default RightSidebar;