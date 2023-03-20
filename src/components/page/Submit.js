import React, {useState} from 'react';
import Header from "../header/Header";
import Container from "../body/Container";
import { useLocation } from 'react-router-dom';


function Submit() {
    const location = useLocation();
    const [post, setPost] = useState(location.state?.post || null);

    return (
        <div className="App">
            <Header />
            <Container page="submit" post={post ? post : null}/>
        </div>
    );

}

export default Submit;