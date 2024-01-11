const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const http = require('http'); 

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const server = http.createServer(app); 
const io = require('socket.io')(server);

const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  // Signs the session
  secret: 'Super secret secret',
  // This IS essentially the session
  cookie: {
    // when the cookie will expire (in ms)
    maxAge: 10000000,
    // prevents access through JS in the client
    httpOnly: true,
    // Server and Client will reject if not served from HTTPS
    secure: false,
    // Only sites on the same domain can use this cookie
    sameSite: 'strict',
  },
  // forces the session to be saved even if nothing changed
  resave: false,
  // forces a session to be saved when it is new regardless of if anything has changed
  saveUninitialized: true,
  // where to store the session on the server
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

io.on('connection', (socket) => {
  console.log('a user connected');

  // Example: On receiving a 'chat message' event from a client
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log('Now listening'));
});
