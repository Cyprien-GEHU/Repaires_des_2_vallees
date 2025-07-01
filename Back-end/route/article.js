const express = require('express');
const articleControl = require('../controllers/article');

const router = express.Router();

// GET all article
router.get('/', articleControl.get_article);

// GET one article
router.get('/:id', articleControl.get_OneArticle);

module.exports = router;
