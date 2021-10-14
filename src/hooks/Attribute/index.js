import React from 'react';

/**
 * Hook to observe value changes of attribute
 * 
 * @param {function} onChange - Change event callback (required)
 * @param {string} attribute - Attribute name ('value' by default)
 * @param {object} ref - Forwarded ref
 * 
 * @example
 * const value = useAttribute({
 *      attribute: ... ,
 *      onChange: (value, target) => { ... },
 *      ref: forwardedRef
 * })
 * 
 * <progress {...value.bind} />
 */
const useAttribute = ({ onChange, attribute = 'value', ref = null }) => {
    const elementRef = ref ?? React.useRef();

    React.useEffect(() => {
        if (!onChange) return;

        const { current: element } = elementRef;

        const observer = new MutationObserver(([mutation]) => {
            const { target, attributeName } = mutation;
            onChange(target[attributeName], target);
        });

        observer.observe(element, {
            attributes: true,
            attributeFilter: [attribute],
        });

        return () => observer.disconnect();
    }, []);

    return {
        bind: { ref: elementRef },
    };
};

export default useAttribute;