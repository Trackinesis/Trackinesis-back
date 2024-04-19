const controller = {}

controller.user = require('./user');
controller.login = require('./login')
controller.signup = require('./signup')
controller.exercise = require('./exercise')

module.exports = controller;