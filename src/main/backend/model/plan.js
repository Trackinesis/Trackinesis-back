const { DataTypes } = require('sequelize');
const db = require('../util/database');
const Signup = require("./signup");
const PlanRoutine = require("./planRoutine");

const Plan = db.define('plan', {
    planId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    objective: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    freezeTableName: true
});

//Plan.belongsTo(Signup, { foreignKey: 'userId' });
//Plan.hasMany(PlanRoutine, { foreignKey: 'planId' });

module.exports = Plan;