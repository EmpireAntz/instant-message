const router = require('express').Router();
const { Op } = require('sequelize');
const { User, Message, UserFriend } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  res.render('homepage')
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  
  res.render('login');
});

router.get('/profile', (req, res) => {
  // console.log(req.session.logged_in)
  res.render('profile', {logged_in: req.session.logged_in})
  
})

router.get('/search', (req, res) => {
  if (req.session.logged_in) {
    res.render('search', {logged_in: req.session.logged_in});
    return;
  }
})

router.get('/messages/:chatId', async (req, res) => {
   // console.log('user_name',req.session.user_name)
  if (req.session.logged_in) {
    let friend;
   const messages = await Message.findAll({
      where: {
        chatId: req.params.chatId
      }
    })

    if (messages) {
      let user = await UserFriend.findOne({
        where: {
          [Op.and]: [
            {friendshipId: req.params.chatId},
            {userId: req.session.user_id}
          ]
        },
        attributes: ['friendId']
      })

    
      if (user) {
        
        friend = await User.findByPk(user.friendId)

      }
    }
  

    const cleanMsg = messages.map(message => message.get({clean: true}))
   
    res.render('messages', {logged_in: req.session.logged_in, messages: cleanMsg, friend: friend.get({clean: true})});
    return;
  }
})
router.post('/messages/:chatId', async (req, res) => {
  if (req.session.logged_in) {
    try {
      const newMessage = await Message.create({
        userId: req.session.user_id,
        userName: req.session.user_name,
        chatId: req.params.chatId,
        messageText: req.body.messageText
      });

      // Emit an event to all clients in the same chat room except the sender
      io.to(req.params.chatId).emit('new message', {
        userId: req.session.user_id,
        userName: req.session.user_name,
        messageText: req.body.messageText
      });
      console.log(`Message sent to room ${req.params.chatId}`);
      res.status(200).json(newMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ error: 'Error sending message' });
    }
  } else {
    res.status(403).json({ error: 'Not logged in' });
  }
});
module.exports = router;