const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const User = require('./User');
const Chat = require('./chat.js');

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
  chatId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'friendships',
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