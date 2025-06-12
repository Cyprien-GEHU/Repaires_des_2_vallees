const user = require('../models/user');
const admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signin = (req, res, next) => {
    bcrypt.hash(req.query.password, 3, (err, password) => {
        if (err) {
            // Handle error
            return;
        }
        const newUser = new user({
            firstName: req.query.firstName,
            lastName: req.query.lastName,
            email: req.query.email,
            password: password,
            address: req.query.address,
            phone: req.query.phone
        })
        console.log(newUser)
        newUser.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
    });
}

exports.login = (req, res, next) => {
    admin.findOne({firstName: req.query.firstName})
        .then(post => {
            if (!post) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.query.password, post.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    const token = jwt.sign({ userId: post._id, rule: post.rule }, 'RANDOM_TOKEN_SECRET', {expiresIn: '2h'});
                    res.status(200).json({
                        userId: user._id,
                        token: token,
                        rule: user.rule,
                    });
            });
    })
}