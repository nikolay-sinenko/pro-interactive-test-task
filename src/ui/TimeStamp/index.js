import React from 'react';

import style from './style.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

/**
 * Timestamp representation component (localized)
 *
 * @param {number} moment - Timestamp in milliseconds
 */
const TimeStamp = ({ moment, className, ...props }) => (
    <span className={cx('base', className)} {...props}>
        {new Date(moment).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })}
    </span>
);

export default TimeStamp;
