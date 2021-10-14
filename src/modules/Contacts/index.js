import React from 'react';
import ReactMarkdown from 'react-markdown';
import style from './style.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

/**
 * Placeholder data
 */
const contactInfo = [
    {
        heading: 'Телефон',
        caption: '+7 495 123 45 67',
    },
    {
        heading: 'Адрес',
        caption:
            '109382, Москва, пр. Егорьевский, д.2а, стр.10 въезд на машине только с улицы Люблинская',
    },
    {
        heading: 'Почта',
        caption: '[Info@test.ru](mailto:info@test.ru)',
    },
];

/**
 *  Contacts Module
 */
const Contacts = () => (
    <>
        {contactInfo.map(item => (
            <div className={cx('item')} key={`contact-${item.name}`}>
                <h3 className={cx('heading')}>{item.heading}</h3>
                <div className={cx('caption')}>
                    <ReactMarkdown>{item.caption}</ReactMarkdown>
                </div>
            </div>
        ))}
    </>
);

export default Contacts;
