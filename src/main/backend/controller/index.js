const controller = {}

controller.login = require('./login');
controller.logout = require('./logout');
controller.signup = require('./signup');
controller.user = require('./user');
controller.plan = require('./plan');
controller.planRoutine = require('./planRoutine');
controller.routine = require('./routine')
controller.routineExercise = require('./routineExercise')
controller.exercise = require('./exercise');

module.exports = controller;