import React from 'react';

export const PriceContext = React.createContext();

export const rentTypes = new Map([
    [1, { label: '1 час', multiplier: 1 }],
    [2, { label: '2 часа', multiplier: 1.2 }],
    [3, { label: '3 часа', multiplier: 1.5 }],
    [5, { label: '5 часов', multiplier: 2 }],
    [48, { label: 'Выставка 2 дня', multiplier: 3 }],
    [72, { label: 'Выставка 3 дня', multiplier: 4.5 }],
]);

//  Actions names
const TOGGLE_OPTION = 'TOGGLE_OPTION';
const SELECT_NONE = 'SELECT_NONE';
const SELECT_ALL = 'SELECT_ALL';
const SET_RENT = 'SET_RENT';

//  Actions objects
export const actions = {
    SET_RENT: payload => ({ type: SET_RENT, payload }),
    TOGGLE_OPTION: payload => ({ type: TOGGLE_OPTION, payload }),
    SELECT_NONE: { type: SELECT_NONE },
    SELECT_ALL: { type: SELECT_ALL },
};

/**
 * Count price depending on rent type
 *
 * @param {number} price - Sum of initial product price and price of selected options
 * @param {number} type  - Rent type
 *
 * @returns {number} Total price
 */
const countPrice = (price, type) => price * rentTypes.get(type).multiplier;

/**
 * Create Price calculator reducer for product
 *
 * @param {object} product - Product to count total price
 * @returns {function} Reducer for price calculator state
 */
const createReducer = product => {
    const { price: startPrice, options } = product;

    //  Pre-calculate values for 'all options selected' case
    const allOptions = new Set(options.map(x => x.id));
    const allOptionsPrice = options.reduce((sum, { price }) => sum + price, 0);

    return (state, action) => {
        const { rentType } = state;

        switch (action.type) {
            //  Deselect all options
            case SELECT_NONE: {
                const totalPrice = countPrice(startPrice, rentType);

                return { ...state, selected: new Set(), selectedPrice: 0, totalPrice };
            }

            //  Select all options
            case SELECT_ALL: {
                const totalPrice = countPrice(startPrice + allOptionsPrice, rentType);

                return {
                    ...state,
                    selectedPrice: allOptionsPrice,
                    selected: allOptions,
                    totalPrice,
                };
            }

            //  Toggle option in selected options list
            case TOGGLE_OPTION: {
                const { payload: id } = action;

                const selected = new Set(state.selected);
                const isSelected = selected.has(id);
                const { price } = options.find(x => x.id === id);

                //  Change selected list
                isSelected ? selected.delete(id) : selected.add(id);

                //  Count new selected price
                const selectedPrice = state.selectedPrice + (isSelected ? -1 : 1) * price;

                //  Total price = (initial + new selected) * multiplier
                const totalPrice = countPrice(startPrice + selectedPrice, rentType);

                return { ...state, totalPrice, selectedPrice, selected };
            }

            //  Change rent type
            case SET_RENT: {
                const { payload: rentType } = action;
                const totalPrice = countPrice(startPrice + state.selectedPrice, rentType);

                return { ...state, rentType, totalPrice };
            }

            default:
                return state;
        }
    };
};

/**
 * Hook to manage price calculator state
 *
 * @param {object} product -Product to count total price
 * @returns {[ state: object, dispatch: function ]} State and it's actions dispatcher
 */
const usePriceCalculator = product => {
    const priceCalculator = React.useReducer(createReducer(product), {
        totalPrice: product.price,
        selected: new Set(),
        selectedPrice: 0,
        rentType: 1,
    });

    return priceCalculator;
};

export default usePriceCalculator;
