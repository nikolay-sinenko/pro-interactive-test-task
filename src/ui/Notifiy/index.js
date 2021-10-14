import React from 'react';

import style from './style.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

/**
 * Notification template component
 */
const Template = ({ heading, caption }) => (
    <div className={cx('base')}>
        <h4 className={cx('heading')}>{heading}</h4>
        <p className={cx('caption')}>{caption}</p>
    </div>
);

/**
 * Notification UI component
 */
const Notify = {
    Error: ({ error }) => <Template heading="Ошибка!" caption={error.message} />,
    NotFound: () => <Template heading="Упс!" caption="Мы ничего не нашли :(" />,
};

export default Notify;
