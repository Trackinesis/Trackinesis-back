const {DataTypes} = require('sequelize');
const db = require('./index');
const User = require('./user');
const Plan = require('./plan')

const Signup = db.sequelize.define('signup', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        references: {
            model: User,
            key: 'userId'
        }
    },
    name: {
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
        unique: true
    }
});

User.belongsTo(Signup);
Plan.belongsTo(Signup);

module.exports = Signup;