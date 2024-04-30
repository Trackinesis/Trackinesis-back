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

/*PlanRoutine.associate = model => {
    PlanRoutine.belongsTo(model.plan, { foreignKey: 'planId' });
    PlanRoutine.belongsTo(model.routine, { foreignKey: 'routineId' });
}*/

module.exports = PlanRoutine;