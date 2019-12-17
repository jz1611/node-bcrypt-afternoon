const express = require('express');
const session = require('express-session');
const massive = require('massive');
const authCtrl = require('./controllers/authController');
require('dotenv').config();

const PORT = 4000;

const { CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();

app.use(express.json());

massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  console.log('Database connected.');
});

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
  })
);

app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));