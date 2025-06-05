const user = require('../models/user')

exports.getAllUser = (req, res) => {
  user.find()
    .then(post => {
      console.log("je suis bien la")
      res.send("la liste des admin:\n" + post)
    })
}

exports.getOneUser = (req, res) => {
    const url = req.url
    const split = url.split(":")
    const id = split[1]
    user.findOne({_id: id})
        .then(post => {
            console.log("je suis bien la")
            res.send("la liste des admin:\n" + post)
    })
}