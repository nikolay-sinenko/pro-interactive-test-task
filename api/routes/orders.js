const express = require('express');
const router = express.Router();

router.post('/', express.json(), (req, res) => {
    res.json({ orderID: Date.now(), ...req.body });
});

module.exports = router;
