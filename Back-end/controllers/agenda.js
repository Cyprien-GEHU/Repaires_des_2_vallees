const agenda = require('../models/agenda')
const jwt = require('jsonwebtoken');

exports.get_agenda = (req, res) => {
    agenda.find()
        .then(post => {res.status(200).json(post)})
        .catch(error => res.status(400).json({ error }));
}

exports.get_OneAgenda = (req, res) => {
    const url = req.url;
    const split = url.split(":");
    const id = split[1];
    agenda.findOne({_id: id})
        .then(post => {res.status(200).json(post)})
        .catch(error => res.status(400).json({ error }));
}

exports.create_agenda = (req, res) => {
    const decodedToken = jwt.verify(req.headers.token, 'RANDOM_TOKEN_SECRET');
    const newAgenda = new agenda({
        Title: req.query.Title,
        description: req.query.description,
        creator: decodedToken.userId,
        day: req.query.day,
        price: req.query.price
    })
    console.log(newAgenda)
    newAgenda.save()
        .then(() => res.status(201).json({ message: 'agenda créé !' }))
        .catch(error => res.status(400).json({ error }));

}

exports.update_agenda = (req, res) => {
    const decodedToken = jwt.verify(req.headers.token, 'RANDOM_TOKEN_SECRET');
    const url = req.url;
    const split = url.split(":");
    const firstid = split[1];
    const split2 = firstid.split("?")
    const id = split2[0]

    agenda.updateOne({ _id: id }, { 
        $set: {
            Title: req.query.Title,
            description: req.query.description,
            day: req.query.day,
            price: req.query.price
        }})
        .then(() => res.status(201).json({ message: 'agenda update !' }))
        .catch(error => res.status(400).json({ error }));

}

exports.delete_agenda = (req, res) => {
    const decodedToken = jwt.verify(req.headers.token, 'RANDOM_TOKEN_SECRET');
    const url = req.url;
    const split = url.split(":");
    const id = split[1];

    agenda.deleteOne({_id: id})
        .then(() => res.status(201).json({ message: 'agenda delete !' }))
        .catch(error => res.status(400).json({ error }));
}