const express = require('express');
const router = express.Router();

const PRODUCTS_START_PRICE = 10000;
const OPTIONS_START_PRICE = 1000;

class Product {
    constructor(id) {
        this.id = id;
        this.title = `Фотобудка с ширмой #${id}`;
        this.price = PRODUCTS_START_PRICE + id * 100;
        this.sizes = { x: 2, y: 1.5, z: 2 };
        this.images = Array.from({ length: 5 }, _ => '/assets/uploads/product-photo.webp');
        this.options = [];
    }
}

class Option {
    constructor(id) {
        this.id = id;
        this.productID = 0;
        this.title = `Разработка макета рамки #${id}`;
        this.price = OPTIONS_START_PRICE + id * 100;
        this.thumbnail = '/assets/uploads/option-thumbnail.webp';
    }
}

const products = Array.from({ length: 7 }, (_, productID) => {
    const product = new Product(++productID);
    product.options = Array.from({ length: 10 }, (_, optionID) => {
        const option = new Option(++optionID);
        option.productID = productID;
        return option;
    });
    return product;
});

const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

router.get('/', (req, res) => {
    const shuffledProducts = shuffle(Array.from(products));
    res.json(shuffledProducts);
});

module.exports = router;
