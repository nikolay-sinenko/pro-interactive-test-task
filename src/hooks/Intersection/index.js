import React from 'react';

/**
 * Custom hook-wrapper over IntersectionObserver
 *
 * @param {function} callback - Function called on intersection event
 * @param {boolean} once - Handle intersection only one time (false by default)
 *
 * @example
 * const observer = useIntersection({
 *      callback: () => { ... },
 *      root: elementRef.current,
 *      once: true,
 *      threshold: 0.05,
 *      rootMargin: '15% 25%'
 * })
 *
 * <image {...observer.bind} />
 */
const useIntersection = ({ callback, once = false, ...options } = {}) => {
    //  Merging default preferences with external
    const preferences = {
        rootMargin: '30%',
        threshold: 0.01,
        root: null,
        ...options,
    };

    const observer = React.useRef(
        React.useMemo(() =>
            new IntersectionObserver(([entry]) => {
                const { intersectionRatio, isIntersecting } = entry;

                if (!intersectionRatio && !isIntersecting) return;

                const {
                    intersectionRect: { x, y },
                    target,
                } = entry;

                const eventData = {
                    target,
                    isIntersecting,
                    intersectionRatio,
                    direction: {
                        x: Math.sign(x),
                        y: Math.sign(y),
                    },
                };

                callback(eventData);

                if (once) {
                    unsubscribe(target);
                    clear();
                }
            }, preferences),
            []
        )
    );

    const subscribe = element => {
        element && observer.current?.observe(element);
    };

    const unsubscribe = element => {
        element && observer.current?.unobserve(element);
    };

    const clear = () => {
        observer.current?.disconnect();
        observer.current = null;
    };

    //  Clear IO on unmount life-cycle stage
    React.useEffect(() => clear, []);

    return {
        subscribe,
        unsubscribe,
        clear,
        bind: {
            ref: subscribe,
        },
    };
};

export default useIntersection;
