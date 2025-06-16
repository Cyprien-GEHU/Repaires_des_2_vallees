const event = require('../models/event')
const jwt = require('jsonwebtoken');

exports.get_event = (req, res) => {
  event.find()
    .then(post => {res.status(200).json(post)})
    .catch(error => res.status(400).json({ error }));
}

exports.get_OneEvent = (req, res) => {
  const url = req.url;
  const split = url.split("/");
  const id = split[2];
  event.findOne({_id: id})
    .then(post => {res.status(200).json(post)})
    .catch(error => res.status(400).json({ error }));
}

exports.create_event = (req, res) => {
  const newevent = new event({
    Title: req.body.Title,
    description: req.body.description,
    creator: req.userId,
    day: req.body.day,
  })
  console.log(newevent)
  newevent.save()
    .then(() => res.status(201).json({ message: 'event créé !' }))
    .catch(error => res.status(400).json({ error }));

}

exports.update_event = (req, res) => {
  const url = req.url;
  const split = url.split("/");
  const id = split[2];

  event.findOne({_id: id})
    .then(post => {
      if (post.creator[0] == req.userId || req.userRole == "admin") {
        event.updateOne({ _id: id }, { 
        $set: {
          Title: req.body.Title,
          description: req.body.description,
          day: req.body.day,
        }})
        .then(() => res.status(201).json({ message: 'event update !' }))
        .catch(error => res.status(400).json({ error }));
      } 

      else {
        return res.status(501).json({message : "you don't have the right to change event"})
      }
    })
    .catch(error => res.status(400).json({ error }));

}

exports.delete_event = (req, res) => {
  const url = req.url;
  const split = url.split("/");
  const id = split[2];

  event.findOne({_id: id})
      .then(post => {
        if (post.creator[0] == req.userId || req.userRole == "admin") {
          event.deleteOne({_id: id})
            .then(() => res.status(201).json({ message: 'event delete !' }))
            .catch(error => res.status(400).json({ error }));
        }
        else {
          return res.status(501).json({message : "you don't have the right to delete this event"})
        }
      })
      .catch(error => res.status(400).json({ error }));
  }