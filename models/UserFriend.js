const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const User = require('./User.js');
const Chat = require('./chat.js');


class UserFriend extends Model {
}

UserFriend.init({

},
{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: false,
  modelName:"friendships"
});

module.exports = UserFriend;