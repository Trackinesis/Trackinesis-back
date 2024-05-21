const {DataTypes} = require('sequelize');
const db = require('../util/database');
const User = require("./user");
const Plan = require("./plan");

const Signup = db.define('signup', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    }
}, {
    freezeTableName: true
});

/*Signup.associate = model => {
    Signup.hasOne(model.user, { foreignKey: 'userId' });
    Signup.hasMany(model.plan, { foreignKey: 'userId' });
};*/

module.exports = Signup;