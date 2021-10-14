import React from 'react';

import useApi from 'hooks/Api';
import NewsCard from 'components/NewsCard';
import Button from 'ui/Button';
import Loader from 'ui/Loader';
import Notify from 'ui/Notifiy';

import style from './style.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

/**
 *  News Module
 */
const News = () => {
    const [state, setState] = React.useState({
        news: [],
        focusOn: 0,
        next: 1,
    });

    const { get: getNews, status } = useApi('/news');

    const fetchNews = async () => {
        if (!state.next) return;

        const response = await getNews({ start: state.next, offset: 3 });

        if (!response) return;

        setState(prev => ({
            news: [...prev.news, ...response.news],
            focusOn: state.next - 1,
            next: response.next,
        }));
    };

    React.useEffect(fetchNews, []);

    if (status.error) return <Notify.Error {...status} />;
    if (status.finished && !state.news.length) return <Notify.NotFound />;
    

    return (
        <div className={cx('base')}>
            {state.news.map((entry, index) => (
                <NewsCard
                    key={`news-card-${entry.id}`}
                    focus={state.focusOn && state.focusOn === index}
                    entry={entry}
                />
            ))}

            {status.loading && <Loader />}

            {Boolean(state.next) && (
                <Button
                    layout="ui-outline"
                    content={'Показать ещё'}
                    onClick={fetchNews}
                />
            )}
        </div>
    );
};

export default News;
