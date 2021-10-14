import React from 'react';

import Header from 'modules/Header';
import Faq from 'modules/Faq';
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

        <main>
            <Section title="FAQ" preambula="Почему выбирают нас?">
                <Faq />
            </Section>
        </main>

        <footer className={cx('footer')}>
            <Section title="Контакты" preambula="Мы всегда доступны для вас">
                <Contacts />
            </Section>
        </footer>
    </>
);

export default App;
