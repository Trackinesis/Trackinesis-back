const { DataTypes } = require('sequelize');
const db = require('../util/database');
const Plan = require("./plan");
const Routine = require("./routine");

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

//PlanRoutine.belongsTo(Plan, { foreignKey: 'planId' });
//PlanRoutine.belongsTo(Routine, { foreignKey: 'routineId' });

module.exports = PlanRoutine;