import React from 'react';

const SCROLL_LOCK_CLASS = 'scroll-lock';

/**
 * Hook to manage modal window state
 *
 * @param {function} onOpen  - Handle modal close
 * @param {function} onClose - Handle modal open
 * @param {boolean}  initialOpen - Initial value for modal open state (false by default)
 *
 * @example
 * // Init
 * const modal = useModal();
 * ..
 * // Setup control
 * <button {...modal.control} .. />
 * // Setup modal
 * <Modal {...modal.bind} .. />
 */
const useModal = ({ onOpen = null, onClose = null, initialOpen = false } = {}) => {
    const controlRef = React.useRef();
    const [isOpen, setIsOpen] = React.useState(initialOpen);

    const handleOpen = React.useCallback(() => {
        //  Lock document scroll
        document.body.classList.add(SCROLL_LOCK_CLASS);

        onOpen && onOpen();
        setIsOpen(true);
    }, []);

    const handleClose = React.useCallback(() => {
        //  Unlock scroll
        document.body.classList.remove(SCROLL_LOCK_CLASS);

        //  Return focus to control element
        controlRef.current?.focus();

        onClose && onClose();
        setIsOpen(false);
    }, []);

    return {
        isOpen,
        open: handleOpen,
        close: handleClose,

        //  Binding object for modal component
        bind: {
            isOpen,
            onClose: handleClose,
        },
        //  Binding object for control element
        control: {
            ref: controlRef,
            onClick: handleOpen,
        },
    };
};

export default useModal;
