const User = require('./User');
const Chat = require('./chat');
const UserFriend = require('./UserFriend');
const Message = require('./Message');

User.belongsToMany(User, {through: {
    model: UserFriend,
    unique: false,
}, as: 'friends', onDelete: 'CASCADE'})

// Export the models
module.exports = { User, Chat, UserFriend, Message };