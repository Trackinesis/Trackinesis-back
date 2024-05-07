const {DataType } = require('sequelize');
const sequelize = require('../db');

const Goal = sequelize.define('Goal', {
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