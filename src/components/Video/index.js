import React from 'react';
const YouTube = React.lazy(() => import('react-youtube'));

import { LazyImage } from 'components/Image';

import useFocusTrap from 'hooks/FocusTrap';
import useModal from 'hooks/Modal';
import Modal from 'ui/Modal';

import Loader from 'ui/Loader';
import Button from 'ui/Button';
import Icon from 'ui/Icon';
import CloseIcon from 'ui/Icon/Close';

import style from './style.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

/**
 * YouTube Video component
 *
 * @param {string} id - ID of Youtube video
 * @param {object} coverImage - Image for video cever
 * @param {string} className  - External classes
 */
const Video = ({ id, coverImage, className }) => {
    const playerRef = React.useRef();
    const [loaded, setLoaded] = React.useState(false);

    const handleVideoReady = ({ target }) => {
        //  Save reference on player when it's ready
        playerRef.current = target;
        setLoaded(true);
    };

    const handleCloseModal = () => {
        playerRef.current?.pauseVideo();
    };

    const modal = useModal({
        onClose: handleCloseModal,
    });

    const focusTrap = useFocusTrap({
        capture: modal.isOpen,
    });

    return (
        <>
            <div className={cx('cover', className)} onClick={modal.open}>
                <LazyImage className={cx('cover-image')} {...coverImage} />

                <Button
                    className={cx('play-button')}
                    content={<Icon name="play" size={34} />}
                    aria-label="Open video"
                    {...modal.control}
                />
            </div>

            <Modal
                className={cx('modal')}
                onBackdropClick={modal.close}
                keepMounted={loaded}
                {...modal.bind}
            >
                {focusTrap.bounds.upper}

                <Button
                    layout="control"
                    aria-label="Close video"
                    className={cx('modal-close')}
                    content={<CloseIcon />}
                    onClick={modal.close}
                    {...focusTrap.firstElement}
                />

                <React.Suspense fallback={<Loader className={cx('loader')} />}>
                    <YouTube
                        videoId={id}
                        opts={{ width: '320', height: '240' }}
                        onReady={handleVideoReady}
                    />
                    {!loaded && <Loader className={cx('loader')} />}
                </React.Suspense>

                {focusTrap.bounds.lower}
            </Modal>
        </>
    );
};

export default Video;
