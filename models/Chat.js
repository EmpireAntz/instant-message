const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const User = require('./User.js');


class Chat extends Model {
}

Chat.init({
  ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userOneID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  userTwoID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
},
{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: false,
});

module.exports = Chat;