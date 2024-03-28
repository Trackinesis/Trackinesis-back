const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('<h1>This is all the users!</h1>');
});

router.get('/:username', (req, res) => {
    res.send("<h1>This is Trackinesis's profile!</h1>");
})

module.exports = router;