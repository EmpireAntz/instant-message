const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const User = require('./User.js');
const Chat = require('./chat.js');


class UserFriend extends Model {
}

UserFriend.init({
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
      key: 'ID',
    },
  },
  friendID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Chat,
      key: 'ID',
    },
  },
},
{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: false,
});

module.exports = UserFriend;