import React from 'react';

import useApi from 'hooks/Api';
import ProductCard from 'components/ProductCard';

import Dropdown from 'ui/Dropdown';
import Loader from 'ui/Loader';
import Notify from 'ui/Notifiy';

import style from './style.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

/*
    Sort Definitions
*/

const DEFAULT = 'DEFAULT';
const PRICE_ASC = 'PRICE_ASC';
const PRICE_DESC = 'PRICE_DESC';

const sortOptions = [
    [DEFAULT, { label: 'По умолчанию' }],
    [PRICE_ASC, { label: 'По возрастанию цен' }],
    [PRICE_DESC, { label: 'По убыванию цен' }],
];

/**
 * Products sort function
 *
 * @param {Array} source - Source array of products
 * @param {string} sortType - Type of sort (DEFAULT by default)
 * @returns {Array} Sorted products array
 */
const sort = (source, sortType = DEFAULT) => {
    if (!source.length) return source;

    switch (sortType) {
        case PRICE_ASC:
            return Array.from(source).sort((a, b) => a.price - b.price);
        case PRICE_DESC:
            return Array.from(source).sort((a, b) => b.price - a.price);
        default:
            return source;
    }
};

/**
 *  Products Module
 */
const Products = () => {
    const [state, setState] = React.useState({
        sortBy: DEFAULT,
        products: [],
        sorted: [],
    });

    const { get: getProducts, status } = useApi('/products');

    const fetchProducts = async () => {
        const response = await getProducts();

        if(!response) return;

        const products = [...state.products, ...response];

        setState(prev => ({
            ...prev,
            products,
            sorted: sort(products, prev.sortBy)
        }));
    };

    React.useEffect(fetchProducts, []);

    const handleSortChange = ({ target }) => {
        const sortBy = target.value;

        setState(prev => ({
            ...prev,
            sortBy,
            sorted: sort(prev.products, sortBy),
        }));
    };

    if (status.loading) return <Loader />;
    if (status.error) return <Notify.Error error={status.error} />;


    return (
        <>
            <div className={cx('sort')}>
                <span>Сортировка:</span>
                <Dropdown
                    name="sort-option"
                    className={cx('sort-by')}
                    entries={sortOptions}
                    onChange={handleSortChange}
                    value={state.sortBy}
                />
            </div>
            <div className={cx('cards')}>
                {state.sorted.length
                    ? state.sorted.map((product) => (
                          <ProductCard
                              key={`product-card-${product.id}`}
                              product={product}
                          />
                      ))
                    : status.finished && <Notify.NotFound />}
            </div>
        </>
    );
};

export default Products;
