import React from 'react';

import usePriceCalculator, {
    PriceContext,
    rentTypes,
    actions,
} from 'hooks/PriceCalculator';

import Gallery from '../Gallery';
import Option from '../ProductOption';

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

    const handleOptionsChange = ({ target }) => {
        const { optionId: id } = target.dataset;
        dispatch(actions.TOGGLE_OPTION(Number(id)));
    };

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

            <div className={cx('options-heading')}>
                <span className={cx('tab')}>Доп. опции</span>

                {state.selected.size === product.options.length && (
                    <Button
                        onClick={dispatch.bind(null, actions.SELECT_NONE)}
                        content={'Снять всё'}
                        layout="plain"
                    />
                )}

                {state.selected.size !== product.options.length &&
                    state.selected.size > 0 && (
                        <Button
                            onClick={dispatch.bind(null, actions.SELECT_ALL)}
                            content={'Выбрать всё'}
                            layout="plain"
                        />
                    )}
            </div>

            <div tabIndex={-1} className={cx('options')}>
                {product.options.map(option => (
                    <Option
                        option={option}
                        key={`option-${product.id}-${option.id}`}
                        checked={state.selected.has(option.id)}
                        onChange={handleOptionsChange}
                        data-option-id={option.id}
                    />
                ))}
            </div>

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
