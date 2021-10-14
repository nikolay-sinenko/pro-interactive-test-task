import React from 'react';
import ReactMarkdown from 'react-markdown';

import { LazyImage } from 'components/Image';
import Icon from 'ui/Icon';

import mapImage from 'assets/img/contacts-map.webp';

import style from './style.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

/**
 * Placeholder data
 */
const contactInfo = [
    {
        name: 'phone',
        heading: 'Телефон',
        caption: '+7 495 123 45 67',
    },
    {
        name: 'address',
        heading: 'Адрес',
        caption:
            '109382, Москва, пр. Егорьевский, д.2а, стр.10 въезд на машине только с улицы Люблинская',
    },
    {
        name: 'email',
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
                <Icon name={item.name} />
                <h3 className={cx('heading')}>{item.heading}</h3>
                <div className={cx('caption')}>
                    <ReactMarkdown>{item.caption}</ReactMarkdown>
                </div>
            </div>
        ))}

        <LazyImage
            tabIndex={0}
            className={cx('map')}
            src={mapImage}
            alt="Карта"
            height={375}
            width={375}
        />
    </>
);

export default Contacts;
