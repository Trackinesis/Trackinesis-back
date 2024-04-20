const { DataTypes } = require('sequelize');
const db = require('./index');
const Signup = require('./signup')
const PlanRoutine = require('./planRoutine')

const Plan = db.sequelize.define('plan', {
    planId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        references: {
            model: PlanRoutine,
            key: 'planId'
        }
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
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: Signup,
            key: 'userId'
        }
    }
});

Signup.hasMany(Plan, { foreignKey: 'userId' });

module.exports = Plan;