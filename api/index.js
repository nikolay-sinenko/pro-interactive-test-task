const app = require('express')();
const cors = require('cors');

//  Setup CORS preferences
app.use(cors({ origin: '*' }));

//  Apply routes
app.use('/api/news', require('./routes/news'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

module.exports = app;
