const express = require('express');
const router = express.Router();
const signupController = require('../../controller/signup');

router.post('/signup', signupController.createUser);

module.exports = router;
