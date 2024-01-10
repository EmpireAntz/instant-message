const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const User = require('./User');
const Chat = require('./chat.js');

class Message extends Model {
}

Message.init({
  ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  chatID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Chat,
      key: 'id',
    },
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