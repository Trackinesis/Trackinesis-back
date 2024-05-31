const express = require('express');
const router = express.Router();
const controller = require('../../controller/goal');

router.post('/create', controller.createGoal);
router.get('/all', controller.getAllGoals);
router.get('/:id', controller.getGoalById);
router.put('/:id', controller.updateGoal);

module.exports = router;