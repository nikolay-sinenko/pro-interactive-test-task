import React from 'react';

import style from './style.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

/**
 *  Header Module
 */
const Header = () => (
    <div className={cx('base')}>
        <a href="#" aria-label="Logo">
            <div className={cx('logo')} />
        </a>
    </div>
);

export default Header;
