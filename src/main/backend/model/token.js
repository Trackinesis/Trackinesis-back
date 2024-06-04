const { DataTypes } = require('sequelize');
const db = require('../utils/database');

const Token = db.define('token', {
    token: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true
});

/*User.associate = model => {
    User.belongsTo(model.signup, { foreignKey: 'userId' });
}*/

module.exports = Token;