import React from 'react';

import useIntersection from 'hooks/Intersection';
import placeHolder from 'assets/img/_placeholder.png';

/**
 * Image that loads only if 'load' flag is set
 *
 * @param {string}  src  - URI of image
 * @param {boolean} load - Flag of loading (false by default)
 */
export const Image = React.memo(
    React.forwardRef(({ src, load = false, ...props }, forwardedRef) => {
        const imageRef = forwardedRef ?? React.useRef();

        React.useEffect(() => {
            const { current: image } = imageRef;

            //  Using 'includes' method because 'src' prop
            //  automatically adds host address under the hood
            if (!load || image.src.includes(src)) return;

            image.src = src;
        }, [load]);

        return <img ref={imageRef} src={placeHolder} {...props} />;
    }),
    //  Re-render only if load-flag changed from false to true
    (last, current) =>
        last.src === current.src &&
        (last.load === current.load || last.load || !current.load)
);

/**
 * Image that loads only when got intersected by viewport or specified object (watcher)
 *
 * @param {string} src - URI of picture
 * @param {object} watcher - IntersectionObserver root-element (null by default)
 */
export const LazyImage = ({ src, watcher = null, ...props }) => {
    const handleIntersection = ({ target }) => (target.src = src);

    const observer = useIntersection({
        callback: handleIntersection,
        root: watcher,
        once: true,
    });

    return <img src={placeHolder} {...observer.bind} {...props} />;
};
