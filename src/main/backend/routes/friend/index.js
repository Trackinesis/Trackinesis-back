const express = require('express');
const router = express.Router();
const friendController = require('../../controller/friend');

router.post('/createfriend', friendController.createFriend);

module.exports = router;