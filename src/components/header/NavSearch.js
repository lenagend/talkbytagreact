import React from 'react';

class NavSearch extends React.Component {
    render() {
        return (
            <div className="nav mt-3 mt-lg-0 flex-nowrap align-items-center px-4 px-lg-0">
                <div className="nav-item w-100">
                    <form className="rounded position-relative">
                        <input className="form-control ps-5 bg-light" type="search" placeholder="Search..."
                               aria-label="Search"/>
                            <button className="btn bg-transparent px-2 py-0 position-absolute top-50 start-0 translate-middle-y"
                                type="submit"><i className="bi bi-search fs-5"> </i></button>
                    </form>
                </div>
            </div>
        );
    }
}

export default NavSearch;