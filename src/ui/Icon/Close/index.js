import React from 'react';

const CloseIcon = ({ size = 32, ...props }) => {
    return (
        <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" {...props}>
            <path d="M8.72 7.28L7.28 8.72 14.56 16l-7.28 7.28 1.44 1.44L16 17.44l7.28 7.28 1.44-1.44L17.44 16l7.28-7.28-1.44-1.44L16 14.56 8.72 7.28z" />
        </svg>
    );
};

export default CloseIcon;
