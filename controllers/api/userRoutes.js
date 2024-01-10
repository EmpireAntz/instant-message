const router = require('express').Router();
const { User, UserFriend, Chat, Message } = require('../../models');
const Sequelize = require('sequelize');

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

router.post('/messages', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('messages');
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

router.post('/addFriend', async (req, res) => {
  const currentUserId = req.session.user_id;
  const friendEmail = req.body.friendEmail;


  try {
    const friend = await User.findOne({ where: { email: friendEmail } });
    if (!friend) {
      return res.status(404).json({ message: 'Friend not found' });
    }

    console.log(friend)

    // Prevent adding oneself as a friend
    if (currentUserId === friend.id) {
      return res.status(400).json({ message: 'You cannot add yourself as a friend' });
    }

    // Check if the friendship already exists
    const existingFriendship = await UserFriend.findOne({
      where: {
        userId: currentUserId,
        friendId: friend.id
      }
    });

    if (existingFriendship) {
      return res.status(400).json({ message: 'You are already friends' });
    }

    // Create the new friendship
    console.log("-------------------------")
    console.log(currentUserId)
    console.log("-------------------------")
    console.log(friend.id)

    UserFriend.create({
      userId: currentUserId,
      friendId: friend.id
    })
      .then((friend) => {
        console.log('Friend relationship created successfully:', friend);
      })
      .catch((error) => {
        console.error('Error creating friend relationship:', error);
      });

    res.json({ message: 'Friend added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding friend', error });
  }
});

router.get('/friends/', async (req, res) => {
  console.log("bhwbhjsfdgbhjdsfgjbhdsfgjbndsgfjbndgsjbn")
  try {
    const userID = req.session.user_id;
    console.log('userID:' + userID)
    
  if(!userID)
  {
    //return res.json([]);
  }
    User.findAll({
      attributes: ['id', 'name'],
      include: [
        {
          model: User,
          as: "friends",
          
              attributes: ['id', 'name'],
          
        },
      ],
      where: {
        id: userID
      }
    })
      .then((userFriends) => {
        // userFriends will contain an array of objects with friendID and User model properties
        console.log(userFriends)
        console.log('userfriends:', userFriends[0].dataValues.friends);
        res.json(userFriends[0].dataValues.friends);
      })
      .catch((error) => {
        console.error('Error fetching user friends:', error);
      });

    // Return the friend data as the response
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
