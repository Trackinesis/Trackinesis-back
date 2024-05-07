const {DataType } = require('sequelize');
const db = require('../util/database');

const Goal = db.define('Goal', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    weightGoal: {
        type: DataType.INTEGER,
        allowNull: false
    },
    timesPerWeek: {
        type: DataType.INTEGER,
        allowNull: false
    },


});

module.exports = Goal;