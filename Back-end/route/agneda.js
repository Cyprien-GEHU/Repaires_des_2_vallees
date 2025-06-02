const express = require("express");
const router = express.Router();

// GET all activity on agenda
router.get('/agenda')

// GET one activity on the agenda
router.get('/agenda/:id')

module.exports = router;