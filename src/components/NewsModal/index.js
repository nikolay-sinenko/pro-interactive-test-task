import React from 'react';
import ReactMarkdown from 'react-markdown';

import Gallery from '../Gallery';
import useFocusTrap from 'hooks/FocusTrap';
import Modal from 'ui/Modal';
import TimeStamp from 'ui/TimeStamp';
import Button from 'ui/Button';
import CloseIcon from 'ui/Icon/Close';

import style from './style.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

/**
 * Modal window for detailed news article
 *
 * @param {object} entry - Full news article
 */
const NewsModal = ({ entry, ...props }) => {
    const focusTrap = useFocusTrap();

    return (
        <Modal className={cx('base')} onBackdropClick={props.onClose} {...props}>
            {focusTrap.bounds.upper}

            <Button
                layout="control"
                className={cx('close-button')}
                content={<CloseIcon />}
                onClick={props.onClose}
                {...focusTrap.firstElement}
                aria-label="Close modal"
            />

            <Gallery name={`news-${entry.id}`} images={entry.images} />

            <div className={cx('wrapper')}>
                <div className={cx('heading')}>
                    <span className={cx('category')}>{entry.category}</span>
                    <TimeStamp moment={entry.timestamp} />
                </div>

                <h3 className={cx('title')}>{entry.title}</h3>
                <div className={cx('content')}>
                    <ReactMarkdown className={cx('text')}>{entry.text}</ReactMarkdown>
                </div>
            </div>

            {focusTrap.bounds.lower}
        </Modal>
    );
};

export default NewsModal;
