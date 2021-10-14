import React from 'react';

import style from './style.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

/**
 * Section Layout component
 *
 * @param {string} title     - Heading of section
 * @param {string} preambula - Short descriptive text
 * @param {string} className - External classes
 */
const Section = ({ title, preambula, className, children }) => (
    <section className={cx('base', className)}>
        {preambula && <span className={cx('preambula')}>{preambula}</span>}
        {title && <h2 className={cx('title')}>{title}</h2>}
        {children}
    </section>
);

export default Section;
