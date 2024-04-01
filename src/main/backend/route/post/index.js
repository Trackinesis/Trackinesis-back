const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.cookies);
    res.send('This is all the users!');
});

router.get('/userpage', (req, res) => {
    console.log(req.cookies);
    res.send("This is Trackinesis's profile!");
});

module.exports = router;