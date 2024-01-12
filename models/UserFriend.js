const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');



class UserFriend extends Model {
}

UserFriend.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  friendshipId: {
    type: DataTypes.STRING, // or any other appropriate data type
    allowNull: false,
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