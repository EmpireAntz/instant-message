const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const User = require('./User');

class Message extends Model {
}

Message.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  userName: DataTypes.STRING,
  chatId: {
    type: DataTypes.STRING,
    allowNull: false,
    },
  messageText: {
    type: DataTypes.STRING(2000),
    allowNull: false,
  },
},
{
  sequelize,
  timestamps: true,
  freezeTableName: true,
  underscored: false,
  modelName: 'messages'
});

module.exports = Message;