import React from 'react';

import style from './style.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

/**
 * Labeled Radio UI component
 *
 * @param {string} label    - Label text
 * @param {boolean} checked - Checked state
 */
const Radio = ({ label, checked, ...props }) => (
    <label className={cx('label', { 'label--checked': checked })}>
        <input type="radio" className={cx('input')} checked={checked} {...props} />
        <span>{label}</span>
    </label>
);

export default Radio;
