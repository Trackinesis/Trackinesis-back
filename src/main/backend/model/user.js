const { DataTypes } = require('sequelize');
const db = require('../utils/database');
const Signup = require("./signup");

const User = db.define('user', {
    age: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true
    },
    maxBench: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    maxSquat: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    maxDeadlift: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    strenghtRatio: {
        type: DataTypes.FLOAT,
        allowNull: true,
    }
}, {
    freezeTableName: true
});

/*User.associate = model => {
    User.belongsTo(model.signup, { foreignKey: 'userId' });
}*/

module.exports = User;