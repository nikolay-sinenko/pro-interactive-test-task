import React from 'react';

/**
 * Hook for input two-way binding
 *
 * @param {string} initialValue - Input initial value (null by default)
 *
 * @example
 *
 * const input = useInput();
 *
 * <input {...input} />
 */
const useInput = (initialValue = null) => {
    const [value, setValue] = React.useState(initialValue);

    const handleChange = React.useCallback(({ target }) => {
        setValue(target.value);
    }, []);

    //  Binding object
    return { value, onChange: handleChange };
};

export default useInput;
