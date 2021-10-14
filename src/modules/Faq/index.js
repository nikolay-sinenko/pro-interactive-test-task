import React from 'react';

import ChevronIcon from 'ui/Icon/Chevron';

import style from './style.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

/*
    Generating data
*/
const loremIpsum = Array.from({ length: 10 }).reduce(
    result => result + 'Какой то текст для заголовка ',
    ''
);

const entries = Array.from({ length: 5 }, _ => ({
    question: 'Какой реквизит идет в комплекте?',
    answer: loremIpsum,
}));

/**
 *  FAQ Module
 */
const Faq = () =>
    entries.map((entry, index) => (
        <details className={cx('block')} key={`faq-entry-${index}`}>
            <summary className={cx('question')}>
                <span>{entry.question}</span>
                <ChevronIcon className={cx('arrow')} size={24} />
            </summary>

            <p className={cx('answer')}>{entry.answer}</p>
        </details>
    ));

export default Faq;
