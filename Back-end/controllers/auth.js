const user = require('../models/user');
const admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signin = (req, res, next) => {
    bcrypt.hash(req.body.password, 3, (err, password) => {
        if (err) {
            // Handle error
            return;
        }
        const newUser = new user({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: password,
            address: req.body.address,
            phone: req.body.phone
        })
        console.log(newUser)
        newUser.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
    });
}

exports.login = (req, res, next) => {
    admin.findOne({email: req.body.email})
        .then(post => {
            if (!post) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, post.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    const token = jwt.sign({ userId: post._id, rule: post.rule }, 'RANDOM_TOKEN_SECRET', {expiresIn: '2h'});
                    res.cookie("token", token, {httpOnly: true}).status(200).json({token: token})
            });
    })
}