const express = require("express");
const router = express.Router();

// GET all event
router.get('/event')

// GET one event
router.get('/event/:id')

module.exports = router;