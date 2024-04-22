const { DataTypes } = require('sequelize');
const db = require('../util/database');
const Signup = require("./signup");

const User = db.define('user', {
    userInfoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
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
    }
}, {
    freezeTableName: true
});

/*User.associate = model => {
    User.belongsTo(model.signup, { foreignKey: 'userId' });
}*/

module.exports = User;