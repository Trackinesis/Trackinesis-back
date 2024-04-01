const controller = {}

controller.user = require('./user');
controller.login = require('./login')
controller.signup = require('./signup')

module.exports = controller;