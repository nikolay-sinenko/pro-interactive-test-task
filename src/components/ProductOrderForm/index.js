import React from 'react';
import InputMask from 'react-input-mask';

import { PriceContext } from 'hooks/PriceCalculator';
import useApi from 'hooks/Api';
import useInput from 'hooks/Input';

import Button from 'ui/Button';
import Dropdown from 'ui/Dropdown';

import contactTypes, * as contacts from './contactTypes';

import style from './style.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

/**
 *  Order Form
 *
 * @param {function} onSubmit - Submit event callback
 */
const OrderForm = React.forwardRef(({ onSubmit }, forwardedRef) => {
    const { product, state } = React.useContext(PriceContext);
    const { post: sendOrder } = useApi('/orders');

    const phone = useInput();
    const contactBy = useInput(contacts.PHONE);

    const handleOrderSubmit = async (event) => {
        event.preventDefault();

        const phoneRegex = /^\+7\s\([0-9]{3}\)\s[0-9]{3}(\s[0-9]{2}){2}$/;

        if (!phoneRegex.test(phone.value)) return;

        const payload = {
            productID: product.id,
            selectedOptions: Array.from(state.selected.keys()),
            rentType: state.rentType,
            phone: phone.value,
            contactBy: contactBy.value,
        };

        const response = await sendOrder(payload);
        alert('Success!\n' + JSON.stringify(response));
        onSubmit();
    };

    return (
        <form onSubmit={handleOrderSubmit}>
            <div className={cx('base')}>
                <InputMask
                    type="tel"
                    className={cx('phone')}
                    mask={'+7 (999) 999 99 99'}
                    placeholder={'+7 (000) 000 00 00'}
                    defaultValue={phone.value}
                    onChange={phone.onChange}
                    maskChar={'_'}
                />

                <Dropdown
                    name={'contact-by'}
                    entries={contactTypes}
                    layout="solid"
                    {...contactBy}
                />
            </div>

            <Button
                type="submit"
                ref={forwardedRef}
                className={cx('submit')}
                content={'Отправить заявку'}
                layout="ui-solid"
            />
        </form>
    );
});

export default OrderForm;
