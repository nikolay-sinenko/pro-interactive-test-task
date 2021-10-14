const express = require('express');
const router = express.Router();

router.post('/', express.json(), (req, res) => {
    res.json({ id: Date.now(), ...req.body });
});

module.exports = router;
