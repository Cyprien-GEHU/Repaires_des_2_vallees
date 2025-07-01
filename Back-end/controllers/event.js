const fs = require('fs');
const path = require('path');
const event = require('../models/event');

exports.get_event = (req, res) => {
  event.find()
    .then((post) => { res.status(200).json(post); })
    .catch((error) => res.status(400).json({ error }));
};

exports.get_OneEvent = (req, res) => {
  const { url } = req;
  const split = url.split('/');
  const id = split[1];

  event.findOne({ _id: id })
    .then((post) => { res.status(200).json(post); })
    .catch((error) => res.status(400).json({ error }));
};

exports.get_OneEventAdmin = (req, res) => {
  const { url } = req;
  const split = url.split('/');
  const id = split[2];

  event.findOne({ _id: id })
    .then((post) => { res.status(200).json(post); })
    .catch((error) => res.status(400).json({ error }));
};

exports.create_event = (req, res) => {
  let imageUrl;
  if (req.file) {
    imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  }

  const newevent = new event({
    Title: req.body.Title,
    description: req.body.description,
    creator: req.userId,
    day: req.body.day,
    picture: imageUrl,
  });
  console.log(newevent);
  newevent.save()
    .then(() => res.status(201).json({ message: 'event créé !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.update_event = (req, res) => {
  const { url } = req;
  const split = url.split('/');
  const id = split[2];
  let imageUrl;
  if (req.file) {
    imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  }

  event.findOne({ _id: id })
    .then((post) => {
      if (post.creator[0] === req.userId || req.userRole === 'admin') {
        event.updateOne({ _id: id }, {
          $set: {
            Title: req.body.Title,
            description: req.body.description,
            day: req.body.day,
            picture: imageUrl,
          },
        })
          .then(() => {
            if (post.picture) {
              const filename = post.picture.split('/uploads/')[1];
              const imagePath = path.join(__dirname, '..', 'uploads', filename);

              fs.unlink(imagePath, (err) => {
                if (err) {
                  console.error('erreur de supression:', err);
                }
              });
            }
            return res.status(201).json({ message: 'event update !' });
          })
          .catch((error) => res.status(400).json({ error }));
      } else {
        return res.status(501).json({ message: "you don't have the right to change event" });
      }
    })
    .catch(() => res.status(400).json({ message: 'event not found' }));
};

exports.delete_event = (req, res) => {
  const { url } = req;
  const split = url.split('/');
  const id = split[2];

  event.findOne({ _id: id })
    .then((post) => {
      if (post.creator[0] === req.userId || req.userRole === 'admin') {
        event.deleteOne({ _id: id })
          .then(() => {
            if (post.picture) {
              const filename = post.picture.split('/uploads/')[1];
              const imagePath = path.join(__dirname, '..', 'uploads', filename);

              fs.unlink(imagePath, (err) => {
                if (err) {
                  console.error('erreur de supression:', err);
                }
              });
            }
            return res.status(201).json({ message: 'event supprimé' });
          })
          .catch((error) => res.status(400).json({ error }));
      } else {
        return res.status(501).json({ message: "you don't have the right to delete this event" });
      }
    })
    .catch(() => res.status(400).json({ message: 'event not found' }));
};
