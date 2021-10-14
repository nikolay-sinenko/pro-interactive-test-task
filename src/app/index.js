import React from 'react';

import Header from 'modules/Header';
import style from './style.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

/**
 *  Application
 */
const App = () => (
        <header className={cx('header')}>
            <Header />
        </header>
);

export default App;
