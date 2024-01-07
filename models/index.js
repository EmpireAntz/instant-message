const User = require('./User');
const UserFriends = require('./userFriends'); // Import the UserFriends model

// Set up the relationships
User.belongsToMany(User, {
  as: 'Friends',
  through: UserFriends,
  foreignKey: 'userId',
  otherKey: 'friendId'
});

// Export the models
module.exports = { User, UserFriends };