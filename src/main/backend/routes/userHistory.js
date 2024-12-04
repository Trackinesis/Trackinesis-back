const express = require('express');
const router = express.Router();
const userHistoryController = require('../controller/userHistory');

router.get('/userHistory/graph/:userId', userHistoryController.getUserHistoryData);

module.exports = router;