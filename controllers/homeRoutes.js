const router = require('express').Router();
const { User } = require('../models');
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

module.exports = router;