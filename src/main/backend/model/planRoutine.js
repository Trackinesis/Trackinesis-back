const { DataTypes } = require('sequelize');
const db = require('../utils/database');

const PlanRoutine = db.define('planRoutine', {
    planRoutineId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
}, {
    freezeTableName: true
});


module.exports = PlanRoutine;