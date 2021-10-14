import React from 'react';

export const ESCAPE = 27;
export const ENTER = 13;

const modifiers = ['shift', 'ctrl', 'alt'];

/**
 * Hook to handle key press with modifiers (shift / ctrl / alt)
 *
 * @param {boolean} capture - Listen to event (true by default)
 * @param keys - List of key handlers preferencies
 * @returns Binding object
 *
 * @example
 * const keyHandler = useKeyHandler({
 *      [ESCAPE]: () => { ... },
 *      [ENTER]: {
 *          callback: () => { ... },
 *          shift: true,
 *          ctrl: true,
 *          alt: true
 *      }
 * });
 *
 * <div {...keyHandler} />
 */
const useKeyHandler = ({ capture = true, ...keys }) => {
    const handleKeyEvent = React.useCallback(
        event => {
            if (!capture) return;

            const { target, keyCode } = event;
            const handler = keys[keyCode];

            if (!handler) return;

            if (typeof handler === 'function') {
                handler({ target });
                return;
            }

            const { callback } = handler;

            const validModifiers = modifiers.every(
                mod => event[`${mod}Key`] === Boolean(handler[mod])
            );

            callback && validModifiers && callback({ target });
        },
        [capture]
    );

    return {
        onKeyDown: handleKeyEvent,
    };
};

export default useKeyHandler;
