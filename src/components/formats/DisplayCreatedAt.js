// DisplayCreatedAt.js
import React from 'react';

const DisplayCreatedAt = ({ createdAt }) => {
    const date = new Date(createdAt);
    const now = new Date();

    if (date.toDateString() === now.toDateString()) {
        // 오늘 작성된 글의 경우 시간과 분만 표시
        return (
            <span>
        {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </span>
        );
    } else {
        // 그 외의 경우 'YY-MM-DD' 형식으로 표시
        return (
            <span>
        {date.toLocaleDateString("ko-KR", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
        })}
      </span>
        );
    }
};

export default DisplayCreatedAt;
