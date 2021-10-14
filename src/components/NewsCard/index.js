import React from 'react';

import useApi from 'hooks/Api';
import useModal from 'hooks/Modal';

import { LazyImage } from '../Image';
import NewsModal from '../NewsModal';

import TimeStamp from 'ui/TimeStamp';
import Button from 'ui/Button';

import style from './style.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

/**
 * News Card component
 *
 * @param {object} entry - Article represented on card
 * @param {boolean} focus -
 */
const NewsCard = ({ entry, focus = false }) => {
    const cardRef = React.useRef();

    const [fullEntry, setFullEntry] = React.useState(null);
    const { get: getFullEntry } = useApi(`/news/${entry.id}`);

    const modal = useModal();

    //  Fetch full article on modal first open
    React.useEffect(async () => {
        if (fullEntry || !modal.isOpen) return;

        const response = await getFullEntry();
        setFullEntry(response);
    }, [modal.isOpen]);

    React.useEffect(() => {
        focus &&
            cardRef.current?.scrollIntoView({
                behavior: 'smooth',
            });
    }, [focus]);

    return (
        <div ref={cardRef} className={cx('base')}>
            <div className={cx('cover')} onClick={modal.open}>
                <LazyImage
                    className={cx('cover-image')}
                    src={entry.cover}
                    alt={entry.title}
                    height={343}
                    width={343}
                />
            </div>

            <div className={cx('content')}>
                <span className={cx('category')}>{entry.category}</span>
                <h3 className={cx('title')} onClick={modal.open}>
                    {entry.title}
                </h3>

                <p className={cx('annotation')}>{entry.annotation}</p>

                <TimeStamp className={cx('publication-date')} moment={entry.timestamp} />
            </div>

            <Button
                className={cx('trigger')}
                autoFocus={!modal.isOpen && focus}
                {...modal.control}
                aria-label="Open full article"
            />

            {fullEntry && (
                <NewsModal entry={fullEntry} {...modal.bind} />
            )}
        </div>
    );
};

export default NewsCard;
