import React from 'react';
import { createPortal } from 'react-dom';

import useKeyHandler, { ESCAPE } from 'hooks/KeyHandler';

import style from './style.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

/**
 * Modal UI component
 *
 * @param {function} onClose - Handler for modal close event
 * @param {boolean}  isOpen  - Show modal window (false by default)
 * @param {boolean}  keepMounted     - Keep modal window mounted into DOM-tree (false by default)
 * @param {function} onBackdropClick - Handler for click on backdrop
 * @param {string}   backdropClass   - External classes for backdrop element
 */
const Modal = ({
    children,
    onClose,
    isOpen = false,
    keepMounted = false,
    onBackdropClick = null,
    backdropClass = null,
    ...props
}) => {
    const classes = cx('overlay', { 'overlay--closed': !isOpen });

    const handleEscape = useKeyHandler({
        capture: isOpen,
        [ESCAPE]: onClose,
    });

    const handleBackdropClick = () => {
        onBackdropClick && onBackdropClick();
    };

    const layout = (
        <div className={classes} {...handleEscape}>
            <div {...props}>{children}</div>
            <div
                className={cx('backdrop', backdropClass)}
                onClick={handleBackdropClick}
            />
        </div>
    );
    
    //  If keepMounted is true, isOpen only switches
    //  display modifier class on overlay element
    return (keepMounted || isOpen) && createPortal(layout, document.body);
};

export default Modal;
