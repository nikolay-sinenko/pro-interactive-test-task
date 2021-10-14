import React from 'react';

import { LazyImage } from '../Image';

import Checkbox from 'ui/Checkbox';

import style from './style.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

/**
 * Product additional option view component
 *
 * @param {object} option - Option object
 */
const Option = ({ option, ...props }) => (
    <div className={cx('base')}>
        <LazyImage
            className={cx('thumbnail')}
            src={option.thumbnail}
            alt={option.title}
        />

        <div className={cx('description')}>
            <p className={cx('title')}>{option.title}</p>
            <span className={cx('price')}>от {option.price} ₽</span>
        </div>

        <Checkbox label={`Select opntion #${option.id}`} {...props} />
    </div>
);

export default Option;
