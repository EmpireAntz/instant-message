const User = require('./User');
const UserFriend = require('./UserFriend');
const Message = require('./Message');

User.belongsToMany(User, {through: {
    model: UserFriend,
    unique: false,
}, as: 'friends', onDelete: 'CASCADE'})

// Export the models
module.exports = { User, UserFriend, Message };