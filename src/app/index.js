import React from 'react';

import Header from 'modules/Header';
import Contacts from 'modules/Contacts';
import Section from 'components/Section';

import style from './style.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

/**
 *  Application
 */
const App = () => (
    <>
        <header className={cx('header')}>
            <Header />
        </header>

        <footer className={cx('footer')}>
            <Section title="Контакты" preambula="Мы всегда доступны для вас">
                <Contacts />
            </Section>
        </footer>
    </>
);

export default App;
