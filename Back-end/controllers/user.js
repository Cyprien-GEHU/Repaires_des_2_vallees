const user = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.getAllUser = (req, res) => {
  article.find()
    .then(post => {res.status(200).json(post)})
    .catch(error => res.status(400).json({ error }));
}

exports.getOneUser = (req, res) => {
    const url = req.url
    const split = url.split(":")
    const id = split[1]

    article.findOne({_id: id})
        .then(post => {res.status(200).json(post)})
        .catch(error => res.status(400).json({ error }));
}

exports.create_user = (req, res) => {
  const decodedToken = jwt.verify(req.headers.token, 'RANDOM_TOKEN_SECRET');
  bcrypt.hash(req.query.password, 3, (err, password) => {
    if (err) {
              // Handle error
              return;
    }
    const newuser = new user({
      firstName: req.query.firstName,
      lastName: req.query.lastName,
      email: req.query.email,
      password: password,
      address: req.query.address,
      phone: req.query.phone
    })
    console.log(newuser)
    newuser.save()
      .then(() => res.status(201).json({ message: 'user créé !' }))
      .catch(error => res.status(400).json({ error }));
   });
}

exports.update_user = (req, res) => {
  const decodedToken = jwt.verify(req.headers.token, 'RANDOM_TOKEN_SECRET');
  const url = req.url;
  const split = url.split(":");
  const firstid = split[1];
  const split2 = firstid.split("?")
  const id = split2[0]

  bcrypt.hash(req.query.password, 3, (err, password) => {
    if (err) {
              // Handle error
              return;
    }
    user.updateOne({ _id: id }, { 
      $set: {
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        email: req.query.email,
        password: password,
        address: req.query.address,
        phone: req.query.phone
    }})
    .then(() => res.status(201).json({ message: 'user update !' }))
    .catch(error => res.status(400).json({ error }));
   });
}

exports.delete_user = (req, res) => {
  const decodedToken = jwt.verify(req.headers.token, 'RANDOM_TOKEN_SECRET');
  const url = req.url;
  const split = url.split(":");
  const id = split[1];
  
  user.deleteOne({_id: id})
    .then(() => res.status(201).json({ message: 'user delete !' }))
    .catch(error => res.status(400).json({ error }));
}