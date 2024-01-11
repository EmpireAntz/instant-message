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
  console.log(req.session.logged_in)
  res.render('profile', {logged_in: req.session.logged_in})
  
})

router.get('/search', (req, res) => {
  if (req.session.logged_in) {
    res.render('search', {logged_in: req.session.logged_in});
    return;
  }
})

router.get('/messages/:chatId', async (req, res) => {
  console.log('user_name',req.session.user_name)
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
    console.log('user_name',req.session.user_name)
   // const friend = get the friend from friendship, then the inverse friendshipId
   await Message.create({
      userId: req.session.user_id,
      userName: req.session.user_name,
      chatId: req.params.chatId,
      messageText: req.body.messageText
    })

    
    res.redirect(`/messages/${req.params.chatId}`);
    return;
  }
})

module.exports = router;