import React from 'react';

const RightSidebar = () =>  {
        return(
                <div className="row g-4">
                    <div className="col-sm-6 col-lg-12">
                        <div className="card">
                            <div className="card-header pb-0 border-0">
                                <h5 className="card-title mb-0">오늘 뜨거운</h5>
                            </div>
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">First</th>
                                        <th scope="col">Last</th>
                                        <th scope="col">Handle</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        );
}

export default RightSidebar;