const agenda = require('../models/agenda')

exports.get_agenda = (req, res) => {
  agenda.find()
    .then(post => {res.status(200).json(post)})
    .catch(error => res.status(400).json({ error }));
}

exports.get_OneAgenda = (req, res) => {
  const url = req.url;
  const split = url.split("/");
  const id = split[1];

  agenda.findOne({_id: id})
    .then(post => {res.status(200).json(post)})
    .catch(error => res.status(400).json({ error }));
}

exports.get_OneAgendaAdmin = (req, res) => {
  const url = req.url;
  const split = url.split("/");
  const id = split[2];
  agenda.findOne({_id: id})
    .then(post => {res.status(200).json(post)})
    .catch(error => res.status(400).json({ error }));
}

exports.create_agenda = (req, res) => {
  const newAgenda = new agenda({
    Title: req.body.Title,
    description: req.body.description,
    creator: req.userId,
    day: req.body.day,
    price: req.body.price,
    host: req.body.host,
    hours: req.body.hours
  })

  console.log(newAgenda)
  newAgenda.save()
    .then(() => res.status(201).json({ message: 'agenda créé !' }))
    .catch(error => res.status(400).json({ message: "création impossible: " + error }));
}

exports.update_agenda = (req, res) => {
  const url = req.url;
  const split = url.split("/");
  const id = split[2];

  agenda.findOne({_id: id})
      .then(post => {
        if (post.creator[0] == req.userId || req.userRole == "admin") {
            agenda.updateOne({ _id: id }, { 
            $set: {
                Title: req.body.Title,
                description: req.body.description,
                day: req.body.day,
                price: req.body.price,
                host: req.body.host,
                hours: req.body.hours
            }})
            .then(() => res.status(201).json({ message: 'agenda update !' }))
            .catch(error => res.status(400).json({ error }));
            } 

      else {
        return res.status(501).json({message : "you don't have the right to change agenda"})
      }
    })
    .catch(error => res.status(400).json({ error }));


}

exports.delete_agenda = (req, res) => {
  const url = req.url;
  const split = url.split("/");
  const id = split[2];

  agenda.findOne({_id: id})
      .then(post => {
        if (post.creator[0] == req.userId || req.userRole == "admin") {
          agenda.deleteOne({_id: id})
            .then(() => res.status(201).json({ message: 'agenda delete !' }))
            .catch(error => res.status(400).json({ error }));
        }
        else {
          return res.status(501).json({message : "you don't have the right to delete this agenda"})
        }
      })
      .catch(error => res.status(400).json({ error }));
  }