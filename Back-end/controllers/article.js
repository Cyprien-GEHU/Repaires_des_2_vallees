const fs = require('fs');
const path = require('path');
const article = require('../models/article');

exports.get_article = (req, res) => {
  article.find()
    .then((post) => { res.status(200).json(post); })
    .catch((error) => res.status(400).json({ error }));
};

exports.get_OneArticle = (req, res) => {
  const { url } = req;
  const split = url.split('/');
  const id = split[1];

  article.findOne({ _id: id })
    .then((post) => { res.status(200).json(post); })
    .catch((error) => res.status(400).json({ error }));
};

exports.get_OneArticleAdmin = (req, res) => {
  const { url } = req;
  const split = url.split('/');
  const id = split[2];

  article.findOne({ _id: id })
    .then((post) => { res.status(200).json(post); })
    .catch((error) => res.status(400).json({ error }));
};

exports.create_article = (req, res) => {
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  console.log(req.body);

  const newArticle = new article({
    Title: req.body.Title,
    description: req.body.description,
    creator: req.userId,
    picture: imageUrl,
    categorie: req.body.categorie,
  });

  console.log(newArticle);
  newArticle.save()
    .then(() => res.status(201).json({ message: 'article créé !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.update_article = (req, res) => {
  const { url } = req;
  const split = url.split('/');
  const id = split[2];
  let imageUrl;

  article.findOne({ _id: id })
    .then((post) => {
      if (post.creator[0] === req.userId || req.userRole === 'admin') {
        if (req.file) {
          imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
          if (post.picture) {
            const filename = post.picture.split('/uploads/')[1];
            const imagePath = path.join(__dirname, '..', 'uploads', filename);

            fs.unlink(imagePath, (err) => {
              if (err) {
                console.error('erreur de supression:', err);
              }
            });
          }
        } else {
          imageUrl = post.picture;
        }
        article.updateOne({ _id: id }, {
          $set: {
            Title: req.body.Title,
            description: req.body.description,
            picture: imageUrl,
            categorie: req.body.categorie,
          },
        })
          .then(() => res.status(201).json({ message: 'article update !' }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        return res.status(501).json({ message: "you don't have the right to change article" });
      }
    })
    .catch(() => res.status(400).json({ message: 'article no found' }));
};

exports.delete_article = async (req, res) => {
  const { url } = req;
  const split = url.split('/');
  const id = split[2];

  await article.findOne({ _id: id })
    .then((post) => {
      if (post.creator[0] === req.userId || req.userRole === 'admin') {
        article.deleteOne({ _id: id })
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

            return res.status(201).json({ message: 'Article supprimé' });
          })
          .catch((error) => res.status(400).json({ error }));
      } else {
        return res.status(403).json({ message: "Vous n'avez pas le droit de supprimer cet article" });
      }
    })
    .catch(() => res.status(400).json({ message: 'Article non trouvé' }));
};
