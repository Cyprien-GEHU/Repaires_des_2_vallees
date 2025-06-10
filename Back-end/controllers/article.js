const article = require('../models/article')
const jwt = require('jsonwebtoken');

exports.get_article = (req, res) => {
    article.find()
        .then(post => {res.status(200).json(post)})
        .catch(error => res.status(400).json({ error }));
}

exports.get_OneArticle = (req, res) => {
    const url = req.url;
    const split = url.split(":");
    const id = split[1];
    article.findOne({_id: id})
        .then(post => {res.status(200).json(post)})
        .catch(error => res.status(400).json({ error }));
}

exports.create_article = (req, res) => {
    const decodedToken = jwt.verify(req.headers.token, 'RANDOM_TOKEN_SECRET');
    const newArticle = new article({
        Title: req.query.Title,
        description: req.query.description,
        creator: decodedToken.userId
    })
    console.log(newArticle)
    newArticle.save()
        .then(() => res.status(201).json({ message: 'article créé !' }))
        .catch(error => res.status(400).json({ error }));

}

exports.update_article = (req, res) => {
    const decodedToken = jwt.verify(req.headers.token, 'RANDOM_TOKEN_SECRET');
    const url = req.url;
    const split = url.split(":");
    const firstid = split[1];
    const split2 = firstid.split("?")
    const id = split2[0]

    article.updateOne({ _id: id }, { 
        $set: {
            Title: req.query.Title,
            description: req.query.description
        }})
        .then(() => res.status(201).json({ message: 'article update !' }))
        .catch(error => res.status(400).json({ error }));

}

exports.delete_article = (req, res) => {
    const decodedToken = jwt.verify(req.headers.token, 'RANDOM_TOKEN_SECRET');
    const url = req.url;
    const split = url.split(":");
    const id = split[1];

    article.deleteOne({_id: id})
        .then(() => res.status(201).json({ message: 'article delete !' }))
        .catch(error => res.status(400).json({ error }));
}