const express = require('express');
const router = express.Router();
const routineExerciseController = require('../../controller/routineExercise');

router.post('/', routineExerciseController.createRoutineExercise);

module.exports = router;