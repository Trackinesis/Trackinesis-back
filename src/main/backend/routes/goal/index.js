const express = require('express');
const controller = require('../../controller/goal');

const router = express.Router();

router.post('/create', controller.createGoal);
router.get('/all', controller.getAllGoals);
router.get('/:id', controller.getGoalById);
router.put('/:id', controller.updateGoal);
router.delete('/:id', controller.deleteGoal);

module.exports = router;