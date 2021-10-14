import React from 'react';

import usePriceCalculator, {
    PriceContext,
    rentTypes,
    actions,
} from 'hooks/PriceCalculator';

import Gallery from '../Gallery';

import Button from 'ui/Button';
import Radio from 'ui/Radio';

import style from './style.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

/**
 * Product Card component
 *
 * @param {object} product - Product represented on card
 */
const ProductCard = ({ product }) => {
    const [state, dispatch] = usePriceCalculator(product);
    const handleRentDurationChange = ({ target }) => {
        dispatch(actions.SET_RENT(Number(target.value)));
    };

    const { x, y, z } = product.sizes;
    const productSizes = (
        <span>
            {x}м x {y}м x {z}м
        </span>
    );

    return (
        <div className={cx('base')}>
            <Gallery
                name={`product-${product.id}`}
                images={product.images}
                height={240}
            />

            <h3 className={cx('title')}>{product.title}</h3>
            <p className={cx('sizes')}>Размер: {productSizes}</p>

            <span className={cx('rent-heading')}>Укажите время аренды</span>
            <div className={cx('rent')}>
                {Array.from(rentTypes.entries()).map(([key, item]) => (
                    <Radio
                        key={`rent-type-radio-${product.id}-${key}`}
                        name={`rent-type-${product.id}`}
                        onChange={handleRentDurationChange}
                        checked={key === state.rentType}
                        label={item.label}
                        value={key}
                    />
                ))}
            </div>

            <hr className={cx('separator')} />

            <div className={cx('summary')}>
                <span className={cx('price')}>{state.totalPrice} ₽</span>

                <Button
                    layout="ui-solid"
                    content={'Оставить заявку'}
                />
            </div>

        </div>
    );
};

export default ProductCard;
