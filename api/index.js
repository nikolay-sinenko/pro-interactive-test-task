const { resolve } = require('path');

const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();

//  Setup CORS preferences
app.use(
    cors({
        origin: '*',
    })
);

//  Serve files from production bundle
app.use(express.static(resolve(__dirname, '../dist')));

app.get('/', (_, res) => {
    res.redirect('/index.html');
});

//  Apply routes
app.use('/news', require('./routes/news'));
app.use('/products', require('./routes/products'));
app.use('/orders', require('./routes/orders'));

//  Start API-server
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});
