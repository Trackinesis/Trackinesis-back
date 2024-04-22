const express = require('express');
const router = express.Router();
const planController = require('../../controller/plan');

router.post('/', planController.createPlan);

module.exports = router;
