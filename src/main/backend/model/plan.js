const { DataTypes } = require('sequelize');
const db = require('../utils/database');
const Signup = require("./signup");
const PlanRoutine = require("./planRoutine");

const Plan = db.define('plan', {
    planId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    objective: {
        type: DataTypes.STRING,
        allowNull: true
    },
    startDate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endDate: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});

/*Plan.associate = model => {
    Plan.belongsTo(model.signup, { foreignKey: 'userId' });
    Plan.hasMany(model.planRoutine, { foreignKey: 'planId' });
}*/

module.exports = Plan;