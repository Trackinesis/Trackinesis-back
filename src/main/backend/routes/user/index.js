const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user');

router.get('/:username', (req, res) => {
    if (req.session.user && req.session.user.username) {
        res.json({ username: req.session.user.username });
    } else {
        res.status(404).json({ error: 'Username not found in session' });
    }
});

router.get('/:userId', userController.getUsername);

module.exports = router;