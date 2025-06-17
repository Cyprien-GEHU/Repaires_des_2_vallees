const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const routeUsers = require('./route/user');
const routeAdmin = require('./route/admin');
const routeArticle = require('./route/article');
const routeAgenda = require('./route/agenda');
const routeEvent = require('./route/event');
const routeAuth = require('./route/auth');
const cors = require('cors');
// connection to the database
mongoose.connect('mongodb+srv://cyprien:5XbthZG8XDORheLQ@cluster0.afcgulg.mongodb.net/repaire_des_2_vallées?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {console.log('connection reussi')})
    .catch(() => console.log('connexion failed'));

const app = express();



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/users', routeUsers);
app.use('/admin', routeAdmin);
app.use('/article', routeArticle);
app.use('/agenda', routeAgenda);
app.use('/event', routeEvent);
app.use('/auth', require('./route/auth'));


// Specify the port to listen on
const port = 3000;

// Start the server
app.listen(port, () => {
    console.log(`Node.js HTTP server is running on port ${port}`);
});