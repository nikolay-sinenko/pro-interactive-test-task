import React from 'react';

const ChevronIcon = ({ size = 32, thin = false, ...props }) => {
    return (
        <svg viewBox="0 0 16 16" width={size} height={size} {...props}>
            <path
                fill="none"
                stroke="currentColor"
                strokeWidth={thin ? 1 : 2}
                strokeLinejoin="round"
                strokeLinecap="round"
                d="M13 6l-5 5-5-5"
            />
        </svg>
    );
};

export default ChevronIcon;
