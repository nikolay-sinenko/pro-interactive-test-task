import React from 'react';

import useAttribute from 'hooks/Attribute';

import style from './style.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

/**
 * Indicator with progress bar
 *
 * @param {number} value - Number from 0 to max property (0 by default)
 * @param {number} max - Upper bound for value property (1 by default)
 */
const Progress = React.forwardRef((props, forwardedRef) => {
    const { value = 0, max = 1 } = props;

    const progressBarRef = React.useRef();

    //  Fill the progress bar through the cutom CSS property
    //  so the smooth transitions could be applied
    const drawProgress = (progress = value) => {
        const { current: bar } = progressBarRef;
        bar.style.setProperty('--progress', progress / max);
    };

    //  Draw initial progress
    React.useEffect(drawProgress, []);

    //  Watch for progress element value changed to redraw progress
    //  Forwarding ref so the value could be changed externally
    const valueObserver = useAttribute({
        onChange: drawProgress,
        ref: forwardedRef,
    });

    return (
        <div className={cx('base')}>
            <progress className={cx('hidden')} {...valueObserver.bind} {...props} />
            <div ref={progressBarRef} className={cx('progress-bar')} />
        </div>
    );
});

export default Progress;
