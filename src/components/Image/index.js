import React from 'react';

import placeHolder from 'assets/img/_placeholder.png';
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
