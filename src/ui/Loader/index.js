import React from 'react';

import style from './style.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

/**
 * Loader UI component
 * 
 * @param {string} className - External classes
 */
const Loader = ({ className, ...props }) => (
    <div className={cx('base', className)} {...props}>
        Загрузка...
    </div>
);

export default Loader;
