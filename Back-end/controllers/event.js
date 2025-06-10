const event = require('../models/event')
const jwt = require('jsonwebtoken');

exports.get_event = (req, res) => {
    event.find()
        .then(post => {res.status(200).json(post)})
        .catch(error => res.status(400).json({ error }));
}

exports.get_OneEvent = (req, res) => {
    const url = req.url;
    const split = url.split(":");
    const id = split[1];
    event.findOne({_id: id})
        .then(post => {res.status(200).json(post)})
        .catch(error => res.status(400).json({ error }));
}

exports.create_event = (req, res) => {
    const decodedToken = jwt.verify(req.headers.token, 'RANDOM_TOKEN_SECRET');
    const newevent = new event({
        Title: req.query.Title,
        description: req.query.description,
        creator: decodedToken.userId,
        day: req.query.day,
    })
    console.log(newevent)
    newevent.save()
        .then(() => res.status(201).json({ message: 'event créé !' }))
        .catch(error => res.status(400).json({ error }));

}

exports.update_event = (req, res) => {
    const decodedToken = jwt.verify(req.headers.token, 'RANDOM_TOKEN_SECRET');
    const url = req.url;
    const split = url.split(":");
    const firstid = split[1];
    const split2 = firstid.split("?")
    const id = split2[0]

    event.updateOne({ _id: id }, { 
        $set: {
            Title: req.query.Title,
            description: req.query.description,
            day: req.query.day,
        }})
        .then(() => res.status(201).json({ message: 'event update !' }))
        .catch(error => res.status(400).json({ error }));

}

exports.delete_event = (req, res) => {
    const decodedToken = jwt.verify(req.headers.token, 'RANDOM_TOKEN_SECRET');
    const url = req.url;
    const split = url.split(":");
    const id = split[1];

    event.deleteOne({_id: id})
        .then(() => res.status(201).json({ message: 'event delete !' }))
        .catch(error => res.status(400).json({ error }));
}