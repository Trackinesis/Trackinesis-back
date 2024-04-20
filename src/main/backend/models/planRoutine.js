const { DataTypes } = require('sequelize');
const db = require('./index');
const Plan = require('./plan');
const Routine = require('./routine');

const PlanRoutine = db.sequelize.define('planRoutine', {
    planRoutineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    planId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: Plan,
            key: 'planId'
        }
    },
    routineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: Routine,
            key: 'routineId'
        }
    }
});

Plan.hasMany(PlanRoutine, { foreignKey: 'planId' });
Routine.hasMany(PlanRoutine, { foreignKey: 'routineId' });

module.exports = PlanRoutine;