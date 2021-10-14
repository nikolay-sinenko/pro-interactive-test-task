import React from 'react';

/**
 * Boundary component for focus catching
 *
 * @param {function} callback - Focus handler
 */
const Bound = React.forwardRef(({ callback }, forwardedRef) => (
    <span tabIndex={0} ref={forwardedRef} onFocus={callback} />
));

/**
 * Hook to tame focus betwen two bound elements.
 *
 * Implements part of modal dialog's keyboard interaction {@link https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal spec}
 *
 * @param {boolean} capture - Trap is enabled (true by default)
 * @returns Bindings object
 *
 * @example
 *
 * const focusTrap = useFocusTrap({ .. })
 *
 * //  Setup upper bound
 * {focusTrap.bounds.upper}
 * //  Setup first element
 * <button {...focusTrap.firstElement} .. />
 * ..  // Other stuff goes here
 * //  Setup last element
 * <button {...focusTrap.lastElement} .. />
 * //  Setup lower bound
 * {focusTrap.bounds.lower}
 */
const useFocusTrap = ({ capture = true } = {}) => {
    const upperBound = React.useRef();
    const lowerBound = React.useRef();
    const first = React.useRef();
    const last = React.useRef();

    //  Pick first element and setup focus if capture flag is true
    const pickFirstElement = React.useCallback(
        element => {
            capture && element?.focus();
            first.current = element;
        },
        [capture]
    );

    const setupFocus = (target, fallback) => {
        if (!capture) return;

        if (!target.current) {
            fallback.current?.focus();
            return;
        }
        target.current?.focus();
    };

    //  Handle focus trying to breakout through upper bound
    const handleUpperBoundFocus = React.useCallback(() => {
        //  Redirect focus on last element
        setupFocus(last, lowerBound);
    }, []);

    //  Handle focus trying to breakout through lower bound
    const handleLowerBoundFocus = React.useCallback(() => {
        //  Redirect focus on first element
        setupFocus(first, upperBound);
    }, []);

    return {
        //  Boundary traps
        bounds: {
            upper: <Bound ref={upperBound} callback={handleUpperBoundFocus} />,
            lower: <Bound ref={lowerBound} callback={handleLowerBoundFocus} />,
        },
        //  Eleements Bindings
        firstElement: { ref: pickFirstElement },
        lastElement: { ref: last },
    };
};

export default useFocusTrap;
