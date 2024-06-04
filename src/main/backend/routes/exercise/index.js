const express = require('express');
const router = express.Router();
const exerciseController = require('../../controller/exercise');

router.post('/createexercise', exerciseController.createExercise);

module.exports = router;