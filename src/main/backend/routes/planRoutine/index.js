const express = require('express');
const router = express.Router();
const planRoutineController = require('../../controller/planRoutine');

router.post('/', planRoutineController.createPlanRoutine);

module.exports = router;