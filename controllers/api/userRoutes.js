const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.redirect('/profile');
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/search', (req, res) => {
  if (req.session.logged_in) {
  res.redirect('search');
  }
});

// GET route to search for a user by email
router.get('/searchByEmail', async (req, res) => {
  // Obtain the email from the query string
  const { email } = req.query;

  // Ensure that the email is provided
  if (!email) {
    return res.status(400).json({ message: 'Email query parameter is required.' });
  }

  try {
    // Use Sequelize's findOne method to search for the user by email
    const user = await User.findOne({
      where: { email: email },
      attributes: { exclude: ['password'] } // Exclude the password from the result
    });

    if (!user) {
      // If the user is not found, send a 404 response
      res.status(404).json({ message: 'User not found.' });
    } else {
      // If the user is found, send back the user information
      res.json(user);
    }
  } catch (error) {
    // If there's an error, send a 500 response
    res.status(500).json({ message: 'Error searching for user.', error: error.message });
  }
});

module.exports = router;
