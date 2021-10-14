import React from 'react';
import Icon from 'ui/Icon';

import style from './style.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

/**
 * Placeholder data
 */
const benefits = [
    { icon: 'benefits-icon-1', caption: 'Безлимитная печать фото' },
    { icon: 'benefits-icon-2', caption: 'Фоторекизит в наличии' },
    { icon: 'benefits-icon-3', caption: 'Фотоотчёт в электронном виде' },
    { icon: 'benefits-icon-4', caption: 'Цены ниже рынка' },
];

/**
 *  Intro Module
 */
const Intro = () => (
    <div className={cx('base')}>

        <h1 className={cx('title')}>
            <span>Фото на </span>праздник
        </h1>

        <p className={cx('description')}>
            Lorem ipsum dolor sit amet, consectetur <a href="#">adipiscing elit</a>, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <div className={cx('benefits-list')}>
            {benefits.map((benefit, index) => (
                <div key={`service-benefits-${index}`}>
                    <Icon className={cx('benefit-icon')} name={benefit.icon} size={48} />
                    <p className={cx('benefit-caption')}>{benefit.caption}</p>
                </div>
            ))}
        </div>
    </div>
);

export default Intro;
