import React from 'react';

import { Image } from '../Image';
import Button from 'ui/Button';
import ChevronIcon from 'ui/Icon/Chevron';

import style from './style.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

const SLIDES_GAP = 16;

/**
 * Gallery component (image slider with controls)
 *
 * @param {string} name - Name of element (for 'key' property)
 * @param {Array} images - Array of images URI
 */
const Gallery = ({ name, images = [], width = 320, height = 320 }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const sliderRef = React.useRef();

    React.useEffect(() => {
        const { current: slider } = sliderRef;

        slider?.scrollTo({
            left: currentIndex * (slider?.clientWidth + SLIDES_GAP),
            behavior: 'smooth',
        });
    });

    const handlePrevSlide = () => {
        if (currentIndex === 0) return;
        setCurrentIndex(currentIndex - 1);
    };

    const handleNextSlide = () => {
        if (currentIndex === images.length - 1) return;
        setCurrentIndex(currentIndex + 1);
    };

    return (
        <>
            <div className={cx('base')}>
                <Button
                    layout="control"
                    className={cx('control', 'control--prev')}
                    content={<ChevronIcon thin />}
                    onClick={handlePrevSlide}
                    aria-label="Previous image"
                />

                <div ref={sliderRef} className={cx('slider')}>
                    {images.map((url, index) => (
                        <Image
                            src={url}
                            key={`${name}-${index}`}
                            load={index <= currentIndex + 1}
                            alt={`Gallery photo #${index + 1}`}
                            height={height}
                            width={width}
                        />
                    ))}
                </div>

                <Button
                    layout="control"
                    className={cx('control', 'control--next')}
                    content={<ChevronIcon thin />}
                    onClick={handleNextSlide}
                    aria-label="Next image"
                />
            </div>
        </>
    );
};

export default Gallery;
