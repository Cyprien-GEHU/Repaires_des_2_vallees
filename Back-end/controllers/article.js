const article = require('../models/article')
const jwt = require('jsonwebtoken');

exports.get_article = (req, res) => {
  article.find()
    .then(post => {res.status(200).json(post)})
    .catch(error => res.status(400).json({ error }));
}

exports.get_OneArticle = (req, res) => {
  const url = req.url;
  const split = url.split("/");
  const id = split[2];
  article.findOne({_id: id})
    .then(post => {res.status(200).json(post)})
    .catch(error => res.status(400).json({ error }));
}

exports.create_article = (req, res) => {
  const newArticle = new article({
    Title: req.body.Title,
    description: req.body.description,
    creator: req.userId
  })
  console.log(newArticle)
  newArticle.save()
    .then(() => res.status(201).json({ message: 'article créé !' }))
    .catch(error => res.status(400).json({ error }));
}

exports.update_article = (req, res) => {
  const url = req.url;
  const split = url.split("/");
  const id = split[2];

  article.findOne({_id: id})
    .then(post => {
      if (post.creator[0] == req.userId || req.userRole == "admin") {
        article.updateOne({ _id: id }, { 
        $set: {
          Title: req.body.Title,
          description: req.body.description
        }})
        .then(() => res.status(201).json({ message: 'article update !' }))
        .catch(error => res.status(400).json({ error }));
      } 
      else {
        return res.status(501).json({message : "you don't have the right to change article"})
      }
    })
    .catch(error => res.status(400).json({ error }));
}

exports.delete_article = (req, res) => {
  const url = req.url;
  const split = url.split("/");
  const id = split[2];

  article.findOne({_id: id})
    .then(post => {
      if (post.creator[0] == req.userId || req.userRole == "admin") {
        article.deleteOne({_id: id})
          .then(() => res.status(201).json({ message: 'article delete !' }))
          .catch(error => res.status(400).json({ error }));
      }
      else {
        return res.status(501).json({message : "you don't have the right to delete this article"})
      }
    })
    .catch(error => res.status(400).json({ error }));
}