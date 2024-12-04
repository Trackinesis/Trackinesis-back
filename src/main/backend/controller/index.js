const controller = {}

controller.login = require('./login');
controller.logout = require('./logout');
controller.signup = require('./signup');
controller.user = require('./user');
controller.goal = require('./goal');
controller.friend = require('./friend');
controller.plan = require('./plan');
controller.planRoutine = require('./planRoutine');
controller.routine = require('./routine')
controller.routineExercise = require('./routineExercise')
controller.exercise = require('./exercise');
controller.token = require('./token')
controller.userHistory = require('./userHistory')

module.exports = controller;