import React from 'react';

import { PriceContext, rentTypes, actions } from 'hooks/PriceCalculator';

import useFocusTrap from 'hooks/FocusTrap';
import Modal from 'ui/Modal';
import Dropdown from 'ui/Dropdown';
import Button from 'ui/Button';
import CloseIcon from 'ui/Icon/Close';
import OrderForm from '../ProductOrderForm';

import style from './style.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

/**
 * Modal window for order confirmation
 */
const ProductModal = props => {
    const { product, state, dispatch } = React.useContext(PriceContext);

    const focusTrap = useFocusTrap();
    
    const handleRentTypeChange = ({ target }) => {
        dispatch(actions.SET_RENT(Number(target.value)));
    };
    
    const { x, y, z } = product.sizes;
    const productSizes = (
        <span>
            {x}м x {y}м x {z}м
        </span>
    );

    const selectedOptionsTable = (
        <div className={cx('table')}>
            {product.options
                .filter(x => state.selected.has(x.id))
                .map(option => (
                    <div className={cx('row')} key={`selected-option-${option.id}`}>
                        <span>{option.title}</span>
                        <span className={cx('price')}>{option.price} ₽</span>
                    </div>
                ))}
        </div>
    );

    return (
        <Modal className={cx('base')} backdropClass={cx('backdrop')} {...props}>
            {focusTrap.bounds.upper}

            <div className={cx('heading')}>
                <h2 className={cx('title')}>Ваша заявка</h2>

                <Button
                    className={cx('close-button')}
                    content={<CloseIcon color="secondary" />}
                    {...focusTrap.firstElement}
                    onClick={props.onClose}
                    aria-label="Close modal"
                />
            </div>

            <div className={cx('row', 'row--first')}>
                <div>
                    <h3>{product.title}</h3>
                    <p className={cx('sizes')}>Размер: {productSizes}</p>
                </div>

                <span className={cx('price')}>{product.price} ₽</span>
            </div>

            <Dropdown
                name="rent-type-select"
                className={cx('rent-select')}
                entries={Array.from(rentTypes.entries())}
                onChange={handleRentTypeChange}
                value={state.rentType}
                layout="outline"
                shortLabels
            />

            {state.selected.size > 0 && selectedOptionsTable}

            <hr className={cx('separator')} />

            <div className={cx('summary')}>
                <span className={cx('summary-label')}>Итого:</span>
                <span className={cx('summary-price')}>{state.totalPrice} ₽</span>
            </div>

            <OrderForm onSubmit={props.onClose} {...focusTrap.lastElement} />

            {focusTrap.bounds.lower}
        </Modal>
    );
};

export default ProductModal;
