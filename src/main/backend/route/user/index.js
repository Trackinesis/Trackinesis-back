const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('This is all the posts!');
});

router.get('/userpage', (req, res) => {
    res.send("This is the most popular post!");
});

module.exports = router;