const express = require('express');
const router = express.Router();
const tokenController = require('../../controller/token');

router.post('/create', tokenController.create);

module.exports = router;