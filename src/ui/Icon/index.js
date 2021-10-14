import React from 'react';

import style from './style.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

/**
 * Icon UI component
 *
 * @param {string} icon  - SVG Icon filename (without extension)
 * @param {number} size  - Icon size (width x height) in pixels (32 by default)
 * @param {string} className - External classes
 */
const Icon = ({ name, size = 32, className = null, ...props }) => {
    const styles = {
        '--size': `${size}px`,
        // '--icon': `url(/src/assets/icons/${name}.svg)`,
        '--icon': `url(${require.context('assets/icons')(`./${name}.svg`).default})`
    };

    return <span className={cx('base', className)} style={styles} {...props} />;
};

export default Icon;
