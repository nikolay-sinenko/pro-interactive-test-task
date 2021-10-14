import React from 'react';

import ChevronIcon from '../Icon/Chevron';

import style from './style.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

/**
 * Customized Select UI component
 *
 * @param {string} name - Name of element (for 'key' property)
 * @param {Array} entries - List of options
 * @param {tring} layout - Dropdown display type
 * @param {boolean} shortLabels - Should component display short labels (false by default)
 * @param {string} className - External classes
 */
const Dropdown = ({
    name,
    entries,
    layout = null,
    shortLabels = false,
    className = null,
    ...props
}) => {
    const classes = cx({
        base: true,
        [`base--${layout}`]: Boolean(layout),
        [className]: Boolean(className),
    });

    return (
        <div className={classes}>
            <select className={cx('select')} {...props}>
                {entries.map(([key, item]) => (
                    <option key={`${name}-${key}`} value={key}>
                        {shortLabels
                            ? item.label.split(' ').slice(-2).join(' ')
                            : item.label}
                    </option>
                ))}
            </select>

            <div className={cx('arrow')}>
                <ChevronIcon size={16} />
            </div>
        </div>
    );
};
export default Dropdown;
