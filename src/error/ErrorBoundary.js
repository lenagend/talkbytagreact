import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Error from "../components/page/Error";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        // 에러가 발생한 경우 에러를 기록하거나 보고할 수 있습니다.
        console.log('Error occurred:', error, info);
        this.setState({ hasError: true });
    }

    static getDerivedStateFromError(error) {
        // 에러가 발생한 경우 state를 업데이트하여 다음 렌더링에서 대체 UI를 표시합니다.
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <ErrorRedirect />
        }

        return this.props.children;
    }
}

function ErrorRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        window.location.href="/error";
    }, [navigate]);

    return null;
}

export default ErrorBoundary;
