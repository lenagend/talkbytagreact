import React, {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const NavSearch = () => {
    const { q } = useParams();
    const [contents, setContents] = useState(q);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setContents(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${contents}`);
    }

        return (
            <div className="nav mt-3 mt-lg-0 flex-nowrap align-items-center px-4 px-lg-0">
                <div className="nav-item w-100">
                    <form className="rounded position-relative" onSubmit={handleSubmit}>
                        <input className="form-control ps-5 bg-light" type="search" placeholder="검색하세요" value={contents}
                               aria-label="Search" onChange={handleInputChange}/>
                            <button className="btn bg-transparent px-2 py-0 position-absolute top-50 start-0 translate-middle-y"
                                type="submit" ><i className="bi bi-search fs-5"> </i></button>
                    </form>
                </div>
            </div>
        );

}

export default NavSearch;