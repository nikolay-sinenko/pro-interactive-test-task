import React from 'react';

import style from './style.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

/**
 * Button UI component
 *
 * @param {object} content   - Icon or text inside of button
 * @param {string} layout    - Button view preset
 * @param {string} className - External classes
 */
const Button = React.forwardRef(
    (
        { content, layout = null, autoFocus = false, className = null, ...props },
        forwardedRef
    ) => {
        const buttonRef = forwardedRef ?? React.useRef();

        const classes = cx({
            base: true,
            [`base--${layout}`]: Boolean(layout),
            [className]: Boolean(className),
        });

        React.useEffect(() => {
            autoFocus && buttonRef.current?.focus();
        }, [autoFocus]);

        return (
            <button ref={buttonRef} className={classes} {...props}>
                {content}
            </button>
        );
    }
);

export default Button;
