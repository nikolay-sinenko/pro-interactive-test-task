import React from 'react';

import useKeyHandler, { ENTER } from 'hooks/KeyHandler';

import style from './style.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

/**
 * Checkbox UI component
 *
 * @param {number} size - Size of element (width x height) in pixels
 */
const Checkbox = ({ size = 15, label = null, ...props }) => {
    const styles = { '--size': `${size}px` };

    const handleEnter = useKeyHandler({
        [ENTER]: props.onChange,
    });

    return (
        <input
            type="checkbox"
            className={cx('input')}
            style={styles}
            aria-label={label}
            {...handleEnter}
            {...props}
        />
    );
};

export default Checkbox;
