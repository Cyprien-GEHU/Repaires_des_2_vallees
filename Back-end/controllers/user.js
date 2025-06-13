const user = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.getAllUser = (req, res) => {
  article.find()
    .then(post => {res.status(200).json(post)})
    .catch(error => res.status(400).json({ error }));
}

exports.getOneUser = (req, res) => {
  const url = req.url;
  const split = url.split("/");
  const id = split[2];

  article.findOne({_id: id})
    .then(post => {res.status(200).json(post)})
    .catch(error => res.status(400).json({ error }));
}

exports.create_user = (req, res) => {
  bcrypt.hash(req.body.password, 3, (err, password) => {
    if (err) {
              // Handle error
              return;
    }
    const newuser = new user({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: password,
      address: req.body.address,
      phone: req.body.phone
    })
    console.log(newuser)
    newuser.save()
      .then(() => res.status(201).json({ message: 'user créé !' }))
      .catch(error => res.status(400).json({ error }));
   });
}

exports.update_user = (req, res) => {
  const url = req.url;
  const split = url.split("/");
  const id = split[2];

  bcrypt.hash(req.body.password, 3, (err, password) => {
    if (err) {
              // Handle error
              return;
    }
    user.updateOne({ _id: id }, { 
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: password,
        address: req.body.address,
        phone: req.body.phone
    }})
    .then(() => res.status(201).json({ message: 'user update !' }))
    .catch(error => res.status(400).json({ error }));
   });
}

exports.delete_user = (req, res) => {
  const url = req.url;
  const split = url.split("/");
  const id = split[2];
  
  if (req.userRole == "admin" || req.userRole == "animator") {
    user.deleteOne({_id: id})
      .then(() => res.status(201).json({ message: 'user delete !' }))
      .catch(error => res.status(400).json({ error }));
  }
  
  else {
    return res.status(501).json({message: "you are not a admin, so you can delete this account"})
  }
}