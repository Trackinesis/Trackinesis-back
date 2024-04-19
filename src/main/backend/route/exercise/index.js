const express = require('express');
const router = express.Router();

router.get('/addexercise', (req, res) => {
    if (req.session.authorized) {
        res.send('Access granted');
    } else {
        res.send('Access denied');
    }
});


module.exports = router;