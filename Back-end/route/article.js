const express = require("express");
const router = express.Router();

// GET all article
router.get('/article')

// GET one article
router.get('/article/:id')

module.exports = router;