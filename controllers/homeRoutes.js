const router = require('express').Router();
const { User, Message } = require('../models');
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
  if (req.session.logged_in) {
   const messages = await Message.findAll({
      where: {
        chatId: req.params.chatId
      }
    })
    const cleanMsg = messages.map(message => message.get({clean: true}))
    console.log(cleanMsg)
    res.render('messages', {logged_in: req.session.logged_in, messages: cleanMsg});
    return;
  }
})
router.post('/messages/:chatId', async (req, res) => {
  if (req.session.logged_in) {
   // const friend = get the friend from friendship, then the inverse friendshipId
   await Message.create({
      userId: req.session.user_id,
      chatId: req.params.chatId,
      messageText: req.body.messageText
    })

    
    res.redirect(`/messages/${req.params.chatId}`);
    return;
  }
})

module.exports = router;