const express = require('express');
const router = express.Router();
const { user } = require('../../controller');

router.get('/', (req, res) => {
    if (req.session.authorized) {
        res.send('Access granted');
    } else {
        res.send('Access denied');
    }
});

router.post('/', user.login);

module.exports = router;