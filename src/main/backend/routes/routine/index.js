const express = require('express');
const router = express.Router();
const routineController = require('../../controller/routine');

router.post('/createroutine', routineController.createRoutine);

module.exports = router;