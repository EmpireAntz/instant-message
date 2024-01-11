const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const User = require('./User.js');
const Chat = require('./chat.js');


class UserFriend extends Model {
}

UserFriend.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
},
{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: false,
  modelName:"friendships"
});

module.exports = UserFriend;